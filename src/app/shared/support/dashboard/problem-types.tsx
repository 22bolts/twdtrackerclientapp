'use client';

import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ComposedChart,
  ResponsiveContainer,
} from 'recharts';
import { useState } from 'react';
import { DatePickerWrapper } from '@/components/ui/datepicker';
import WidgetCard from '@/components/cards/widget-card';
import { CustomTooltip } from '@/components/charts/custom-tooltip';

const data = [
  {
    country: 'Bug Fix',
    amount: 590,
  },
  {
    country: 'Feature',
    amount: 868,
  },
  {
    country: 'Coding',
    amount: 1397,
  },
  {
    country: 'Design',
    amount: 1480,
  },
  {
    country: 'Email',
    amount: 1520,
  },
  {
    country: 'Hosting',
    amount: 1400,
  },
  {
    country: 'Other',
    amount: 868,
  },
];

export default function ProblemTypes({ className }: { className?: string }) {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  return (
    <WidgetCard
      rounded="lg"
      className={className}
      title="Types of Problems"
      descriptionClassName="text-gray-500 mt-1.5"
      description={
        <div className="flex items-center gap-2">
          <span>Show data: </span>
          <DatePickerWrapper
            value={startDate}
            onChange={(date: Date | [Date | null, Date | null] | null) => {
              if (date instanceof Date) {
                setStartDate(date); // Handle single date selection
              }
            }}
            dateFormat="MMM, yyyy"
            placeholderText="Select Month"
            showMonthYearPicker
            popperPlacement="bottom-end"
            inputProps={{
              variant: 'text',
              inputClassName: 'p-0 px-1 h-auto [&_input]:text-ellipsis',
            }}
            className="w-32"
          />
        </div>
      }
    >
      <div className="h-[350px] w-full lg:h-[300px] min-[1780px]:h-[22rem] 3xl:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            layout="vertical"
            margin={{ top: 20, bottom: -10, left: -2 }}
            barCategoryGap={20}
            data={data}
            className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500  rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12"
          >
            <XAxis type="number" axisLine={false} tickLine={false} />
            <YAxis
              dataKey="country"
              type="category"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="amount" barSize={20} radius={4} fill="#3872FA" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}
