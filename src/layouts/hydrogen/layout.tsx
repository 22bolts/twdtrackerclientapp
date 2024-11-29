import Header from '@/layouts/hydrogen/header';
import Sidebar from '@/layouts/hydrogen/sidebar';

export default function HydrogenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <main className="flex min-h-screen flex-grow">
    //   <Sidebar className="fixed hidden dark:bg-gray-50 xl:block" />
    //   <div className="flex w-full flex-col xl:ml-[270px] xl:w-[calc(100%-270px)] 2xl:ml-72 2xl:w-[calc(100%-288px)]">
    //     <Header />
    //     <div className="flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9">
    //       {children}
    //     </div>
    //   </div>
    // </main>

    
    <div className="flex">
      <Sidebar className="hidden xl:block left-0 top-0 h-full w-64" />
      <div className="hidden xl:block left-0 top-0 h-full w-64">
      </div>
      <div className="hidden xl:block left-0 top-0 h-full w-16">
      </div>
      <main className="flex w-full flex-col xl:ml-[270px] xl:w-[calc(100%-270px)] 2xl:ml-72 2xl:w-[calc(100%-288px)]">
        <Header />
        <div className="p-4">
          {children}
        </div>
      </main>
    </div>
  );
}
