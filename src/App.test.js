jest.mock('react-router-dom', () => {
  const React = require('react');
  let currentPath = '/';
  const RouterContext = React.createContext();

  const MemoryRouter = ({ initialEntries = ['/'], children }) => {
    const [path, setPath] = React.useState(initialEntries[0]);
    currentPath = path;
    return (
      <RouterContext.Provider value={{ path, setPath }}>
        {children}
      </RouterContext.Provider>
    );
  };

  const Routes = ({ children }) => {
    const { path } = React.useContext(RouterContext);
    const match = React.Children.toArray(children).find(
      (child) => child.props.path === path
    );
    return match ? match.props.element : null;
  };

  const Route = () => null;

  const useNavigate = () => {
    const { setPath } = React.useContext(RouterContext);
    return (to) => {
      currentPath = to;
      setPath(to);
    };
  };

  const Navigate = ({ to }) => {
    const navigate = useNavigate();
    React.useEffect(() => navigate(to), [to]);
    return null;
  };

  const useLocation = () => ({ pathname: currentPath });

  return {
    MemoryRouter,
    Routes,
    Route,
    Navigate,
    useNavigate,
    useLocation,
    BrowserRouter: MemoryRouter,
    __getPath: () => currentPath,
  };
}, { virtual: true });

jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn((auth, cb) => {
    cb(null);
    return jest.fn();
  }),
  signOut: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}), { virtual: true });

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  getDoc: jest.fn(),
  onSnapshot: jest.fn(() => jest.fn()),
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  serverTimestamp: jest.fn(),
}), { virtual: true });

jest.mock('./firebase', () => ({ auth: {}, db: {} }));

jest.mock('react-leaflet', () => {
  const React = require('react');
  return {
    MapContainer: ({ children }) => React.createElement('div', null, children),
    TileLayer: () => null,
    Marker: () => null,
    Popup: () => null,
  };
});

import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, __getPath } from 'react-router-dom';
import App from './App';

test('redirects unauthenticated users to /login', async () => {
  render(
    <MemoryRouter initialEntries={['/map']}>
      <App />
    </MemoryRouter>
  );
  await waitFor(() => {
    expect(__getPath()).toBe('/login');
  });
  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
});
