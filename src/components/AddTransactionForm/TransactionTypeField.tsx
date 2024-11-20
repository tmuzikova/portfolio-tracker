import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MethodsType } from './methodsType';

export function TransactionTypeFormField({ methods }: MethodsType) {
  return (
    <FormField
      control={methods.control}
      name="transactionType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Typ transakce</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Typ transakce" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Nákup">Nákup</SelectItem>
              <SelectItem value="Prodej">Prodej</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
