import { Metadata } from "next";
import PageHeader from "@/app/shared/page-header";
import CoreDashboard from "@/app/shared/logistics/dashboard/coredashboard";

// SEO metadata
export const metadata: Metadata = {
  title: "New Page | Isomorphic",
};

const pageHeader = {
  title: "NewPage",
  breadcrumb: [
    {
      name: "Dashboard",
    },
  ],
};

export default function NewPage() {
//   return (
//     <>
//       <PageHeader
//         title={pageHeader.title}
//         breadcrumb={pageHeader.breadcrumb}
//       />
//     </>
//   );

return <CoreDashboard />;
}     