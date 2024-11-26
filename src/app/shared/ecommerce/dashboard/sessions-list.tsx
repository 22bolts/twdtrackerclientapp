import { orderData } from '@/data/order-data';
// import { getWidgetColumns } from '@/app/shared/ecommerce/order/order-list/columns';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import { getWidgetColumns } from '../session/session-list/columns';
import { gymData } from '@/data/session-data';

export default function SessionList({ className }: { className?: string }) {
  return (
    <BasicTableWidget
      title={'All sessions'}
      data={gymData}
      // @ts-expect-error - Suppressing type check due to complex type inference
      getColumns={getWidgetColumns}
      className={className}
      enablePagination
      noGutter
      searchPlaceholder="Search order..."
      variant="modern"
    />
  );
}
