import { type SetupDto } from "models/setup";

export interface LoginProps {
  disabled: boolean;
  onLoading: () => void;
  onError: () => void;
  onSuccess: () => void;
}

export interface OAuthLoginProps extends LoginProps {
  setup: SetupDto;
}
