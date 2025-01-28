import { Button } from '../ui/button';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Loader as LoaderIcon } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSymbolList } from '@/hooks/useSymbolList';
import { formFieldsSchema } from './formFieldsSchema';
import { QuantityFormField } from './QuantityFormField';
import { DateFormField } from './DateFormField';
import { PriceFormField } from './PriceFormField';
import { CurrencyFormField } from './CurrencyFormField';
import { FeeFormField } from './FeeFormField';
import { TransactionTypeFormField } from './TransactionTypeField';
import { SymbolSelectFormField } from './SymbolFormField';
import { useTransactionStore } from '@/stores/TransactionStore';
import { transactionTableDataSchema } from './transactionTableDataSchema';
import { showErrorToast, showSuccessToast } from '@/utils/showToast';
import { useState } from 'react';
import { useCompanyProfileManual } from '@/hooks/useCompanyProfile';
import { LoadingState } from '../LoadingState';

export type AddTransactionFormFields = z.infer<typeof formFieldsSchema>;
export type TransactionTableData = z.infer<typeof transactionTableDataSchema>;

type AddTransactionFormProps = {
  onClose: () => void;
  onReopen: () => void;
  transactionToEdit?: TransactionTableData;
};

export const AddTransactionForm = ({
  onClose,
  onReopen,
  transactionToEdit,
}: AddTransactionFormProps) => {
  const { data: symbolList, isLoading } = useSymbolList();
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const editTransaction = useTransactionStore((state) => state.editTransaction);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const methods = useForm<AddTransactionFormFields>({
    resolver: zodResolver(formFieldsSchema),
    defaultValues: transactionToEdit
      ? ({
          symbol: transactionToEdit.holding.holdingSymbol,
          transactionType: transactionToEdit.transactionType,
          date: transactionToEdit.transactionDate,
          name: transactionToEdit.holding.holdingName,
          quantity: transactionToEdit.numberOfStocks,
          price: transactionToEdit.transactionValue.perShare,
          currency: transactionToEdit.transactionValue.currency,
          fee: transactionToEdit.transactionFee?.total || 0,
        } satisfies AddTransactionFormFields)
      : undefined,
  });

  const { refetch } = useCompanyProfileManual(methods.watch('symbol'));

  const onSubmit: SubmitHandler<AddTransactionFormFields> = async (
    data: AddTransactionFormFields,
  ) => {
    try {
      setIsSubmitting(true);

      const companyProfile = await refetch({ throwOnError: true });

      const transactionToSave: TransactionTableData = {
        id: transactionToEdit?.id ?? crypto.randomUUID(),
        transactionType: data.transactionType,
        holding: {
          holdingIcon: companyProfile.data?.image || null,
          holdingSymbol: data.symbol,
          holdingName: data.name,
        },
        transactionDate: data.date,
        numberOfStocks: data.quantity,
        transactionValue: {
          total: data.price * data.quantity,
          perShare: data.price,
          currency: data.currency,
        },
        transactionFee: {
          total: data.fee || 0,
          currency: data.currency,
        },
        sector: companyProfile.data?.sector || 'Neznámý',
        type: {
          isFund: companyProfile.data?.isFund || false,
          isEtf: companyProfile.data?.isEtf || false,
        },
      };

      if (transactionToEdit) {
        editTransaction(transactionToSave);
      } else {
        addTransaction(transactionToSave);
      }

      onClose();

      showSuccessToast(
        transactionToEdit
          ? 'Transakce byla úspěšně upravena'
          : 'Transakce byla úspěšně přidána',
      );
    } catch (error) {
      console.error('Error saving transaction:', error);

      showErrorToast(
        'Nastala chyba při ukládání transakce',
        onReopen && (
          <Button
            variant="ghost"
            onClick={() => {
              onReopen();
            }}
          >
            Zkusit znovu
          </Button>
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <FormProvider {...methods}>
      <form
        className="mx-auto flex max-w-sm flex-col gap-4 p-4"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <TransactionTypeFormField methods={methods} />

        <SymbolSelectFormField
          methods={methods}
          symbolList={symbolList || []}
        />

        <div className="flex gap-2">
          <QuantityFormField methods={methods} />
          <DateFormField methods={methods} />
        </div>

        <div className="flex gap-2">
          <PriceFormField methods={methods} />
          <CurrencyFormField methods={methods} />
        </div>

        <FeeFormField methods={methods} />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <LoaderIcon className="h-4 w-4 animate-spin" />
          ) : (
            'Uložit'
          )}
        </Button>
      </form>
    </FormProvider>
  );
};
