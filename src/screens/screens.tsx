import { type ParamListBase, type RouteProp } from "@react-navigation/native";
import { type NativeStackNavigationOptions } from "@react-navigation/native-stack";

import { HomeMenu } from "components/home-menu";
import { BookingScreen } from "screens/booking";
import { BookingsScreen } from "screens/bookings";
import { HomeScreen } from "screens/home";
import { LoginScreen } from "screens/login";
import { NewBookingScreen } from "screens/new-booking";
import { SetupScreen } from "screens/setup";

export interface Screen {
  component: React.FC;
  title: string;
  options?:
    | NativeStackNavigationOptions
    | ((props: {
        route: RouteProp<ParamListBase, string>;
        navigation: any;
      }) => NativeStackNavigationOptions);
}

export const screens = {
  home: {
    component: HomeScreen,
    title: "Charter",
    options: {
      headerRight: HomeMenu,
    },
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
  newBooking: {
    component: NewBookingScreen,
    title: "New booking",
  },
  bookings: {
    component: BookingsScreen,
    title: "Bookings",
  },
} satisfies Record<string, Screen>;

export type ScreenKey = keyof typeof screens;
