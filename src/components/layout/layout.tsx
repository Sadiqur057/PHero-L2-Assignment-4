import { Outlet } from 'react-router';
import Navbar from './navbar';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className='container py-6'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
