import { Metadata } from 'next';
import PageHeader from '@/app/shared/page-header';
// import NewUserForm from '@/app/shared/ecommerce/dashboard';
import NewUserForm from './create/page';

// SEO metadata
export const metadata: Metadata = {
  title: 'New Page | Isomorphic Furyroad',
};

const pageHeader = {
  title: 'NewPage',
  breadcrumb: [
    {
      href: '/',
      name: 'CreatePage',
    },
    {
      name: 'CreationPage',
    },
  ],
};

export default function CreationPage() {
  return (
    <>
      {/* <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} /> */}
      {/* <div>
        <li>dsfjfhkdlfkds</li>
      </div> */}
      <NewUserForm />
    </>
  );
}