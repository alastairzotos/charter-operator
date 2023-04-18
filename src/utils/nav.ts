import { CommonActions, useNavigation } from "@react-navigation/native"
import { ScreenKey } from "../screens/screens";

export const useNavigate = () => {
  const navigation = useNavigation();

  return {
    get: () => navigation,
    push: (screen: ScreenKey, params?: object) => navigation.dispatch(CommonActions.navigate(screen, params)),
    goBack: () => navigation.dispatch(CommonActions.goBack()),
  }
}
