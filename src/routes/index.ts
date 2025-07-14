import Layout from '@/components/layout/layout';
import Books from '@/pages/books/page';
import home from '@/pages/home/home';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: home,
      },
      {
        path: '/books',
        Component: Books
      }
    ],
  },
]);
