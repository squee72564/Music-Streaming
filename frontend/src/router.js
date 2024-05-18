import { createBrowserRouter } from 'react-router-dom';
import MusicCollection from './pages/MusicCollection';
import ErrorPage from './pages/ErrorPage';

export const router = createBrowserRouter([
    {
      path: "/music/collection/",
      element: <MusicCollection />,
      errorElement: <ErrorPage />,
    },
  ]);
