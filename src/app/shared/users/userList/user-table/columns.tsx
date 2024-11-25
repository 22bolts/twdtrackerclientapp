'use client';

import Image from 'next/image';
import cn from '@/utils/class-names';
import { Title, Text } from '@/components/ui/text';
import { HeaderCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip } from '@/components/ui/tooltip';
import { ActionIcon } from '@/components/ui/action-icon';
import { Badge } from '@/components/ui/badge';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/app/shared/delete-popover';
import Link from 'next/link';
import LinkedinIcon from '@/components/icons/linkedin';

import { BookOpenOutline } from 'heroicons-react';

const statusColors = {
  offline: '',
  active: 'success',
} as { [key: string]: string };

const chipsColors = {
  Design: 'bg-orange-lighter text-orange-dark',
  Product: 'bg-blue-lighter text-blue-dark',
  'Software Engineering': 'bg-green-lighter text-green-dark',
  Operations: 'bg-red-lighter text-red-dark',
  Finance: 'bg-primary-lighter text-primary-dark',
  'Human Resource': 'bg-secondary-lighter text-secondary-dark',
} as { [key: string]: string };

type Columns = {
  usersData: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  onDeleteItem: (id: string) => void;
};

export const getColumns = ({
  usersData,
  sortConfig,
  checkedItems,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  onDeleteItem,
}: Columns) => [
  {
    title: (
      <div className="ps-2">
        <Checkbox
          title={'Select All'}
          onChange={handleSelectAll}
          checked={checkedItems.length === usersData.length}
          className="cursor-pointer"
        />
      </div>
    ),
    dataIndex: 'checked',
    key: 'checked',
    width: 30,
    render: (_: any, row: any) => (
      <div className="inline-flex ps-2">
        <Checkbox
          className="cursor-pointer"
          checked={checkedItems.includes(row.id)}
          {...(onChecked && { onChange: () => onChecked(row.id) })}
        />
      </div>
    ),
  },
  {
    title: <HeaderCell title="Name" />,
    onHeaderCell: () => onHeaderCellClick('user.name'),
    dataIndex: 'user',
    key: 'user',
    width: 400,
    render: ({ name, usertag, avatar }: any) => (
      <div className="flex items-center">
        <Image
          src={`http://localhost:3001/${avatar}`}
          alt={name}
          width={36}
          height={36}
          className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-full bg-gray-100 object-cover shadow-xl"
        />
        <div className="ml-3 rtl:ml-0 rtl:mr-3">
          <Title
            as="h6"
            className="mb-0.5 line-clamp-1 whitespace-nowrap !text-sm font-medium"
          >
            {name}
          </Title>
          <Text className="text-xs text-gray-500">@{usertag}</Text>
        </div>
      </div>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Status"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'status'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('status'),
    dataIndex: 'status',
    key: 'status',
    width: 200,
    render: (status: any) => {
      return (
        <>
          {status === 'offline' ? (
            <div className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-100/80 px-2.5 py-1">
              <Badge renderAsDot />
              <span className="text-xs font-semibold text-gray-900">
                {status}
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center justify-center gap-2 rounded-full bg-green-lighter px-2.5 py-1">
              <Badge renderAsDot color={statusColors[status] as any} />
              <span className="text-xs font-semibold text-green-dark">
                {status}
              </span>
            </div>
          )}
        </>
      );
    },
  },
  {
    title: (
      <HeaderCell
        title={<span className="whitespace-nowrap">Email Address</span>}
      />
    ),
    dataIndex: 'email',
    key: 'email',
    width: 400,
    render: (email: string) => (
      <span className="mr-6 block whitespace-nowrap">{email}</span>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Role"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'status'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('status'),
    dataIndex: 'role',
    key: 'role',
    width: 200,
    render: (role: any) => {
      let bgColor = '';
      let textColor = '';
  
      switch (role) {
        case 'client':
          bgColor = 'bg-green-lighter';
          textColor = 'text-green-900';
          break;
        case 'employee':
          bgColor = 'bg-blue-lighter';
          textColor = 'text-blue-900';
          break;
        case 'freelancer':
          bgColor = 'bg-red-lighter';
          textColor = 'text-red-dark';
          break;
        default:
          break;
      }
  
      return (
        <div className={`inline-flex items-center justify-center gap-2 rounded-full px-2.5 py-1 ${bgColor}`}>
          {/* <Badge renderAsDot /> */}
          <span className={`text-xs font-semibold ${textColor}`}>
            {role}
          </span>
        </div>
      );
    },
  },
  // {
  //   title: (
  //     <HeaderCell
  //       title={<span className="whitespace-nowrap">Email Address</span>}
  //     />
  //   ),
  //   dataIndex: 'email',
  //   key: 'email',
  //   width: 400,
  //   render: (email: string) => (
  //     <span className="mr-6 block whitespace-nowrap">{email}</span>
  //   ),
  // },
  // {
  //   title: (
  //     <HeaderCell title={<span className="whitespace-nowrap">Teams</span>} />
  //   ),
  //   dataIndex: 'teams',
  //   key: 'teams',
  //   width: 200,
  //   render: (value: any) => (
  //     <div className="flex gap-2 whitespace-nowrap">
  //       {value.map((item: any, index: number) => {
  //         return (
  //           <Text
  //             key={`chips-${index}`}
  //             as="span"
  //             className={cn(
  //               'inline-flex items-center justify-center gap-2 rounded-full bg-green-lighter px-2.5 py-1 text-xs font-semibold',
  //               chipsColors[item]
  //             )}
  //           >
  //             {item}
  //           </Text>
  //         );
  //       })}
  //     </div>
  //   ),
  // },


  
  // {
  //   title: (
  //     <HeaderCell
  //       className="ps-3"
  //       title={<span className="whitespace-nowrap">Actions</span>}
  //     />
  //   ),
  //   dataIndex: 'action',
  //   key: 'action',
  //   width: 200,
  //   render: (_: string, row: any) => (
  //     <div className="flex items-center justify-end gap-3 pe-4">
        
  //       {/* View Details */}
  //       <Tooltip
  //         size="sm"
  //         content={'View Details'}
  //         placement="top"
  //         color="invert"
  //       >
  //         <ActionIcon size="sm" variant="outline">
  //           <Link
  //             href={{
  //               pathname: '/Users/user-details',
  //               query: {
  //                 name: "John Doe",
  //                 age: "25",
  //                 first_name: row.first_name,
  //                 last_name: row.last_name,
  //                 middle_name: row.middle_name,
  //                 email: row.email,
  //                 phone_number: row.phone_number,
  //                 role: row.role,
  //               }
  //             }}
  //           >
  //             <BookOpenOutline className="h-4 w-4 text-blue-500" size={24} />
  //           </Link>
  //         </ActionIcon>
  //       </Tooltip>
  //       <Tooltip
  //         size="sm"
  //         content={'Edit Member'}
  //         placement="top"
  //         color="invert"
  //       >
  //         <ActionIcon size="sm" variant="outline">
  //           <PencilIcon className="h-4 w-4" />
  //         </ActionIcon>
  //       </Tooltip>
  //       <DeletePopover
  //         title={`Delete Member`}
  //         description={`Are you sure you want to delete this #${row.id} member?`}
  //         onDelete={() => onDeleteItem(row.id)}
  //       />
  //     </div>
  //   ),
  // },



  {
    title: (
      <HeaderCell
        className="ps-3"
        title={<span className="whitespace-nowrap">Actions</span>}
      />
    ),
    dataIndex: 'action',
    key: 'action',
    width: 200,
    render: (_: any, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        
        {/* View Details */}
        <Tooltip
          size="sm"
          content={'View Details'}
          placement="top"
          color="invert"
        >
          <ActionIcon size="sm" variant="outline">
            <Link
              href={{
                pathname: '/Users/user-details',
                query: {
                  name: "John Doe",
                  age: "25",
                  first_name: row.first_name,
                  last_name: row.last_name,
                  middle_name: row.middle_name,
                  email: row.email,
                  phone_number: row.phone_number,
                  role: row.role,
                  usertag: row.usertag,
                  status: row.status,
                  avatar: row.user.avatar,
                }
              }}
            >
              {/* <BookOpenOutline className="h-4 w-4 text-blue-500" size={24} /> */}
              
              <LinkedinIcon className="h-4 w-4 text-blue-500" />
            </Link>
          </ActionIcon>
        </Tooltip>
        <Tooltip
          size="sm"
          content={'Edit Member'}
          placement="top"
          color="invert"
        >
          <ActionIcon size="sm" variant="outline">
            <PencilIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
        <DeletePopover
          title={`Delete Member`}
          description={`Are you sure you want to delete this #${row.id} member?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];
