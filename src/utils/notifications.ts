import { FetchStatus } from "@bitmetro/create-query";
import * as Device from "expo-device";
import { Platform } from "expo-modules-core";
import * as Notifications from "expo-notifications";
import { Subscription } from "expo-notifications";
import { useRef } from "react";
import { attachPushTokenToOperator } from "../clients/notifications.client";
import { ScreenKey } from "../screens";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

interface RegisterProps {
  server: string;
  operatorId: string;
  onStatusChange: (status: FetchStatus) => void;
}


interface Props extends RegisterProps {
  onNavigate: (screen: ScreenKey, params?: object) => void;
}

export const useNotifications = () => {
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  return (props: Props) => {
    const { operatorId, onNavigate } = props;

    if (!!operatorId) {
      registerForPushNotificationsAsync(props);

      // This listener is fired whenever a notification is received while the app is foregrounded
      notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
        const {
          notification: {
            request: {
              content: {
                data,
              },
            },
          },
        } = response;

        const { screen, params } = data as { screen: ScreenKey, params: object | undefined };

        if (screen) {
          onNavigate(screen, params);
        }
      });
    }

    return () => {
      if (!!notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }

      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }
}

const registerForPushNotificationsAsync = async ({
  server,
  operatorId,
  onStatusChange,
}: RegisterProps) => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status } = await Notifications.getPermissionsAsync();

    if (status !== "granted") {
      try {
        await Notifications.requestPermissionsAsync();
      } catch {}
    }

    try {
      const { data: token } = await Notifications.getExpoPushTokenAsync({ projectId: "d90937a4-6d0b-413f-a052-8f5abecfada7" });
      onStatusChange('fetching');

      await attachPushTokenToOperator(server, operatorId, token);

      onStatusChange('success');
    } catch {
      onStatusChange('error');
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }
}
