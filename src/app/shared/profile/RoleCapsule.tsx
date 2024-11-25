// RoleCapsule.tsx
import React from 'react';

type RoleProps = {
  role: string;
};

const roleColors: { [key: string]: { bg: string; text: string } } = {
  client: { bg: 'bg-green-200', text: 'text-green-800' },
  employee: { bg: 'bg-blue-200', text: 'text-blue-800' },
  freelancer: { bg: 'bg-red-200', text: 'text-red-800' },
};

const RoleCapsule: React.FC<RoleProps> = ({ role }) => {
  const { bg, text } = roleColors[role] || roleColors.client;

  return (
    <span
      className={`inline-block px-2 py-1 rounded-full font-semibold ${bg} ${text}`}
    >
      {role}
    </span>
  );
};

export default RoleCapsule;
