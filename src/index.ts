import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoAppUpdate.web.ts
// and on native platforms to ExpoAppUpdate.ts
import ExpoAppUpdateModule from './ExpoAppUpdateModule';
import ExpoAppUpdateView from './ExpoAppUpdateView';
import { ChangeEventPayload, ExpoAppUpdateViewProps } from './ExpoAppUpdate.types';

// Get the native constant value.
export const PI = ExpoAppUpdateModule.PI;

export function hello(): string {
  return ExpoAppUpdateModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoAppUpdateModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoAppUpdateModule ?? NativeModulesProxy.ExpoAppUpdate);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoAppUpdateView, ExpoAppUpdateViewProps, ChangeEventPayload };
