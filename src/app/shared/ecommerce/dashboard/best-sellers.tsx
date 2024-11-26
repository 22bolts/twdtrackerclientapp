'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Title, Text } from '@/components/ui/text';
import { DatePickerWrapper } from '@/components/ui/datepicker';
import WidgetCard from '@/components/cards/widget-card';
import { Button } from '@/components/ui/button';
import { topProducts } from '@/data/top-products-data';
import Rating from '@/components/rating';

const currentDate = new Date();
const previousMonthDate = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() - 1,
  currentDate.getDate()
);

export default function BestSellers({ className }: { className?: string }) {
  const [starRangeDate, setStartRangeDate] = useState<Date>(previousMonthDate);
  const [endRangeDate, setEndRangeDate] = useState<Date>(currentDate);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    previousMonthDate, 
    currentDate
  ]);


  // const handleRangeChange = (date: Date | [Date | null, Date | null] | null) => {
  //   const [start, end] = date;
  //   setStartRangeDate(start);
  //   setEndRangeDate(end);
  // };
  // const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
  //   previousMonthDate, 
  //   currentDate
  // ]);

  const handleRangeChange = (
    dates: Date | [Date | null, Date | null] | null
  ) => {
    if (Array.isArray(dates)) {
      setDateRange(dates);
    }
  };


  return (
    <WidgetCard
      title={'Top Products'}
      description={
        <>
          Overview:
          <DatePickerWrapper
            value={starRangeDate}
            onChange={handleRangeChange}
            dateFormat="MMM, yyyy"
            placeholderText="Select Month"
            showMonthYearPicker
            popperPlacement="bottom-end"
            inputProps={{
              variant: 'text',
              inputClassName: 'p-0 px-1 h-auto [&_input]:text-ellipsis',
            }}
            className="w-36"
          />
        </>
      }
      action={
        <Button variant="text" className="whitespace-nowrap underline">
          View All
        </Button>
      }
      descriptionClassName="mt-1 flex items-center [&_.react-datepicker-wrapper]:w-full [&_.react-datepicker-wrapper]:max-w-[228px] text-gray-500"
      className={className}
    >
      <div className="custom-scrollbar -me-2 mt-[18px] grid max-h-[460px] gap-4 overflow-y-auto @sm:gap-5">
        {topProducts.map((product) => (
          <div
            key={product.title + product.id}
            className="flex items-start pe-2"
          >
            <div className="relative me-3 h-11 w-11 shrink-0 overflow-hidden rounded bg-gray-100 @sm:h-12 @sm:w-12">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex w-full items-start justify-between">
              <div>
                <Text className="font-lexend text-sm font-medium text-gray-900 dark:text-gray-700">
                  {product.title}
                </Text>
                <Text className="text-gray-500">{product.price}</Text>
              </div>
              <div>
                <Rating rating={product.rating} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
