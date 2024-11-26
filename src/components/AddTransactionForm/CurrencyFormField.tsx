import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { MethodsType } from './methodsType';
import { Input } from '../ui/input';
import { SymbolItem } from '@/hooks/useSymbolList';
import { useEffect } from 'react';
import { EXCHANGES } from './EXCHANGES';

interface CurrencyFormFieldProps extends MethodsType {
  selectedHolding: SymbolItem | undefined;
}

export function CurrencyFormField({
  methods,
  selectedHolding,
}: CurrencyFormFieldProps) {
  useEffect(() => {
    if (selectedHolding) {
      const matchedExchange = EXCHANGES.find(
        (exchange) => exchange.name === selectedHolding.exchange,
      );

      if (matchedExchange) {
        methods.setValue('currency', matchedExchange.currency || '');
      }
    }
  }, [selectedHolding, methods]);

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
