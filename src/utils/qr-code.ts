import parseUrl from "parse-url";
import { isHttpsUri } from "valid-url";

import { type HostParseResult, parseHost } from "utils/host";

export type QRParseError = "invalid-url" | "wrong-url" | "wrong-operator";

export interface QRCodeParseResult<T> {
  error?: QRParseError;
  result?: T;
}

export interface QRCodeBookingResult {
  hostData: HostParseResult;
  bookingId: string;
}

interface PathParseResult {
  error?: QRParseError;
  bookingId?: string;
}

const extractBookingIdFromPath = (path: string): PathParseResult => {
  const parts = path.split("/");

  if (parts.length !== 4) {
    return { error: "wrong-url" };
  }

  const [, b, c, bookingId] = parts;

  if (`${b}/${c}` !== "operator-admin/bookings") {
    return { error: "wrong-url" };
  }

  return { bookingId };
};

export const extractBookingFromQrCode = (
  data: string
): QRCodeParseResult<QRCodeBookingResult> => {
  if (!isHttpsUri(data)) {
    return { error: "invalid-url" };
  }

  const url = parseUrl(data);

  const hostData = parseHost(url.resource);

  const pathParseResult = extractBookingIdFromPath(url.pathname);

  if (pathParseResult.error) {
    return { error: pathParseResult.error };
  }

  return {
    result: {
      hostData,
      bookingId: pathParseResult.bookingId,
    },
  };
};
