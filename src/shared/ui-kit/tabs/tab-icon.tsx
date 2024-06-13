import { styled } from '@gluestack-style/react';
import { View } from '@gluestack-ui/themed';

export const TabIcon = styled(View, {}, {
  componentName: 'TabsTabIcon',
  ancestorStyle: ['_icon'],
} as const);
