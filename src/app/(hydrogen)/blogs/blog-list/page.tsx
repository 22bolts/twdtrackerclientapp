import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Blank Page'),
};

const pageHeader = {
  title: 'Blog list',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Blog-list',
    },
  ],
};

export default function blogList() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
    </>
  );
}
