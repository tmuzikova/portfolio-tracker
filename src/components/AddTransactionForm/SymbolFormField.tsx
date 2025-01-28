import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { VirtualizedCombobox } from './VirtualizedCombobox';
import { SymbolItem } from '@/hooks/useSymbolList';
import { MethodsType } from './methodsType';
import { EXCHANGES } from '@/components/AddTransactionForm/EXCHANGES';

type SymbolSelectFormFieldProps = MethodsType & {
  symbolList: SymbolItem[];
};

export const SymbolSelectFormField = ({
  methods,
  symbolList,
}: SymbolSelectFormFieldProps) => {
  const selectedSymbol = methods.watch('symbol');
  const selectedHolding = symbolList.find(
    (symbol) => symbol.symbol === selectedSymbol,
  );

  const onSelectHandler = (holding: SymbolItem) => {
    methods.setValue('symbol', holding.symbol);
    const selectedCurrency = EXCHANGES.find(
      (exchange) => exchange.name === holding.exchange,
    )?.currency;

    methods.setValue('currency', selectedCurrency ?? '');
    methods.setValue('name', holding.name ?? '');
  };

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
            onSelect={onSelectHandler}
          />
          <FormDescription>
            Lze zadávat pouze aktiva obchodovaná na burzách v USA. Ostatní
            transakce nebudou zpracovány.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
