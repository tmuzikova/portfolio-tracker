import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { MethodsType } from './methodsType';
import { Input } from '../ui/input';

export function QuantityFormField({ methods }: MethodsType) {
  return (
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
  );
}
