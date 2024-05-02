import { createBrowserRouter } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import TestPage2 from './pages/TestPage2';
import TestPage3 from './pages/TestPage3';
import ErrorPage from './pages/ErrorPage';

export const router = createBrowserRouter([
    {
      path: "/music/test-react-page/1",
      element: <ProfilePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/music/test-react-page/2",
      element: <TestPage2 />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/music/test-react-page/3",
      element: <TestPage3 />,
      errorElement: <ErrorPage />,
    },
  ]);
