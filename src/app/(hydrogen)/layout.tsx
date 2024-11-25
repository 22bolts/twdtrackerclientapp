'use client';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { useLayout } from '@/hooks/use-layout';
import HydrogenLayout from '@/layouts/hydrogen/layout';
import HeliumLayout from '@/layouts/helium/helium-layout';
import BerylLiumLayout from '@/layouts/beryllium/beryllium-layout';

import { useIsMounted } from '@/hooks/use-is-mounted';
import LithiumLayout from '@/layouts/lithium/lithium-layout';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'; // Import Apollo dependencies

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

// client.mutate

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { layout } = useLayout();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  if (layout === LAYOUT_OPTIONS.HELIUM) {
    return (
      <ApolloProvider client={client}>
        <HeliumLayout>{children}</HeliumLayout>
      </ApolloProvider>
    );
  }
  if (layout === LAYOUT_OPTIONS.LITHIUM) {
    return (
      <ApolloProvider client={client}>
        <LithiumLayout>{children}</LithiumLayout>
      </ApolloProvider>
    );
  }
  if (layout === LAYOUT_OPTIONS.BERYLLIUM) {
    return (
      <ApolloProvider client={client}>
        <BerylLiumLayout>{children}</BerylLiumLayout>
      </ApolloProvider>
    );
  }

  return (
  
    <ApolloProvider client={client}>
      <HydrogenLayout>{children}</HydrogenLayout>
    </ApolloProvider>
  );
}
