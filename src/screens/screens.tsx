import { BookingScreen } from "./booking";
import { HomeScreen } from "./home";

export interface Screen {
  component: React.FC;
  title: string;
}

export const screens = {
  home: {
    component: HomeScreen,
    title: "Home",
  },
  booking: {
    component: BookingScreen,
    title: "Booking",
  }
} satisfies Record<string, Screen>;

export type ScreenKey = keyof typeof screens;
