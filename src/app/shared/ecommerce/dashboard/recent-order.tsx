import { orderData } from '@/data/order-data';
import { getWidgetColumns } from '@/app/shared/ecommerce/order/order-list/columns';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';

export default function RecentOrder({ className }: { className?: string }) {
  return (
    <BasicTableWidget
      title={'Recent Order'}
      data={orderData}
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
