import { type FetchStatus } from "@bitmetro/create-query";
import { CenterScreen } from "components/center-screen";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text } from "react-native-paper";

import { useSetup } from "state/setup.state";
import { useNavigate } from "utils/nav";
import { useNotifications } from "hooks/notifications.hook";

export const NotificationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const navigation = useNavigate();
  const { setup } = useSetup();
  const setupNotifications = useNotifications();

  const [status, setStatus] = useState<FetchStatus | undefined>(undefined);

  useEffect(() => {
    if (setup) {
      return setupNotifications({
        server: setup.server,
        operatorId: setup.operator.id,
        onNavigate: (screen, params) => navigation.push(screen, params),
        onStatusChange: setStatus,
      });
    }
  }, [setup?.id]);

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
