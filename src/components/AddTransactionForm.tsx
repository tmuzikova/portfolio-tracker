import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Loader as LoaderIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSymbolListContext } from '@/stores/SymbolListContext';
import { VirtualizedCombobox } from './VirtualizedCombobox';

const schema = z.object({
  transactionType: z.enum(['buy', 'sell'], {
    required_error: 'Prosím zadejte typ transakce',
  }),
  symbol: z.string({ required_error: 'Prosím zadejte ticker symbol' }),
  quantity: z
    .string({ required_error: 'Prosím zadejte počet kusů' })
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val >= 1, {
      message: 'Počet kusů musí být alespoň 1 a celé číslo.',
    }),
  date: z
    .string({
      required_error: 'Prosím zadejte datum provedení transakce',
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Neplatné datum.',
    })
    .refine(
      (val) => {
        const date = new Date(val);
        const today = new Date();
        const fiveYearsAgo = new Date();
        fiveYearsAgo.setFullYear(today.getFullYear() - 5);

        return date >= fiveYearsAgo && date <= today;
      },
      {
        message: 'Datum musí být v rozmezí posledních 5 let a ne v budoucnosti',
      },
    ),
  price: z
    .string({ required_error: 'Prosím zadejte jednotkovou cenu' })
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'Cena musí být nenulová a kladná.',
    }),
  currency: z.string({
    required_error: 'Prosím zadejte měnu transakce',
  }),
  fee: z
    .string()
    .optional()
    .transform((val) => (val?.trim() ? parseFloat(val) : 0))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: 'Poplatky musí být nezáporné číslo',
    }),
});

type AddTransactionFormFields = z.infer<typeof schema>;

export const AddTransactionForm = () => {
  const { symbolList, isLoading } = useSymbolListContext();

  const methods = useForm<AddTransactionFormFields>({
    resolver: zodResolver(schema),
  });

  const [selectedSymbol, setSelectedSymbol] = useState('');

  useEffect(() => {
    const existingTransactions = JSON.parse(
      localStorage.getItem('transactions') || '[]',
    );
    console.log('Loaded transactions:', existingTransactions);
  }, []);

  const onSubmit: SubmitHandler<AddTransactionFormFields> = (data) => {
    try {
      const existingTransactions = JSON.parse(
        localStorage.getItem('transactions') || '[]',
      );

      const updatedTransactions = [...existingTransactions, data];

      localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

      console.log('Transaction saved successfully!', updatedTransactions);
    } catch (error) {
      console.error('Error saving transaction:', error);
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
        <FormField
          control={methods.control}
          name="transactionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Typ transakce</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Typ transakce" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value="buy">Nákup</SelectItem>
                  <SelectItem value="sell">Prodej</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="symbol"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Ticker symbol</FormLabel>
              <VirtualizedCombobox
                options={symbolList || []}
                placeholder="Hledat dle symbolu či názvu"
                selectedOption={selectedSymbol}
                onSelect={(symbol) => {
                  methods.setValue('symbol', symbol);
                  setSelectedSymbol(symbol);
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <FormField
            control={methods.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Počet ks</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Počet ks"
                    min="1"
                    step="1"
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="date"
            render={({ field }) => {
              const today = new Date();
              const maxDate = today.toISOString().split('T')[0];
              const minDate = new Date();
              minDate.setFullYear(today.getFullYear() - 5);
              const formattedMinDate = minDate.toISOString().split('T')[0];

              return (
                <FormItem className="w-full">
                  <FormLabel>Datum transakce</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      min={formattedMinDate}
                      max={maxDate}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <div className="flex gap-2">
          <FormField
            control={methods.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cena / ks</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Cena / ks"
                    min="0.01"
                    step="0.001"
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Měna</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Měna"
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={methods.control}
          name="fee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poplatky</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Poplatky"
                  min="0"
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Přidat</Button>
      </form>
    </FormProvider>
  );
};