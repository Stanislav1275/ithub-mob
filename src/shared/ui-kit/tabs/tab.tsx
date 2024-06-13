//@ts-nocheck
import { styled } from '@gluestack-style/react';
import { Pressable } from '@gluestack-ui/themed';

export const Tab = styled(Pressable, { ':active': { bg: '$primary400' } }, {
  componentName: 'TabsTab',
  descendantStyle: ['_title', '_icon'],
  ancestorStyle: ['_tab'],
} as const);
