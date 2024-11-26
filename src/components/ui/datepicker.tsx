import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { cn } from 'rizzui';
import { PiCalendarBlank, PiCaretDownBold } from 'react-icons/pi';
import { Input, InputProps } from 'rizzui';

export interface CustomDatePickerProps {
  value?: Date | [Date | null, Date | null];
  onChange: (
    date: Date | [Date | null, Date | null] | null,
    event?: React.SyntheticEvent<any>
  ) => void;
  inputProps?: InputProps;
  selectsRange?: boolean;
  minDate?: Date;
  maxDate?: Date;
  dateFormat?: string;
  placeholderText?: string;
  showMonthYearPicker?: boolean;
  popperPlacement?: string;
  className?: string;
}

export const DatePickerWrapper: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  inputProps,
  selectsRange = false,
  minDate,
  maxDate,
  dateFormat = 'd MMMM yyyy',
  placeholderText,
  showMonthYearPicker,
  popperPlacement,
  className,
  ...props
}) => {
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const handleCalenderOpen = () => setIsCalenderOpen(true);
  const handleCalenderClose = () => setIsCalenderOpen(false);

  // Separate handling for range and single date
  const selectedDate = Array.isArray(value) ? undefined : value;
  const selectedStartDate = Array.isArray(value) ? value[0] ?? undefined : undefined;
  const selectedEndDate = Array.isArray(value) ? value[1] ?? undefined : undefined;

  const getRangeSelection = (value: boolean | undefined): true | undefined => {
    return value === true ? true : undefined;
  };
  const isRangeSelection = getRangeSelection(selectsRange);

  return (
    <div className={cn("w-full", className)}>
      <DatePicker
        selected={selectedDate}
        startDate={selectedStartDate}
        endDate={selectedEndDate}
        onChange={onChange}
        selectsRange={true}
        minDate={minDate}
        maxDate={maxDate}
        dateFormat={dateFormat}
        placeholderText={placeholderText}
        showMonthYearPicker={showMonthYearPicker}
        onCalendarOpen={handleCalenderOpen}
        onCalendarClose={handleCalenderClose}
        customInput={
          <Input
            prefix={<PiCalendarBlank className="h-5 w-5 text-gray-500" />}
            suffix={
              <PiCaretDownBold
                className={cn(
                  'h-4 w-4 text-gray-500 transition',
                  isCalenderOpen && 'rotate-180'
                )}
              />
            }
            {...inputProps}
          />
        }
        {...props}
      />
    </div>
  );
};