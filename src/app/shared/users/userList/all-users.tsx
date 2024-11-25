import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Title, Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/app/shared/delete-popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip } from '@/components/ui/tooltip';
import { ActionIcon } from '@/components/ui/action-icon';

const statusColors = {
  Offline: '',
  Active: 'success',
} as { [key: string]: string };

const chipsColors = {
  Design: 'bg-orange-lighter text-orange-dark',
  Product: 'bg-blue-lighter text-blue-dark',
  'Software Engineering': 'bg-green-lighter text-green-dark',
  Operations: 'bg-red-lighter text-red-dark',
  Finance: 'bg-primary-lighter text-primary-dark',
  'Human Resource': 'bg-secondary-lighter text-secondary-dark',
} as { [key: string]: string };

type User = {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  phone_number: string;
  role: string;
};

type Props = {
  user: User;
  onDeleteItem: (id: string) => void;
};

const AllUsers: React.FC<Props> = ({ user, onDeleteItem }) => {
  const navigation = useRouter();

  const handleDelete = () => {
    onDeleteItem(user.id);
  };

  const handleUserClick = () => {
    console.log(user)
    // navigation.push(`/Users/user-details?id=${user.id}`);
  };

  return (
    <Link href={{
      pathname: '/Users/user-details',
      query: {
        name: "John Doe",
        age: "25",
        first_name: user.first_name,
        last_name: user.last_name,
        middle_name: user.middle_name,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role,
      }
    }}>
      <div
        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-md"
        // onClick={handleUserClick}
        style={{ cursor: 'pointer' }}
      >
        <div className="flex items-center space-x-4">
          <Image
            src={'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-09.webp'}
            alt={user.first_name}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover shadow-xl"
          />
          <div>
            <Title as="h6" className="text-sm font-medium">{user.first_name} {user.last_name}</Title>
            <Text className="text-xs text-gray-500">{user.email}</Text>
          </div>
        </div>
        <Text className="mr-6 block whitespace-nowrap">{user.phone_number}</Text>
        <span className="mr-6 block whitespace-nowrap">{user.email}</span>
        <div className="inline-flex items-center justify-center gap-2 rounded-full bg-red-lighter px-2.5 py-1">
          <span className="text-xs font-semibold text-red-dark">
            {user.role}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <Tooltip size="sm" content={'Edit Member'} placement="top" color="invert">
            <ActionIcon size="sm" variant="outline">
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Tooltip>
          <DeletePopover
            title={`Delete Member`}
            description={`Are you sure you want to delete this #${user.id} member?`}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </Link>
  );
};

export default AllUsers;
