import { Metadata } from "next";
import PageHeader from "@/app/shared/page-header";

// SEO metadata
export const metadata: Metadata = {
  title: "Team",
};

const pageHeader = {
  title: "Team",
  breadcrumb: [
    {
      href: "/dashboard",
      name: "Dashboard",
    },
    {
      name: "Team",
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
    </>
  );
}     