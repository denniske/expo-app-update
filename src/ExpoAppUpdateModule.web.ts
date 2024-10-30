import { EventEmitter } from "expo-modules-core";
import { AppUpdateInfo } from "./ExpoAppUpdate.types";

const emitter = new EventEmitter({} as any);

export default {
    PI: Math.PI,
    async getAppUpdateInfo(): Promise<AppUpdateInfo> {
        throw new Error("getAppUpdateInfo is not available on the web");
        // emitter.emit('onChange', { value: 'test' });
        // return {
        //     "availableVersionCode": 2000000,
        //     "clientVersionStalenessDays": null,
        //     "installStatus": 0,
        //     "isUpdateTypeAllowed": true,
        //     "packageName": "com.aoe2companion",
        //     "updateAvailability": 0,
        //     "updatePriority": 0
        // };
    },
    async doAppUpdate() {
        throw new Error("doAppUpdate is not available on the web");
    },
    hello() {
        return "Hello world! 👋";
    }
};
