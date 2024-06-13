import { styled } from '@gluestack-style/react';
import { View } from '@gluestack-ui/themed';

export const TabsList = styled(View, {}, {
  componentName: 'TabsTabList',
  descendantStyle: ['_tab'],
} as const);
