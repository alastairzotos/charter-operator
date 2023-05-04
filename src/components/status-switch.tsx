import { FetchStatus } from "@bitmetro/create-query";
import React from "react";
import { ActivityIndicator } from "react-native-paper";

import { CenterScreen } from "components/center-screen";

interface Props {
  status?: FetchStatus;
  none?: React.ReactNode;
  fetching?: React.ReactNode;
  error: React.ReactNode;
}

export const StatusSwitch: React.FC<React.PropsWithChildren<Props>> = ({
  status,
  none,
  fetching,
  error,
  children,
}) => {
  return (
    <>
      {status == undefined && none}
      {status === "fetching" &&
        (fetching || (
          <CenterScreen>
            <ActivityIndicator size="small" />
          </CenterScreen>
        ))}
      {status === "error" && error}
      {status === "success" && <>{children}</>}
    </>
  );
};
