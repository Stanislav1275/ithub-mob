import React, {PropsWithChildren} from 'react';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {QueryClientProvider} from 'react-query';
import {queryClient} from "@/shared/lib/react-query/client";
import {config} from "@gluestack-ui/config";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider contextSharing client={queryClient}>
      <GluestackUIProvider config={config}>{children}</GluestackUIProvider>
    </QueryClientProvider>
  );
};
