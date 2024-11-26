'use client';

import React from 'react';
import { DatePickerWrapper, CustomDatePickerProps } from '@/components/ui/datepicker';

export default function DateFiled({
  selected,
  startDate,
  endDate,
  onChange,
  placeholderText = 'Select date',
  inputProps,
  ...props
}: CustomDatePickerProps & {
  selected?: Date;
  startDate?: Date | null;
  endDate?: Date | null;
  onChange?: (date: Date | [Date | null, Date | null] | null) => void;
}) {
  return (
    <div>
      <DatePickerWrapper
        value={startDate && endDate ? [startDate, endDate] : selected}
        onChange={(date: Date | [Date | null, Date | null] | null) => {
          if (onChange) {
            onChange(date);
          }
        }}
        selectsRange={!!startDate && !!endDate}
        placeholderText={placeholderText}
        dateFormat="MMM dd, yyyy"
        popperPlacement="bottom-end"
        inputProps={{
          variant: 'text',
          inputClassName: 'p-0 px-1 h-auto [&_input]:text-ellipsis',
          ...inputProps,
        }}
        className="w-36"
        {...props}
      />
    </div>
  );
}