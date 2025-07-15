import { Outlet } from 'react-router';
import Navbar from './navbar';
import Footer from './footer';

const Layout = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <main className='container py-6 flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
