# 🍕 Pizza Dashboard - Customer & Delivery Management System

> A comprehensive, modern pizza delivery management dashboard built with Next.js, featuring customer management, order tracking, and delivery scheduling capabilities.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-4.0-purple?style=flat-square&logo=next.js)](https://next-auth.js.org/)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7.0-EC5990?style=flat-square&logo=reacthookform)](https://react-hook-form.com/)

---

## 👨‍💻 Developer Information

**Developer:** Nitya Jain
**GitHub:** [@nityajain](https://github.com/nityajain)
**Contact:** [nityajain@example.com](mailto:nityajain@example.com)

---

## 📋 Project Overview

The **Pizza Dashboard** is a full-featured management system designed specifically for pizza restaurants and delivery services. This application streamlines operations by providing an intuitive interface for managing customers, tracking orders, and scheduling deliveries.

### 🎯 Purpose
Empower pizza restaurant owners and staff with a centralized platform to efficiently manage their daily operations, from customer relationships to delivery logistics.

### 👥 Target Users
- Pizza restaurant owners
- Restaurant managers
- Delivery coordinators
- Customer service representatives

### 🛠️ Technology Stack Overview
Built with modern web technologies including Next.js 14, TypeScript, and Tailwind CSS, this application leverages the latest React features and provides a responsive, accessible user experience across all devices.

---

## ✨ Features

### 🔐 **Authentication & Security**
- Multi-provider authentication (Google OAuth + Email/Password)
- Secure session management with NextAuth.js
- Password strength validation and complexity requirements
- Email verification workflow
- Rate limiting for login attempts

### 👥 **Customer Management**
- Add new customers with comprehensive form validation
- View detailed customer profiles and order history
- Search and filter customers by name, email, phone, or status
- Customer status management (Active, Inactive, VIP)
- Real-time customer data updates

### 📦 **Order Management**
- Order tracking with real-time status updates
- Order history and analytics
- Customer order preferences tracking
- Order value and frequency analytics

### 🚚 **Delivery Scheduling**
- Schedule deliveries with date and time selection
- Driver assignment and management
- Priority-based delivery scheduling
- Estimated delivery duration tracking
- Delivery route optimization

### 🎨 **Modern UI/UX**
- Responsive design for desktop, tablet, and mobile
- Clean, intuitive interface with consistent design system
- Loading states and error handling
- Smooth animations and transitions
- Accessibility-compliant components

### 📊 **Data Management**
- Form validation with Zod schemas
- Real-time data synchronization
- Error handling and user feedback
- Data persistence with in-memory storage

---

## 🛠️ Technology Stack

### **Frontend**
- **Next.js 14** - React framework with App Router
- **React 18** - UI library with latest features
- **TypeScript** - Type-safe development

### **Styling & UI**
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **Custom Components** - Reusable UI component library

### **Authentication**
- **NextAuth.js** - Complete authentication solution
- **Google OAuth** - Social authentication provider
- **bcrypt** - Password hashing and security

### **Form Management**
- **React Hook Form** - Performant form library
- **Zod** - TypeScript-first schema validation
- **@hookform/resolvers** - Validation resolvers

### **Development Tools**
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** or **yarn** package manager
- **Google Cloud Console** account (for OAuth setup)
- **Git** for version control

---

## 🚀 Installation & Setup

### 1. **Clone the Repository**
```bash
git clone https://github.com/nityajain/pizza-dashboard.git
cd pizza-dashboard
```

### 2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

### 3. **Environment Configuration**
Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```

### 4. **Configure Environment Variables**
Edit `.env.local` with your configuration (see Environment Variables section below)

### 5. **Run Development Server**
```bash
npm run dev
# or
yarn dev
```

### 6. **Access the Application**
Open [http://localhost:3000](http://localhost:3000) in your browser

### 7. **Build for Production**
```bash
npm run build
npm start
# or
yarn build
yarn start
```

---

## 🔧 Environment Variables

### **Required Variables**

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXTAUTH_URL` | Application URL | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | NextAuth.js secret key | `your-secret-key-here` |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | `your-google-client-id` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | `your-google-client-secret` |

### **Example .env.local Structure**
```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Optional: Database URL (for future implementation)
# DATABASE_URL=your-database-connection-string
```

### **Security Best Practices**
- Never commit actual secrets to version control
- Use strong, unique secrets for production
- Rotate secrets regularly
- Use environment-specific configurations

---

## 🔑 Google OAuth Setup

### **Step 1: Create Google Cloud Project**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "New Project" and provide a project name
3. Select the newly created project

### **Step 2: Enable Google+ API**
1. Navigate to "APIs & Services" > "Library"
2. Search for "Google+ API"
3. Click "Enable"

### **Step 3: Create OAuth 2.0 Credentials**
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Configure the consent screen if prompted
4. Select "Web application" as application type

### **Step 4: Configure Authorized URIs**
Add the following URIs:
- **Authorized JavaScript origins:** `http://localhost:3000`
- **Authorized redirect URIs:** `http://localhost:3000/api/auth/callback/google`

### **Step 5: Obtain Credentials**
1. Copy the **Client ID** and **Client Secret**
2. Add them to your `.env.local` file
3. Restart your development server

## Project Structure

```
src/
├── app/
│   ├── api/auth/[...nextauth]/     # NextAuth API routes
│   ├── auth/signin/                # Sign-in page
│   ├── dashboard/                  # Dashboard pages
│   │   ├── orders/                 # Pizza orders page
│   │   └── page.tsx               # Main dashboard
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Home page (redirects to sign-in)
├── components/
│   ├── layout/                    # Layout components
│   └── providers/                 # Context providers
├── data/
│   └── mockOrders.ts             # Mock pizza order data
├── lib/
│   ├── auth.ts                   # NextAuth configuration
│   └── utils.ts                  # Utility functions
└── types/
    └── index.ts                  # TypeScript interfaces
```

## Features Overview

### **Enhanced Authentication System**

#### **Multiple Sign-In Options**
- **Google OAuth**: One-click sign-in with Google accounts
- **Email/Password**: Traditional credentials with secure password requirements

#### **Security Features**
- **Password Strength Validation**: Real-time feedback on password complexity
- **Rate Limiting**: Protection against brute force attacks (5 attempts, 15-minute lockout)
- **Email Verification**: Required for new account activation
- **Secure Password Reset**: Token-based password reset with expiration
- **Session Management**: JWT-based sessions with NextAuth.js

#### **User Experience**
- **Tabbed Interface**: Easy switching between Google and email authentication
- **Form Validation**: Real-time validation with helpful error messages
- **Loading States**: Visual feedback during authentication processes
- **Responsive Design**: Works perfectly on all device sizes

#### **Demo Credentials**
For testing the email/password authentication:
- **Email**: `demo@example.com`
- **Password**: `Demo123!`
- **Status**: Pre-verified for immediate access

### Dashboard
- User profile display
- Order statistics
- Quick action buttons
- Recent activity feed

### Pizza Orders
- Comprehensive data table with 20 mock orders
- Search functionality (by customer name, order ID, pizza type)
- Status filtering (Pending, Preparing, Out for Delivery, Delivered, Cancelled)
- Color-coded status badges
- Responsive table design

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Update `NEXTAUTH_URL` to your production URL
5. Update Google OAuth redirect URI to include your production domain

### Environment Variables for Production

```env
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-production-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Mock Data

The application includes 20 mock pizza orders with:
- Order IDs: PZA001 - PZA020
- Various pizza types: Margherita, Pepperoni, Veggie Supreme, Hawaiian, BBQ Chicken
- Different quantities (1-4 pizzas)
- Recent order dates
- All status types represented

## Screenshots

### Login Page
- Clean Google OAuth sign-in interface
- Pizza-themed branding
- Loading states and error handling

### Dashboard Welcome Page
- Personalized greeting with user's Google profile
- Order statistics cards
- Quick action buttons
- Recent activity feed

### Pizza Orders Page
- Comprehensive data table with all order information
- Search functionality across customer names, order IDs, and pizza types
- Status filtering with dropdown
- Color-coded status badges
- Responsive design that works on mobile devices

## Testing

### **Authentication Testing**

#### **Google OAuth Flow**
1. Visit the application URL
2. Click "Google" tab on sign-in page
3. Click "Sign in with Google"
4. Complete Google OAuth flow
5. Verify redirect to dashboard

#### **Email/Password Authentication**
1. **Test with Demo Account**:
   - Click "Email" tab on sign-in page
   - Email: `demo@example.com`
   - Password: `Demo123!`
   - Click "Sign in"

2. **Create New Account**:
   - Click "Sign up" link
   - Fill out registration form
   - Check password strength indicator
   - Submit form
   - Check console for verification email simulation

3. **Password Reset Flow**:
   - Click "Forgot your password?" on sign-in page
   - Enter email address
   - Check console for reset email simulation
   - Use reset link to set new password

#### **Security Testing**
- **Rate Limiting**: Try 6+ failed login attempts to trigger lockout
- **Password Validation**: Test weak passwords to see strength indicator
- **Email Verification**: Try signing in with unverified account

### **Dashboard Features**
- Check user profile display (works with both auth methods)
- Verify statistics are shown
- Test navigation to orders page

### **Orders Management**
- Test search functionality
- Try different status filters
- Verify responsive design on mobile
- Check status badge colors

## Troubleshooting

### Common Issues

1. **Google OAuth Error**:
   - Verify your Google Client ID and Secret are correct
   - Check that redirect URIs match in Google Console
   - Ensure Google+ API is enabled

2. **Port Issues**:
   - If port 3000 is in use, Next.js will automatically use another port
   - Update NEXTAUTH_URL in .env.local to match the actual port shown in terminal

3. **Environment Variables**:
   - Ensure .env.local file is in the root directory
   - Restart the development server after changing environment variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes and demonstration of Next.js, NextAuth.js, and modern web development practices.
