import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DirectoryView from './DirectoryView';
import UserRegistration from './UserRegistration';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DirectoryView />,
  },
  {
    path: '/directory/:dirId',
    element: <DirectoryView />,
  },
  {
    path: '/registration',
    element: <UserRegistration />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
