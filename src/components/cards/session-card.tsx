import { Title } from '@/components/ui/text';
import cn from '@/utils/class-names';
import { ForwardedRef, forwardRef } from 'react';

const SessionCardClasses = {
  // base: 'border border-muted bg-gray-0 p-8 dark:bg-gray-50 lg:p-10',
  base: 'border border-muted bg-gray-0 px-8 py-5 dark:bg-gray-50 lg:px-10 lg:py-7',
  rounded: {
    sm: 'rounded-sm',
    DEFAULT: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
  },
};

type SessionCardTypes = {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  rounded?: keyof typeof SessionCardClasses.rounded;
  headerClassName?: string;
  titleClassName?: string;
  actionClassName?: string;
  descriptionClassName?: string;
  className?: string;
};

function SessionCard(
  {
    title,
    action,
    description,
    rounded = 'DEFAULT',
    className,
    headerClassName,
    actionClassName,
    titleClassName,
    descriptionClassName,
    children,
  }: React.PropsWithChildren<SessionCardTypes>,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      className={cn(
        SessionCardClasses.base,
        SessionCardClasses.rounded[rounded],
        // 'p-8 lg:p-10',
        'px-16 lg:px-20',
        className
      )}
      
      style={{
        backgroundImage: `url('/images/BG.png')`,  // Direct reference to public folder
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      ref={ref}
    >
      <div
        className={cn(
          action && 'flex items-start justify-between',
          headerClassName
        )}
      >
        <div>
          <Title
            as="h3"
            className={cn('text-4xl font-bold', titleClassName)}
          >
            {title}
          </Title>
          {description && (
            <div className={descriptionClassName}>{description}</div>
          )}
        </div>
        {action && <div className={cn('ps-2', actionClassName)}>{action}</div>}
      </div>
      {children}
    </div>
  );
}

export default forwardRef(SessionCard);
SessionCard.displayName = 'SessionCard';
