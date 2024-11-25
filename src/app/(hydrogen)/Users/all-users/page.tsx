import { Metadata } from 'next';
import PageHeader from '@/app/shared/page-header';
// import NewUserForm from '@/app/shared/ecommerce/dashboard';
import ListUsers from './user-list/page';

// SEO metadata
export const metadata: Metadata = {
  title: 'New Page | Isomorphic Furyroad',
};

const pageHeader = {
  title: 'User List',
  breadcrumb: [
    {
      href: '/',
      name: 'home',
    },
    {
      name: 'Clients',
    },
  ],
};

export default function UserListPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      {/* <div>
        <li>dsfjfhkdlfkds</li>
      </div> */}
      <ListUsers />
    </>
  );
}