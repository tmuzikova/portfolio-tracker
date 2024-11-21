import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { VirtualizedCombobox } from './VirtualizedCombobox';
import { SymbolList } from '@/hooks/useSymbolList';
import { MethodsType } from './methodsType';

interface SymbolSelectFormFieldProps extends MethodsType {
  symbolList: SymbolList[];
  selectedHolding: SymbolList | undefined;
  setselectedHolding: React.Dispatch<
    React.SetStateAction<SymbolList | undefined>
  >;
}

export const SymbolSelectFormField = ({
  methods,
  symbolList,
  selectedHolding,
  setselectedHolding,
}: SymbolSelectFormFieldProps) => {
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
            selectedOption={selectedHolding}
            onSelect={(holding) => {
              methods.setValue('symbol', holding.symbol);
              setselectedHolding(holding);
            }}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
