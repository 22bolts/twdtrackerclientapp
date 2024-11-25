import React from "react";
import Link from 'next/link'; // Import Link from next/link

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
};

const UserDetailsLink: React.FC<Props> = ({ user }) => {
  return (
    <Link href={`/Users/user-details?id=${user.id}`}> {/* Include user ID as a query parameter */}
      <a>User Details</a>
    </Link>
  );
};

export default UserDetailsLink;
