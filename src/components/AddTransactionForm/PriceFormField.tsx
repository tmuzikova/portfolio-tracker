import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { MethodsType } from './methodsType';
import { Input } from '../ui/input';

export function PriceFormField({ methods }: MethodsType) {
  return (
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
  );
}
