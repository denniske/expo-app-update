import { StyleSheet, Text, View } from "react-native";

import * as ExpoAppUpdate from "expo-app-update";
import { addChangeListener, openAppInStore } from "expo-app-update";
import { useEffect } from "react";

export default function App() {
    useEffect(() => {
        // console.log(ExpoTemp.hello());

        // setTimeout(() => {
        //     console.log("openAppInStore");
        //     openAppInStore();
        // }, 3000);

        addChangeListener((event) => {
            console.log("change", event);
        });

        ExpoAppUpdate.getAppUpdateInfo().then((appUpdateInfo) => {
            console.log("appUpdateInfo", appUpdateInfo);
            console.log("appUpdateInfo.updateAvailable", appUpdateInfo.updateAvailable);
        });

        // ExpoAppUpdate.doAppUpdate().then((appUpdateInfo) => {
        //   console.log("appUpdateInfo", appUpdateInfo);
        //   console.log("appUpdateInfo.packageName", appUpdateInfo.packageName);
        // });
    }, []);

    return (
        <View style={styles.container}>
            <Text>{ExpoAppUpdate.hello()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});
