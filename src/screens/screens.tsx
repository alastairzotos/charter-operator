import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { HomeMenu } from "../components/home-menu";
import { BookingScreen } from "./booking";
import { BookingsScreen } from "./bookings";
import { HomeScreen } from "./home";
import { LoginScreen } from "./login";
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
    options: {
      headerRight: HomeMenu,
    }
  },
  setup: {
    component: SetupScreen,
    title: "Setup",
  },
  login: {
    component: LoginScreen,
    title: "Login",
  },
  booking: {
    component: BookingScreen,
    title: "Booking",
  },
  bookings: {
    component: BookingsScreen,
    title: "Bookings",
  }
} satisfies Record<string, Screen>;

export type ScreenKey = keyof typeof screens;
