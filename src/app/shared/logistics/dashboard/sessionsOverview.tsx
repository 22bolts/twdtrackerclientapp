'use client';

import cn from '@/utils/class-names';
import MetricCard from '@/components/cards/metric-card';
import { Text } from '@/components/ui/text';
import WidgetCard from '@/components/cards/widget-card';
import SessionCard from '@/components/cards/session-card';
import ExpenseIcon from '@/components/icons/expenses';
import RevenueUpIcon from '@/components/icons/revenue-up';
import SalesIcon from '@/components/icons/sales';
import ContainersIcon from '@/components/icons/containers';
import ExpressDeliveryIcon from '@/components/icons/express-delivery';
import SimpleBar from '@/components/ui/simplebar';
import DropdownAction from '@/components/charts/dropdown-action';
import TrendingUpIcon from '@/components/icons/trending-up';
import TrendingDownIcon from '@/components/icons/trending-down';
import SessionSubCard from '@/components/cards/session-sub-card';

const sessionData = [
  {
    id: '1',
    title: 'Total applied sessions',
    icon: <ExpenseIcon className="h-7 w-7" />,
    graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
    graphColor: 'text-red',
    metric: 57890,
    value: '100,000',
    increased: true,
    percentage: '+4.40',
  },
  {
    id: '2',
    title: 'Sessions completed',
    icon: <RevenueUpIcon className="h-7 w-7" />,
    graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
    graphColor: 'text-green',
    metric: 1390,
    value: '79,456',
    increased: true,
    percentage: '+32.40',
  },
  {
    id: '3',
    icon: <SalesIcon className="h-9 w-9" />,
    graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
    graphColor: 'text-green',
    title: 'Sessions missed',
    metric: 12390,
    value: '17,459',
    increased: true,
    percentage: '+32.40',
  },
  {
    id: '4',
    title: 'Sessions pending ',
    icon: <ContainersIcon className="h-7 w-7" />,
    graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
    graphColor: 'text-green',
    metric: 12390,
    value: '2,981',
    increased: true,
    percentage: '+32.40',
  },
];

const viewOptions = [
  {
    value: 'today',
    label: 'Today',
  },
  {
    value: 'this-week',
    label: 'This Week',
  },
];

export default function SessionOverviewCards({ className }: { className?: string }) {
  function handleChange(viewType: string) {
    console.log('viewType', viewType);
  }

  return (
    <SessionCard
      rounded="lg"
      className={className}
      title="App Sessions Overview"
      headerClassName="mb-2 @2xl:mb-5"
      action={<DropdownAction options={viewOptions} onChange={handleChange} />}
    >
      <SimpleBar>
        <div className="grid grid-flow-col gap-10 pb-1" >
          {sessionData.map((session) => (
            <SessionSubCard
              key={session.title + session.id}
              title={session.title}
              value={session.value}
              metric={session.metric}
              icon={session.icon}
              className="w-64"
              titleClassName="capitalize"
              contentClassName="ps-5"
              iconClassName={cn('@5xl:w-20 @5xl:h-20 h-16 w-16')}
              chartClassName="hidden @[200px]:flex @[200px]:items-center h-14 w-24"
            >
              <div className='flex items-center justify-center'>
                <Text className="'font-lexend text-lg font-bold text-gray-900 2l:l:text-l dark:text-gray-700'">
                  {session.title}
                </Text>
              </div>
            </SessionSubCard>
          ))}
        </div>
      </SimpleBar>
    </SessionCard>
  );
}
