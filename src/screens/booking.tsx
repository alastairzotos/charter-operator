import { type RouteProp, useRoute } from "@react-navigation/native";
import React from "react";

import { DataView } from "components/data-view";
import { useNavigate } from "utils/nav";
import { Wrapper } from "components/wrapper";

export const BookingScreen: React.FC = () => {
  const route =
    useRoute<RouteProp<{ detail: { bookingId: string } }, "detail">>();
  const navigation = useNavigate();

  const bookingId = route.params.bookingId;

  const handleReset = () => {
    navigation.push("home");
  };

  return (
    <Wrapper>
      <DataView bookingId={bookingId} onReset={handleReset} />
    </Wrapper>
  );
};
