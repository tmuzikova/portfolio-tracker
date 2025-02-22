import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { MethodsType } from './methodsType';
import { Input } from '../ui/input';

export function FeeFormField({ methods }: MethodsType) {
  return (
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
              step="0.001"
              value={field.value || ''}
              className="no-arrows"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
