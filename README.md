# 📚 Library Management System

A modern, intuitive library management system built with React, TypeScript, and Vite. This application provides a seamless experience for managing books, borrowing records, and library operations with a beautiful responsive design that supports both light and dark themes.

## ✨ Features

### 📖 Book Management
- **View All Books**: Browse through the complete library collection with pagination
- **Add New Books**: Easy book creation with comprehensive form validation
- **Edit Books**: Update book information including title, author, genre, publication details

### 📋 Borrowing System
- **Borrow Books**: Simple borrowing process with date selection
- **Borrow Summary**: Comprehensive view of all borrowing records

### 🎨 User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Modern UI**: Clean, intuitive interface using Tailwind CSS and Radix UI
- **Loading States**: Smooth loading indicators for better UX
- **Error Handling**: Comprehensive error messaging and validation

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **React Router v7** - Client-side routing
- **Tailwind CSS v4** - Utility-first CSS framework

### State Management
- **Redux Toolkit** - Predictable state container
- **RTK Query** - Data fetching and caching

### UI Components
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful, customizable icons
- **React Hot Toast** - Elegant toast notifications
- **Date-fns** - Date utility library
- **React Day Picker** - Date picker component

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sadiqur057/PHero-L2-Assignment-4.git
   cd phero-assignment-4
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Navbar, Footer)
│   ├── ui/            # Base UI components (Button, Input, etc.)
│   └── ...            # Feature-specific components
├── pages/              # Page components
│   ├── home/          # Landing page
│   ├── books/         # Books listing and management
│   ├── create-book/   # Book creation
│   ├── edit-book/     # Book editing
│   ├── borrow-book/   # Book borrowing
│   └── borrow-summary/ # Borrowing records
├── redux/              # State management
│   ├── store.ts       # Redux store configuration
│   ├── api/           # API endpoints and queries
│   └── features/      # Feature-specific slices
├── routes/             # Application routing
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── constants/          # Application constants
└── providers/          # Context providers
```
