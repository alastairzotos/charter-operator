import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";

import { LoginButton } from "components/login/button-base";
import { LoginProps } from "components/login/props";
import { useEmailPasswordLogin } from "state/login.state";

export const LoginWithEmailAndPassword: React.FC<LoginProps> = ({
  disabled,
  onLoading,
  onError,
  onSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { status, request: login } = useEmailPasswordLogin();

  useEffect(() => {
    switch (status) {
      case "fetching":
        onLoading();
        break;
      case "error":
        onError();
        break;
      case "success":
        onSuccess();
        break;
    }
  }, [status]);

  return (
    <>
      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        disabled={disabled}
      />

      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        disabled={disabled}
      />

      <LoginButton
        prompt="Login"
        disabled={disabled}
        onPress={() => login({ email, password })}
      />
    </>
  );
};
