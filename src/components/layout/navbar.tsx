'use client';

import { BookOpen, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from '../theme-toggle';
import { NavLink } from 'react-router';

const navItems = [
  { name: 'All Books', href: '/books'},
  { name: 'Add Book', href: '/create-book' },
  { name: 'Borrow Summary', href: '/borrow-summary' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className='relative bg-background z-50 shadow-sm'>
      <div className='container'>
        <div className='relative flex h-20 items-center justify-between'>
          <div className='absolute inset-y-0 left-0 flex items-center justify-between w-full md:hidden'>
            <button
              type='button'
              className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-controls='mobile-menu'
              aria-expanded={mobileOpen}
            >
              <span className='sr-only'>Toggle main menu</span>
              {mobileOpen ? <X /> : <Menu />}
            </button>
            <ThemeToggle />
          </div>

          {/* Logo */}
          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-between'>
            <div className='flex shrink-0 items-center'>
              <BookOpen className='h-8 w-8 text-primary' />
            </div>

            {/* Desktop nav */}
            <div className='hidden md:ml-6 md:block'>
              <div className='flex space-x-4'>
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `block rounded-md px-3 py-2 text-base ${
                        isActive
                          ? 'text-primary'
                          : 'text-light-80 hover:text-primary/80'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu - floating and animated */}
      <div
        className={`absolute top-16 left-0 w-full bg-background md:hidden shadow-md transition-all duration-300 ease-in-out transform ${
          mobileOpen
            ? 'opacity-100 translate-y-0 visible'
            : 'opacity-0 -translate-y-2 invisible'
        }`}
        id='mobile-menu'
      >
        <div className='space-y-1 container pt-2 pb-3'>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-base ${
                  isActive
                    ? 'text-primary'
                    : 'text-light-80 hover:text-primary/80'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
