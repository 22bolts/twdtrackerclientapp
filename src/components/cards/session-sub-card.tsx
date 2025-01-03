'use client';

import { Title, Text } from '@/components/ui/text';
import cn from '@/utils/class-names';

const metricCardClasses = {
  base: 'border border-muted bg-gray-0 p-5 dark:bg-gray-50 lg:p-6',
  rounded: {
    sm: 'rounded-sm',
    DEFAULT: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
  },
};

type MetricCardTypes = {
  title: string;
  value: string;
  metric: React.ReactNode;
  icon?: React.ReactNode;
  iconClassName?: string;
  contentClassName?: string;
  chart?: React.ReactNode;
  info?: React.ReactNode;
  rounded?: keyof typeof metricCardClasses.rounded;
  titleClassName?: string;
  metricClassName?: string;
  chartClassName?: string;
  className?: string;
};

export default function SessionSubCard({
  title,
  metric,
  value,
  icon,
  chart,
  info,
  rounded = 'DEFAULT',
  className,
  iconClassName,
  contentClassName,
  titleClassName,
  metricClassName,
  chartClassName,
  children,
}: React.PropsWithChildren<MetricCardTypes>) {
  return (
    <div
      className={cn(
        metricCardClasses.base,
        metricCardClasses.rounded[rounded],
        className
      )}
    >
      <div className="flex items-center justify-center">
        <>
          <div className="flex items-center">
            {/* {icon ? (
              <div
                className={cn(
                  'flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 lg:h-12 lg:w-12',
                  iconClassName
                )}
              >
                {icon}
              </div>
            ) : null} */}

            <div>
              <Text
                className={cn(
                  'font-lexend text-lg font-semibold text-gray-900 2xl:xl:text-xl dark:text-gray-700',
                  metricClassName
                )}
              >
                {value}
              </Text>

              {info ? info : null}
            </div>
          </div>
          {chart ? (
            <div className={cn('h-12 w-20', chartClassName)}>{chart}</div>
          ) : null}
        </>
      </div>

      {children}
    </div>
  );
}
