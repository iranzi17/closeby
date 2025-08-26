import { render, screen } from '@testing-library/react';

jest.mock('../firebase', () => ({ db: {} }));

jest.mock('leaflet', () => ({
  Icon: function() {
    return null;
  }
}));

jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }) => <div>{children}</div>,
  TileLayer: () => <div />,
  Marker: ({ children }) => <div data-testid="marker">{children}</div>,
  Popup: ({ children }) => <div>{children}</div>,
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
  onSnapshot: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  serverTimestamp: jest.fn(),
}));

import MapComponent from './MapComponent';

test('displays current and other user markers', () => {
  const mockUsers = [
    { id: 'user2', uid: 'user2', lat: 10, lng: 20, email: 'user2@example.com' }
  ];
  render(
    <MapComponent
      currentUser={{ uid: 'user1' }}
      shareLocation={false}
      mockPosition={[40, -74]}
      mockUsers={mockUsers}
    />
  );

  expect(screen.getAllByTestId('marker')).toHaveLength(2);
  expect(screen.getByText('You are here')).toBeInTheDocument();
  expect(screen.getByText('user2@example.com')).toBeInTheDocument();
});
