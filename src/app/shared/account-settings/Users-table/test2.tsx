import { useMemo, useState, useEffect } from 'react';
import { getColumns } from './columns';
import { useTable } from '@/hooks/use-table';
import { useColumn } from '@/hooks/use-column';
import { Button } from '@/components/ui/button';
import TableFooter from '@/app/shared/table-footer';
import ControlledTable from '@/components/controlled-table';
import { exportToCSV } from '@/utils/export-to-csv';

interface UserData {
  id: string;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  email: string;
  purchased: number;
  completed: number;
  status: string;
  teams: string[];
}

export default function UsersTableV2({
  className,
  data = [],
}: {
  className?: string;
  data: any[];
}) {
  const [transformedData, setTransformedData] = useState<UserData[]>([]);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
      console.log("Incoming API data:", data);
      const transformed: UserData[] = data.map((item) => ({
        id: String(item.id), // Convert to string as the table expects string IDs
        user: {
          name: item.first_name + ' ' + (item.last_name || ''), // Combine first and last name
          email: item.email,
          avatar: item.avatar || 'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-09.webp', // Default avatar
        },
        email: item.email,
        purchased: item.purchased || 0, // Default to 0 if not present
        completed: item.completed || 0, // Default to 0 if not present
        status: item.status || 'Offline', // Default status
        teams: item.teams || ['Operations'], // Default team
      }));
      console.log("Transformed data:", transformed);
      setTransformedData(transformed);
    }, [data]);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = (id: string) => handleDelete(id);

  const {
    isLoading,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
  } = useTable(transformedData, pageSize);

  const columns = useMemo(
    () =>
      getColumns({
        data: transformedData,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onChecked: handleRowSelect,
        handleSelectAll,
        onDeleteItem,
      }),
    [
      transformedData,
      selectedRowKeys,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
    ]
  );

  const { visibleColumns } = useColumn(columns);

  const selectedData = transformedData.filter((item) => selectedRowKeys.includes(item.id));

  function handleExportData() {
    exportToCSV(
      selectedData,
      'ID,User,Email,Role,Status,Teams',
      `users_table${selectedData.length}`
    );
  }

  if (!transformedData.length) {
    return <div>No data available</div>;
  }

  return (
    <div className={className}>
      <ControlledTable
        isLoading={isLoading}
        data={tableData}
        // @ts-expect-error - Suppressing type check due to complex type inference
        columns={visibleColumns}
        variant="modern"
        rowKey={(record) => record.id}
        className="w-full text-sm"
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: totalItems,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
        }}
        tableFooter={
          <TableFooter
            checkedItems={selectedRowKeys}
            handleDelete={(ids: string[]) => {
              setSelectedRowKeys([]);
              handleDelete(ids);
            }}
          >
            <Button
              size="sm"
              onClick={() => handleExportData()}
              className="dark:bg-gray-300 dark:text-gray-800"
            >
              Download {selectedRowKeys.length}{' '}
              {selectedRowKeys.length > 1 ? 'Files' : 'File'}
            </Button>
          </TableFooter>
        }
      />
    </div>
  );
}