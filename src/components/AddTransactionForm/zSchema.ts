import { z } from 'zod';

export const schema = z.object({
  transactionType: z.enum(['Nákup', 'Prodej'], {
    required_error: 'Prosím zadejte typ transakce',
  }),
  symbol: z.string({ required_error: 'Prosím zadejte ticker symbol' }),
  quantity: z.coerce
    .number({ required_error: 'Prosím zadejte počet kusů' })
    .int()
    .min(1, { message: 'Počet kusů musí být alespoň 1 a celé číslo.' }),
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
  price: z.coerce
    .number({ required_error: 'Prosím zadejte jednotkovou cenu' })
    .positive({ message: 'Cena musí být nenulová a kladná.' }),
  currency: z.string({
    required_error: 'Prosím zadejte měnu transakce',
  }),
  fee: z.coerce
    .number()
    .nonnegative({ message: 'Poplatky musí být nezáporné číslo' })
    .optional(),
});
