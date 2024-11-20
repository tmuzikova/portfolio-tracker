import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { MethodsType } from './methodsType';
import { Input } from '../ui/input';

export function CurrencyFormField({ methods }: MethodsType) {
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
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
