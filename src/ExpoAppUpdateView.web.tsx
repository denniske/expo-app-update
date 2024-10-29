import * as React from 'react';

import { ExpoAppUpdateViewProps } from './ExpoAppUpdate.types';

export default function ExpoAppUpdateView(props: ExpoAppUpdateViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
