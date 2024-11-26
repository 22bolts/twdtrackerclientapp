'use client';

// import NoSSR from '@/components/no-ssr';
import WidgetCard from '@/components/cards/widget-card';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import { CustomYAxisTick } from '@/components/charts/custom-yaxis-tick';
import {
  Bar,
  Line,
  YAxis,
  XAxis,
  Tooltip,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
} from 'recharts';
import { useState } from 'react';
import SimpleBar from '@/components/ui/simplebar';
import { DatePickerWrapper } from '@/components/ui/datepicker';

type DataType = {
  label: string;
  sessionsPending: number;
  totalAppliedSessions: number;
  sessionsCompleted: number;
  sessionsMissed: number;
};

const data: DataType[] = [
  {
    label: 'Jan',
    sessionsPending: 12,
    totalAppliedSessions: 34,
    sessionsCompleted: 24,
    sessionsMissed: 5,
  },
  {
    label: 'Feb',
    totalAppliedSessions: 60,
    sessionsPending: 35,
    sessionsCompleted: 45,
    sessionsMissed: 20,
  },
  {
    label: 'Mar',
    sessionsPending: 24,
    totalAppliedSessions: 51,
    sessionsCompleted: 36,
    sessionsMissed: 10,
  },
  {
    label: 'Apr',
    sessionsPending: 12,
    totalAppliedSessions: 37,
    sessionsCompleted: 25,
    sessionsMissed: 0,
  },
  {
    label: 'May',
    sessionsPending: 41,
    totalAppliedSessions: 78,
    sessionsCompleted: 56,
    sessionsMissed: 12,
  },
  {
    label: 'Jun',
    sessionsPending: 28,
    totalAppliedSessions: 68,
    sessionsCompleted: 42,
    sessionsMissed: 10,
  },
  {
    label: 'Jul',
    sessionsPending: 39,
    totalAppliedSessions: 50,
    sessionsCompleted: 39,
    sessionsMissed: 20,
  },
  {
    label: 'Aug',
    sessionsPending: 5,
    totalAppliedSessions: 53,
    sessionsCompleted: 37,
    sessionsMissed: 0,
  },
  {
    label: 'Sep',
    sessionsPending: 18,
    totalAppliedSessions: 39,
    sessionsCompleted: 27,
    sessionsMissed: 6,
  },
  {
    label: 'Oct',
    sessionsPending: 28,
    totalAppliedSessions: 61,
    sessionsCompleted: 50,
    sessionsMissed: 10,
  },
  {
    label: 'Nov',
    sessionsPending: 18,
    totalAppliedSessions: 38,
    sessionsCompleted: 29,
    sessionsMissed: 4,
  },
  {
    label: 'Dec',
    sessionsPending: 35,
    totalAppliedSessions: 67,
    sessionsCompleted: 47,
    sessionsMissed: 8,
  },
];

const ticketStatus = [
  { name: 'Total Applied Session' },
  { name: 'Sessions Completed' },
  { name: 'Sessions Pending' },
  { name: 'Sessions Missed' },
];

const COLORS = ['#3872FA', '#eab308', '#7928ca', '#f1416c'];

export function SessionsChart({ className }: { className?: string }) {
  const [startDate, setStartDate] = useState<Date>(new Date());

  return (
    <WidgetCard
      title="Sessions chart"
      className={className}
      headerClassName="items-center"
      action={
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
          className="w-[100px]"
        />
      }
    >
      <div className="mt-3 flex flex-wrap items-start gap-3 lg:gap-7">
        {ticketStatus.map((item, index) => (
          <div key={item.name} className="flex items-center gap-1.5">
            <span
              className="h-3 w-3 rounded-[2px] @2xl:h-4 @2xl:w-4"
              style={{ backgroundColor: COLORS[index] }}
            />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <SimpleBar>
        <div className="mt-5 h-[460px] w-full @sm:mt-3 lg:mt-8">
          <ResponsiveContainer width="100%" height="100%" minWidth="1450px">
            <ComposedChart
              data={data}
              margin={{
                left: -25,
              }}
              barSize={28}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12"
            >
              <CartesianGrid
                vertical={false}
                strokeOpacity={0.435}
                strokeDasharray="8 10"
              />
              <XAxis dataKey="label" axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={<CustomYAxisTick />}
              />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Bar dataKey="totalAppliedSessions" fill="#3872FA" radius={4} />
              <Bar dataKey="sessionsCompleted" fill="#eab308" radius={4} />
              <Line
                type="monotone"
                dataKey="sessionsPending"
                stroke="#7928ca"
                fill="#7928ca"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="bump"
                dataKey="sessionsMissed"
                stroke="#f1416c"
                fill="#f1416c"
                strokeWidth={2}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
    </WidgetCard>
  );
}
