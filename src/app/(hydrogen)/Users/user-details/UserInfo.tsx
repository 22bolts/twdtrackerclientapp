import { Metadata } from 'next';
import PageHeader from '@/app/shared/page-header';
// import NewUserForm from '@/app/shared/ecommerce/dashboard';

// SEO metadata
export const metadata: Metadata = {
  title: 'New Page | Isomorphic Furyroad',
};

const pageHeader = {
  title: 'User Info',
  breadcrumb: [
    {
      href: '/',
      name: 'User details',
    },
    {
      name: 'CreationPage',
    },
  ],
};

export default function UserInfo() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div>
        <li>dsfjfhkdlfkds</li>
      </div>
    </>
  );
}