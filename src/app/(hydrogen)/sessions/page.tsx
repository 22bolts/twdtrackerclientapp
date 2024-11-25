import { Metadata } from "next";
import PageHeader from "@/app/shared/page-header";
import RecentOrder from "@/app/shared/ecommerce/dashboard/recent-order";
import SessionList from "@/app/shared/ecommerce/dashboard/sessions-list";

// SEO metadata
export const metadata: Metadata = {
  title: "New Page | Isomorphic",
};

const pageHeader = {
  title: "Sessions",
  breadcrumb: [
    {
      href: "/",
      name: "Dashboard",
    },
    {
      name: "Sessions",
    },
  ],
};

export default function NewPage() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      />
      
      <div className="@container">
        <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
          <SessionList className="relative @4xl:col-span-2 @7xl:col-span-12" />
        </div>
      </div>
    </>
  );
}     