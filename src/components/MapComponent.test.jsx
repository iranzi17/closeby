import React from "react";
import { render } from "@testing-library/react";

jest.mock("react-leaflet", () => ({
  MapContainer: ({ children }) => <div>{children}</div>,
  TileLayer: () => <div />,
  Marker: ({ children }) => <div>{children}</div>,
  Popup: ({ children }) => <div>{children}</div>,
}));

jest.mock("../hooks/useGeolocation", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    position: null,
    markers: [],
    shareLocation: jest.fn(),
    stopSharing: jest.fn(),
  })),
}));

test("renders map component", () => {
  const MapComponent = require("./MapComponent").default;
  render(<MapComponent currentUser={{ uid: "1" }} />);
});

