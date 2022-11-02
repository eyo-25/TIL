import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import Realm, { schemaVersion } from "realm";
import { View } from "react-native";
import Navigator from "./Nabigator";
import { DBContext } from "./cotext";
import { setTestDeviceIDAsync } from "expo-ads-admob";

const FeelingSchema = {
  name: "Feeling",
  properties: {
    _id: "int",
    emotion: "string",
    message: "string",
  },
  primaryKey: "_id",
};

/* 'expo start' Doesn't Work → Must Use 'expo run:android' */
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [realm, setRealm] = useState(null);
  const startLoading = async () => {
    const connection = await Realm.open({
      path: "eyoDiaryDB",
      schema: [FeelingSchema],
    });
    setRealm(connection);
  };

  useEffect(() => {
    async function prepare() {
      try {
        //초기화 함수 넣으면됨
        console.log("load");
        await setTestDeviceIDAsync("EMULATOR");
        await startLoading();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        console.log("loadfinish");
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <DBContext.Provider value={realm}>
      <NavigationContainer>
        <View onLayout={onLayoutRootView}></View>
        <Navigator />
      </NavigationContainer>
    </DBContext.Provider>
  );
}
