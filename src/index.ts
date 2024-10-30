import { EventEmitter, NativeModulesProxy, Subscription } from "expo-modules-core";

// Import the native module. On web, it will be resolved to ExpoAppUpdate.web.ts
// and on native platforms to ExpoAppUpdate.ts
import ExpoAppUpdateModule from "./ExpoAppUpdateModule";
import ExpoAppUpdateView from "./ExpoAppUpdateView";
import { AppUpdateInfo, ChangeEventPayload, ExpoAppUpdateViewProps, UpdateAvailability } from "./ExpoAppUpdate.types";
import Constants from "expo-constants";
import { Linking, Platform } from "react-native";

// Get the native constant value.
export const PI = ExpoAppUpdateModule.PI;

export function hello(): string {
    return ExpoAppUpdateModule.hello();
}

export async function getAppUpdateInfo(): Promise<AppUpdateInfo> {
    return await ExpoAppUpdateModule.getAppUpdateInfo();
}

export async function doAppUpdate(): Promise<void> {
    return await ExpoAppUpdateModule.doAppUpdate();
}

export async function openAppInStore(): Promise<void> {
    if (Platform.OS === "android" && Constants.expoConfig?.android?.playStoreUrl) {
        await Linking.openURL(Constants.expoConfig?.android?.playStoreUrl);
    } else if (Platform.OS === "ios" && Constants.expoConfig?.ios?.appStoreUrl) {
        await Linking.openURL(Constants.expoConfig?.ios?.appStoreUrl);
    } else {
        console.log("openAppInStore: no store url found. Note: This method can only be used in production / test flight build.");
    }

    // const packageName = Constants.expoConfig?.android?.package;
    // if (Platform.OS === "android") {
    //     // Implement in native later:
    //     // https://developer.android.com/distribute/marketing-tools/linking-to-google-play#android-app
    //     await Linking.openURL(`https://play.google.com/store/apps/details?id=${packageName}&hl=en`);
    // } else {
    //     // const appUpdateInfo = await getAppUpdateInfo();
    //     // const appId = appUpdateInfo.
    //     // const storeUrl = `itms-apps://apps.apple.com/app/id${appId}`;
    //     // const url = `https://apps.apple.com/app/id${appId}`;
    //     // if (await Linking.canOpenURL(updateStoreManifest.storeUrl)) {
    //     //     await Linking.openURL(updateStoreManifest.storeUrl);
    //     //     return;
    //     // }
    //     // await Linking.openURL(updateStoreManifest.url);
    //     await Linking.openURL('https://apps.apple.com/app/id1518463195');
    // }

    //     const updateUrl = `https://itunes.apple.com/lookup?bundleId=${packageName}`;
    //     const response = await fetch(updateUrl);
    //     const result = await response.json();
    //     if (result.resultCount) {
    //         const version = result.results[0].version;
    //         const appId = result.results[0].trackId;
    //         const storeUrl = `itms-apps://apps.apple.com/app/id${appId}`;
    //         const url = `https://apps.apple.com/app/id${appId}`;
    //         return {
    //             isAvailable: lt(Constants.expoConfig.version!, version),
    //             version,
    //             storeUrl,
    //             url,
    //         };
    //     }
}

const emitter = new EventEmitter(ExpoAppUpdateModule ?? NativeModulesProxy.ExpoAppUpdate);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
    return emitter.addListener<ChangeEventPayload>("onChange", listener);
}

export { ExpoAppUpdateView, ExpoAppUpdateViewProps, ChangeEventPayload, UpdateAvailability };
