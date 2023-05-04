import { type FetchStatus } from "@bitmetro/create-query";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text } from "react-native-paper";

import { CenterScreen } from "components/center-screen";
import { useNotifications } from "hooks/notifications.hook";
import { useAuthState } from "state/auth.state";
import { useNavigate } from "utils/nav";

export const NotificationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const navigation = useNavigate();
  const setupNotifications = useNotifications();
  const { accessToken } = useAuthState();

  const [status, setStatus] = useState<FetchStatus | undefined>(undefined);

  useEffect(() => {
    if (!!accessToken) {
      return setupNotifications({
        onNavigate: (screen, params) => navigation.push(screen, params),
        onStatusChange: setStatus,
      });
    }
  }, [accessToken]);

  if (!status || status === "success") {
    return <>{children}</>;
  }

  return (
    <CenterScreen>
      {status === "fetching" && <ActivityIndicator />}
      {status === "error" && <Text>There was an error</Text>}
    </CenterScreen>
  );
};
