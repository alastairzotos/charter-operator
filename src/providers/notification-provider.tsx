import { type FetchStatus } from "@bitmetro/create-query";
import { CenterScreen } from "components/center-screen";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text } from "react-native-paper";

import { useNavigate } from "utils/nav";
import { useNotifications } from "hooks/notifications.hook";
import { env } from "utils/env";

export const NotificationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const navigation = useNavigate();
  const setupNotifications = useNotifications();

  const [status, setStatus] = useState<FetchStatus | undefined>(undefined);

  useEffect(() => {
    return setupNotifications({
      operatorId: "", // TODO: Remove this
      onNavigate: (screen, params) => navigation.push(screen, params),
      onStatusChange: setStatus,
    });
  }, []);

  if (!status || status === "success") {
    return <>{children}</>;
  }

  return (
    <CenterScreen>
      {status === "fetching" && <ActivityIndicator />}
      {status === "error" && <Text>There was an error</Text>}
    </CenterScreen>
  )
};
