// StatusCapsule.tsx
import React from 'react';
import { Badge } from 'rizzui';

type StatusProps = {
  status: string;
};


const statusBadgeColors = {
    offline: 'primary',
    active: 'success',
  } as { [key: string]: string };

const statusColors: { [key: string]: { bg: string; text: string } } = {
  offline: { bg: 'bg-gray-200', text: 'text-gray-600' },
  active: { bg: 'bg-green-200', text: 'text-green-800' },
};

const StatusCapsule: React.FC<StatusProps> = ({ status }) => {
  const { bg, text } = statusColors[status] || statusColors.offline;

  return (
    <>
    <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-full font-semibold ${bg} ${text}`}>
      <Badge renderAsDot color={statusBadgeColors[status] as any} />
      <span>{status}</span>
    </span>
    </>
  );
};

export default StatusCapsule;
