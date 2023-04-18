import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { BookingScreen } from "./booking";
import { HomeScreen } from "./home";
import { SetupScreen } from "./setup";

export interface Screen {
  component: React.FC;
  title: string;
  options?: NativeStackNavigationOptions | ((props: { route: RouteProp<ParamListBase, string>; navigation: any; }) => NativeStackNavigationOptions);
}

export const screens = {
  home: {
    component: HomeScreen,
    title: "Charter",
  },
  booking: {
    component: BookingScreen,
    title: "Booking",
  },
  setup: {
    component: SetupScreen,
    title: "Setup",
  },
} satisfies Record<string, Screen>;

export type ScreenKey = keyof typeof screens;
