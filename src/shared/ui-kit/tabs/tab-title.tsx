import { styled } from '@gluestack-style/react';
import { Text } from '@gluestack-ui/themed';

export const TabTitle = styled(Text, {}, {
  componentName: 'TabsTabTitle',
  ancestorStyle: ['_title'],
} as const);
