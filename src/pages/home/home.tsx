import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

const home = () => {
  return (
    <div className='flex h-[calc(100vh-80px)] min-h-[600px] justify-center items-center'>
      <div className='mx-auto flex justify-center px-4 sm:px-6 lg:px-8'>
        <div className='text-center '>
          <h1 className='text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-slate-200 sm:text-5xl md:text-6xl'>
            <span className='block xl:inline'>
              <span className='mb-1 block'>Minimal Library </span>
              <span className='bg-gradient-to-r from-indigo-400 to-pink-600 bg-clip-text text-transparent'>
                Management System
              </span>
            </span>
          </h1>
          <p className='mx-auto mt-3 max-w-xl lg:text-lg text-gray-500 dark:text-slate-400 sm:mt-5 md:mt-5'>
            A simple and intuitive library management system designed to make
            borrowing and managing books a breeze for everyone.
          </p>
          <div className='mt-5 sm:mt-8 sm:flex sm:justify-center'>
            <Button>
              <Link to='/books'>View All Books</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default home;
