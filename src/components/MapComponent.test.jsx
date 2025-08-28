import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("react-leaflet", () => ({
  MapContainer: ({ children }) => <div>{children}</div>,
  TileLayer: () => <div />,
  Marker: ({ children }) => <div>{children}</div>,
  Popup: ({ children }) => <div>{children}</div>,
}));

jest.mock("../hooks/useGeolocation", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const useGeolocation = require("../hooks/useGeolocation").default;

afterEach(() => {
  jest.clearAllMocks();
});

test("buttons trigger shareLocation and stopSharing", () => {
  const shareLocation = jest.fn();
  const stopSharing = jest.fn();
  useGeolocation.mockReturnValue({
    position: null,
    markers: [],
    shareLocation,
    stopSharing,
  });
  const MapComponent = require("./MapComponent").default;
  render(<MapComponent currentUser={{ uid: "1" }} />);
  fireEvent.click(screen.getByText(/share location/i));
  fireEvent.click(screen.getByText(/stop sharing/i));
  expect(shareLocation).toHaveBeenCalled();
  expect(stopSharing).toHaveBeenCalled();
});

test("renders markers based on geolocation data", () => {
  useGeolocation.mockReturnValue({
    position: { lat: 1, lng: 2 },
    markers: [
      { uid: "1", lat: 1, lng: 2, email: "me@example.com" },
      { uid: "2", lat: 3, lng: 4, email: "friend@example.com" },
    ],
    shareLocation: jest.fn(),
    stopSharing: jest.fn(),
  });
  const MapComponent = require("./MapComponent").default;
  render(<MapComponent currentUser={{ uid: "1" }} />);
  expect(screen.getByText(/you are here/i)).toBeInTheDocument();
  expect(screen.getByText(/friend@example.com/i)).toBeInTheDocument();
  expect(screen.queryByText(/me@example.com/i)).toBeNull();
});

