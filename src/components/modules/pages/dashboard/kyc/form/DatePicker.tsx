// 📌 Directives
'use client';

// 📦 Third-Party imports
import * as React from 'react';
import { CalendarDays, CalendarArrowUp } from 'lucide-react';
import { Button } from '~core/ui/shadcn/button';
import { Calendar } from '~core/ui/shadcn/calendar';
import { Input } from '~core/ui/shadcn/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~core/ui/shadcn/popover';

// 🧾 Local helpers
const formatDate = (date: Date | undefined) => {
  if (!date) {
    return '';
  }
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const isValidDate = (date: Date | undefined) => {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
};

const DatePicker = () => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(formatDate(date));

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full flex-col gap-3">
        <div className="relative flex gap-2">
          <Input
            id="date"
            value={value}
            placeholder="June 01, 2025"
            className="peer bg-background focus-visible:border-b-primary rounded-sm py-5 pr-10 pl-8 !ring-0"
            onChange={(e) => {
              const date = new Date(e.target.value);
              setValue(e.target.value);
              if (isValidDate(date)) {
                setDate(date);
                setMonth(date);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setOpen(true);
              }
            }}
          />
          <div className="absolute top-3 left-1.5">
            <CalendarDays size={19} className="text-neutral-400" />
          </div>

          <span className="absolute -top-2 left-4 rounded-[9999px] bg-neutral-800 px-3 text-xs opacity-0 transition-all peer-focus-visible:opacity-100">
            Date of birth
          </span>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                id="date-picker"
                variant="ghost"
                className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
              >
                <CalendarArrowUp className="size-3.5" />
                <span className="sr-only">Select date</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                month={month}
                onMonthChange={setMonth}
                onSelect={(date) => {
                  setDate(date);
                  setValue(formatDate(date));
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
