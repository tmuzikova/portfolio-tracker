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
import { v4 } from 'uuid';
import { useTransactionStore } from '@/stores/TransactionStore';
import { toast } from '@/hooks/useToast';
import { transactionTableDataSchema } from './transactionTableDataSchema';

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
        } as AddTransactionFormFields)
      : undefined,
  });

  const onSubmit: SubmitHandler<AddTransactionFormFields> = (
    data: AddTransactionFormFields,
  ) => {
    try {
      const transactionToSave: TransactionTableData = {
        id: transactionToEdit?.id || v4(),
        transactionType: data.transactionType,
        holding: {
          holdingIcon: '',
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
      };

      if (transactionToEdit) {
        editTransaction(transactionToSave);
      } else {
        addTransaction(transactionToSave);
      }

      onClose();

      toast({
        title: transactionToEdit
          ? 'Transakce byla úspěšně upravena'
          : 'Transakce byla úspěšně přidána',
        duration: 5000,
        className: 'bg-green-100 border-green-500 text-green-900',
      });
    } catch (error) {
      console.error('Error saving transaction:', error);

      toast({
        variant: 'destructive',
        title: 'Nastala chyba při ukládání transakce',
        action: onReopen && (
          <Button
            variant="ghost"
            onClick={() => {
              onReopen();
            }}
          >
            Zkusit znovu
          </Button>
        ),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <LoaderIcon className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
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

        <Button type="submit">Uložit</Button>
      </form>
    </FormProvider>
  );
};
