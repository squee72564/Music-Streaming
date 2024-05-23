import { createBrowserRouter } from 'react-router-dom';
import MusicCollection from './pages/MusicCollection';
import AlbumPage from './pages/AlbumPage';
import ErrorPage from './pages/ErrorPage';

export const router = createBrowserRouter([
    {
      path: "/music/collection/",
      element: <MusicCollection />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/music/collection/:albumId/',
      element: <AlbumPage />,
      errorElement: <ErrorPage />,    
    },
  ]);
