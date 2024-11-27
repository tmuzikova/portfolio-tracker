import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { MethodsType } from './methodsType';
import { Input } from '../ui/input';

type CurrencyFormFieldProps = MethodsType & {};

export function CurrencyFormField({ methods }: CurrencyFormFieldProps) {
  return (
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
              readOnly
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
