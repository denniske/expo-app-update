import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoAppUpdateViewProps } from './ExpoAppUpdate.types';

const NativeView: React.ComponentType<ExpoAppUpdateViewProps> =
  requireNativeViewManager('ExpoAppUpdate');

export default function ExpoAppUpdateView(props: ExpoAppUpdateViewProps) {
  return <NativeView {...props} />;
}
