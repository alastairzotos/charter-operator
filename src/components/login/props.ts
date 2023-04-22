import { SetupDto } from "../../models/setup";

export interface LoginProps {
  setup: SetupDto;

  onLoading: () => void;
  onError: () => void;
  onSuccess: () => void;
}
