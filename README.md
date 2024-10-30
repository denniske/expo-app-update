# expo-app-update

Fetch the latest version from the play store and app store. Show update dialog (android) or open update in store (ios).

## Implementation (Android)

This modules uses `AppUpdateManager` on android for checking for updates:
https://developer.android.com/guide/playcore/in-app-updates/kotlin-java#update-availability

## Implementation (iOS)

This modules calls 'https://itunes.apple.com/lookup?bundleId=...' on iOS for checking for updates.

# API documentation

```typescript

// Get information about the latest version of the app.
import { getAppUpdateInfo, doAppUpdate } from "expo-app-update";

const appUpdateInfo = await getAppUpdateInfo();
console.log('appUpdateInfo', appUpdateInfo);

// Show update dialog (only android)
if (appUpdateInfo.updateAvailable) {
    await doAppUpdate();
}

// Open the app store page for the app (useful for iOS)
await openAppInStore();
```


```
```typescript
export interface AppUpdateInfo {
    updateAvailable: boolean;
    android?: AndroidInfo;
    ios?: IosInfo;
}

export interface AndroidInfo {
    availableVersionCode: number;
    clientVersionStalenessDays: any;
    installStatus: InstallStatus;
    isUpdateTypeAllowed: boolean;
    packageName: string;
    updateAvailability: UpdateAvailability;
    updatePriority: number;
}

export interface IosInfo {
    version: string;
}
```

# Installation in managed Expo projects

For [managed](https://docs.expo.dev/archive/managed-vs-bare/) Expo projects, please follow the installation instructions in the [API documentation for the latest stable release](#api-documentation). If you follow the link and there is no documentation available then this library is not yet usable within managed projects &mdash; it is likely to be included in an upcoming Expo SDK release.

# Installation in bare React Native projects

For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

### Add the package to your npm dependencies

```
npm install expo-app-update
```

### Configure for iOS

Run `npx pod-install` after installing the npm package.


### Configure for Android

No additional steps are required for Android.

# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide]( https://github.com/expo/expo#contributing).
