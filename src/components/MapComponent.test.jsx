import { render, screen } from "@testing-library/react";
import MapComponent from "./MapComponent";

jest.mock("react-leaflet", () => ({
  MapContainer: ({ children }) => <div>{children}</div>,
  TileLayer: () => <div />,
  Marker: ({ children }) => <div>{children}</div>,
  Popup: ({ children }) => <div>{children}</div>,
}));

describe("MapComponent", () => {
  test("renders markers for shared users", () => {
    const userLocation = {
      uid: "1",
      email: "me@example.com",
      lat: 0,
      lng: 0,
      sharing: true,
    };

    const markers = [
      {
        uid: "2",
        email: "friend@example.com",
        lat: 10,
        lng: 20,
        sharing: true,
      },
      {
        uid: "3",
        email: "hidden@example.com",
        lat: 30,
        lng: 40,
        sharing: false,
      },
    ];

    render(<MapComponent userLocation={userLocation} markers={markers} />);

    // Current user marker
    expect(screen.getByText(/You are here/i)).toBeInTheDocument();

    // Shared user marker
    expect(screen.getByText("friend@example.com")).toBeInTheDocument();

    // Non-shared user should not render
    expect(screen.queryByText("hidden@example.com")).toBeNull();
  });
});

