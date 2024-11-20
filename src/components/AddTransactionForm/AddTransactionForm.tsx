import { Button } from '../ui/button';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Loader as LoaderIcon } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSymbolList } from '@/hooks/useSymbolList';
import { TransactionTableData } from '@/features/transactionTable/components/columns/types';
import { schema } from './zSchema';
import { QuantityFormField } from './QuantityFormField';
import { DateFormField } from './DateFormField';
import { PriceFormField } from './PriceFormField';
import { CurrencyFormField } from './CurrencyFormField';
import { FeeFormField } from './FeeFormField';
import { TransactionTypeFormField } from './TransactionTypeField';
import { SymbolSelectFormField } from './SymbolFormField';
import { toast } from '@/hooks/use-toast';

export type AddTransactionFormFields = z.infer<typeof schema>;

type AddTransactionFormProps = {
  onClose?: () => void;
  onReopen?: () => void;
};

export const AddTransactionForm = ({
  onClose,
  onReopen,
}: AddTransactionFormProps) => {
  const { data: symbolList, isLoading } = useSymbolList();

  const methods = useForm<AddTransactionFormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<AddTransactionFormFields> = (
    data: AddTransactionFormFields,
  ) => {
    try {
      const existingTransactions = JSON.parse(
        localStorage.getItem('transactions') || '[]',
      ) as TransactionTableData[];

      const transactionToSave: TransactionTableData = {
        transactionType: data.transactionType,
        holding: {
          holdingIcon: '',
          holdingSymbol: data.symbol,
          holdingName: '',
        },
        transactionDate: data.date,
        numberOfStocks: data.quantity,
        transactionValue: {
          total: data.price * data.quantity,
          perShare: data.price,
          currency: data.currency,
        },
        transactionFee: {
          total: data.fee,
          currency: data.currency,
        },
      };

      const newTransactions = [...existingTransactions, transactionToSave];
      localStorage.setItem('transactions', JSON.stringify(newTransactions));

      if (onClose) {
        onClose();
      }

      toast({
        title: 'Transakce byla úspěšně přidána',
        duration: 5000,
        className: 'bg-green-100 border-green-500 text-green-900',
      });
    } catch (error) {
      console.error('Error saving transaction:', error);

      toast({
        variant: 'destructive',
        title: 'Nastala chyba při ukládání transakce',
        action: onReopen ? (
          <Button
            variant="ghost"
            onClick={() => {
              onReopen();
            }}
          >
            Zkusit znovu
          </Button>
        ) : undefined,
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

        <Button type="submit">Přidat</Button>
      </form>
    </FormProvider>
  );
};
