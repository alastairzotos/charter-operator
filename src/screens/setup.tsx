import React from "react";
import { Wrapper } from "../components/wrapper";
import { SetupScanner } from "../components/setup-scanner";

export const SetupScreen: React.FC = () => {
  return (
    <Wrapper>
      <SetupScanner />
    </Wrapper>
  );
}
