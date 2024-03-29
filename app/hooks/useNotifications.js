import { useEffect, useRef } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

import expoPushTokensApi from "../api/expoPushTokens";

//This allows to show notification on android even if the is in the foreground.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const useNotifications = (notificationClickListener) => {
  const notificationResponseListener = useRef();

  useEffect(() => {
    registerForPushNotifications();

    if (notificationClickListener)
      notificationResponseListener.current =
        Notifications.addNotificationResponseReceivedListener(
          notificationClickListener
        );

    return () => {
      if (notificationClickListener)
        Notifications.removeNotificationSubscription(
          notificationResponseListener.current
        );
    };
  }, []);

  const registerForPushNotifications = async () => {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;
      expoPushTokensApi.register(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  };
};
