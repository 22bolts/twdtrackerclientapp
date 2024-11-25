import { Metadata } from "next";
import PageHeader from "@/app/shared/page-header";

// SEO metadata
export const metadata: Metadata = {
  title: "Payments",
};

const pageHeader = {
  title: "Payments",
  breadcrumb: [
    {
      href: "/",
      name: "Home",
    },
    {
      name: "Payments",
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