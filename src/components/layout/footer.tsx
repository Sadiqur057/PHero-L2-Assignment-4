import { BookOpen, Github, Mail, Heart } from 'lucide-react';
import { NavLink } from 'react-router';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'All Books', href: '/books' },
    { name: 'Add Book', href: '/create-book' },
    { name: 'Borrow Summary', href: '/borrow-summary' },
  ];

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/Sadiqur057', icon: Github },
    { name: 'Email', href: 'mailto:sadiqur057@gmail.com', icon: Mail },
  ];

  return (
    <footer className='bg-background border-t border-gray-200 dark:border-gray-800 mt-auto'>
      <div className='container py-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Brand Section */}
          <div className='space-y-4'>
            <div className='flex items-center space-x-2'>
              <BookOpen className='h-8 w-8 text-primary' />
              <span className='text-xl font-bold text-gray-900 dark:text-slate-200'>
                Library System
              </span>
            </div>
            <p className='text-gray-600 dark:text-slate-400 text-sm leading-relaxed'>
              A simple and intuitive library management system designed to make
              borrowing and managing books a breeze for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-slate-200'>
              Quick Links
            </h3>
            <ul className='space-y-2'>
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      `text-sm transition-colors ${
                        isActive
                          ? 'text-primary'
                          : 'text-gray-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-slate-200'>
              Connect With Us
            </h3>
            <div className='flex space-x-4'>
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target='_blank'
                    className='text-gray-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors'
                    aria-label={social.name}
                  >
                    <Icon className='h-5 w-5' />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='mt-8 pt-6 border-t border-gray-200 dark:border-gray-800'>
          <div className='flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0'>
            <p className='text-sm text-gray-600 dark:text-slate-400 text-center sm:text-left'>
              © {currentYear} Library Management System. All rights reserved.
            </p>
            <div className='flex items-center space-x-1 text-sm text-gray-600 dark:text-slate-400'>
              <span>Made with</span>
              <Heart className='h-4 w-4 text-red-500 fill-red-500' />
              <span>for book lovers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
