import { Button } from '../ui/button';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Loader as LoaderIcon } from 'lucide-react';
import { useState } from 'react';
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

export type AddTransactionFormFields = z.infer<typeof schema>;

export const AddTransactionForm = () => {
  const { data: symbolList, isLoading } = useSymbolList();

  const methods = useForm<AddTransactionFormFields>({
    resolver: zodResolver(schema),
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

      setSuccessMessage('Transakce byla úspěšně odeslána.');
      setErrorMessage(null);

      setTimeout(() => setSuccessMessage(null), 7000);
    } catch (error) {
      console.error('Error saving transaction:', error);

      setErrorMessage('Nastala chyba při ukládání transakce. Zkuste to znovu.');
      setSuccessMessage(null);

      setTimeout(() => setErrorMessage(null), 7000);
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
        {successMessage && (
          <div className="rounded-md bg-green-100 p-3 text-green-800">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="rounded-md bg-red-100 p-3 text-red-800">
            {errorMessage}
          </div>
        )}

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
