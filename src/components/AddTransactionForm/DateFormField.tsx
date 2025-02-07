import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { MethodsType } from './methodsType';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { PopoverClose } from '@radix-ui/react-popover';
import { useState } from 'react';

export function DateFormField({ methods }: MethodsType) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const today = new Date();
  const minDate = new Date();
  minDate.setFullYear(today.getFullYear() - 5);

  return (
    <FormField
      control={methods.control}
      name="date"
      render={({ field }) => {
        const selectedDate = field.value ? new Date(field.value) : undefined;

        return (
          <FormItem className="w-full">
            <FormLabel>Datum transakce</FormLabel>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full px-3 text-left font-normal',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    {selectedDate ? (
                      format(selectedDate, 'dd.MM.yyyy')
                    ) : (
                      <span>Datum transakce</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center" side="top">
                <div className="flex justify-end pr-3 pt-3">
                  <PopoverClose>
                    <XIcon
                      size={16}
                      className="text-muted-foreground hover:text-primary"
                    />
                  </PopoverClose>
                </div>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  className="pt-0"
                  onSelect={(date) => {
                    field.onChange(date?.toISOString());
                    setIsCalendarOpen(false);
                  }}
                  disabled={(date) => date > new Date() || date < minDate}
                  initialFocus
                  captionLayout="dropdown"
                  fromYear={minDate.getFullYear()}
                  toYear={new Date().getFullYear()}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
