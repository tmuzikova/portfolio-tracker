import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { VirtualizedCombobox } from './VirtualizedCombobox';
import { useState } from 'react';
import { SymbolList } from '@/hooks/useSymbolList';
import { MethodsType } from './methodsType';

interface SymbolSelectFormFieldProps extends MethodsType {
  symbolList: SymbolList[];
}

export const SymbolSelectFormField = ({
  methods,
  symbolList,
}: SymbolSelectFormFieldProps) => {
  const [selectedSymbol, setSelectedSymbol] = useState('');

  return (
    <FormField
      control={methods.control}
      name="symbol"
      render={() => (
        <FormItem className="flex flex-col">
          <FormLabel>Ticker symbol</FormLabel>
          <VirtualizedCombobox
            options={symbolList}
            placeholder="Hledat dle symbolu či názvu"
            selectedOption={selectedSymbol}
            onSelect={(symbol) => {
              methods.setValue('symbol', symbol);
              setSelectedSymbol(symbol);
            }}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
