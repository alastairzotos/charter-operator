export interface LoginProps {
  disabled: boolean;
  onLoading: () => void;
  onError: () => void;
  onSuccess: () => void;
}
