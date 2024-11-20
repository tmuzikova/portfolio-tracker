import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { MethodsType } from './methodsType';
import { Input } from '../ui/input';

export function DateFormField({ methods }: MethodsType) {
  return (
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
                className="text-muted-foreground"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
