import { createBrowserRouter } from 'react-router-dom';
import MusicCollection from './pages/MusicCollection';
import AlbumPage from './pages/AlbumPage';
import ErrorPage from './pages/ErrorPage';
import AlbumCreationPage from './pages/AlbumCreationPage';

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
    {
      path: '/music/create/',
      element: <AlbumCreationPage />,
      errorElement: <ErrorPage />,    
    },
  ]);
