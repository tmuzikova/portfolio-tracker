import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
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
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  transactionType: z.string(),
  symbol: z.string(),
  quantity: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val >= 1, {
      message: 'Value must be at least 1',
    }),
  date: z.string(),
  price: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val >= 1, {
      message: 'Value must be at least 1',
    }),
  currency: z.string(),
  fee: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: 'Value must be at least 0',
    }),
});

type AddTransactionFormFields = z.infer<typeof schema>;

//to be replaced with Stock Symbol List data
const stocks = [
  {
    value: 'aapl',
    label: 'Apple Inc. (AAPL)',
  },
  {
    value: 'msft',
    label: 'Microsoft Corporation (MSFT)',
  },
  {
    value: 'googl',
    label: 'Alphabet Inc. (GOOGL)',
  },
  {
    value: 'amzn',
    label: 'Amazon.com, Inc. (AMZN)',
  },
  {
    value: 'tsla',
    label: 'Tesla, Inc. (TSLA)',
  },
  {
    value: 'nvda',
    label: 'NVIDIA Corporation (NVDA)',
  },
  {
    value: 'ko',
    label: 'The Coca-Cola Company (KO)',
  },
  {
    value: 'jnj',
    label: 'Johnson & Johnson (JNJ)',
  },
  {
    value: 'meta',
    label: 'Meta Platforms, Inc. (META)',
  },
  {
    value: 'intc',
    label: 'Intel Corporation (INTC)',
  },
];

export const AddTransactionForm = () => {
  const [openCombobox, setOpenCombobox] = useState(false);

  const methods = useForm<AddTransactionFormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<AddTransactionFormFields> = (data) => {
    console.log(data);
  };

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
              <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openCombobox}
                      className="justify-between"
                    >
                      {field.value
                        ? stocks.find((stock) => stock.value === field.value)
                            ?.label
                        : 'Zadejte symbol'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput
                      placeholder="Hledat symbol"
                      {...methods.register('symbol', { required: true })}
                    />
                    <CommandList>
                      <CommandEmpty>Žádné výsledky.</CommandEmpty>
                      <CommandGroup>
                        {stocks.map((stock) => (
                          <CommandItem
                            key={stock.value}
                            value={stock.value}
                            onSelect={() => {
                              methods.setValue('symbol', stock.value);
                              setOpenCombobox(false);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                field.value === stock.value
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                            {stock.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <FormField
            control={methods.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Počet ks</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="Počet ks" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Datum transakce</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
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
                  <Input {...field} type="number" placeholder="Cena / ks" />
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
                  <Input {...field} type="text" placeholder="Měna" />
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
                <Input {...field} type="number" placeholder="Poplatky" />
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
