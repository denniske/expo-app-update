import { NativeModule, requireNativeModule } from 'expo-modules-core';
import { AppUpdateInfo, ExpoAppUpdateModuleEvents } from "./ExpoAppUpdate.types";


declare class ExpoAppUpdateModule extends NativeModule<ExpoAppUpdateModuleEvents> {
    getAppUpdateInfo(): Promise<AppUpdateInfo>;
    doAppUpdate(): void;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoAppUpdateModule>('ExpoAppUpdate');
