import React, { useState, useCallback } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Check as CheckIcon, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SymbolList } from '@/stores/fetchSymbolList';
import { ScrollArea } from './ui/scroll-area';

type VirtualizedComboboxProps = {
  options: SymbolList[];
  placeholder: string;
  selectedOption: string;
  onSelect: (symbol: string) => void;
  height?: string;
};

export const VirtualizedCombobox: React.FC<VirtualizedComboboxProps> = ({
  options,
  placeholder,
  selectedOption,
  onSelect,
  height = '200px',
}) => {
  const [open, setOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<SymbolList[]>(options);
  const [parentNode, setParentNode] = useState<HTMLDivElement | null>(null);

  const rowHeight = 80;

  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentNode,
    estimateSize: () => rowHeight,
    overscan: 5,
  });

  const refCallback = useCallback((node: HTMLDivElement) => {
    if (node) {
      setParentNode(node);
    }
  }, []);

  const handleSearch = (query: string) => {
    setFilteredOptions(
      options.filter(
        (option) =>
          option.symbol.toLowerCase().includes(query.toLowerCase()) ||
          option.name?.toLowerCase().includes(query.toLowerCase()),
      ),
    );
    virtualizer.scrollToIndex(0);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            'justify-between font-normal',
            !selectedOption && 'text-muted-foreground',
          )}
        >
          {selectedOption || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={placeholder}
            onValueChange={handleSearch}
            className="h-9"
          />
          <ScrollArea>
            <CommandEmpty>Žádné výsledky.</CommandEmpty>

            <CommandGroup>
              <CommandList
                style={{ height, overflowY: 'auto' }}
                ref={refCallback}
              >
                <div
                  style={{
                    height: `${virtualizer.getTotalSize()}px`,
                    position: 'relative',
                  }}
                >
                  {virtualizer.getVirtualItems().map((virtualOption) => {
                    const option = filteredOptions[virtualOption.index];
                    return (
                      <CommandItem
                        key={option.symbol}
                        value={option.symbol}
                        style={{
                          position: 'absolute',
                          top: `${virtualOption.start}px`,
                          width: '100%',
                          height: `${rowHeight}px`,
                        }}
                        onSelect={() => {
                          onSelect(option.symbol);
                          setOpen(false);
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            'mr-2 h-4 w-4',
                            selectedOption === option.symbol
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                        <div className="flex flex-col">
                          <p className="font-semibold">{option.symbol}</p>
                          <p className="text-xs">{option.name}</p>
                          <p className="text-xs italic">
                            {option.exchangeShortName}
                          </p>
                        </div>
                      </CommandItem>
                    );
                  })}
                </div>
              </CommandList>
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
