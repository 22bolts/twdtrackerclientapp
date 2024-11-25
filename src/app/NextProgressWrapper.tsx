// NextProgressWrapper.tsx
"use client";

import dynamic from 'next/dynamic';

const NextProgress = dynamic(() => import('@/components/next-progress'), {
  ssr: false,
});

const NextProgressWrapper = () => {
  return <NextProgress />;
};

export default NextProgressWrapper;
