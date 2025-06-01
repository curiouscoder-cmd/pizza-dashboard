# Pizza Dashboard

A complete Next.js dashboard application with Google OAuth authentication and pizza order management.

## Features

### **Multi-Provider Authentication System**
- **Google OAuth Authentication**: Secure sign-in using Google accounts
- **Email/Password Authentication**: Traditional credentials-based authentication
- **Email Verification**: Secure email verification flow for new registrations
- **Password Reset**: Forgot password functionality with secure reset tokens
- **Rate Limiting**: Protection against brute force attacks
- **Password Strength Validation**: Real-time password strength checking

### **Dashboard & Order Management**
- **Dashboard Overview**: Welcome page with user profile and statistics
- **Pizza Orders Management**: Comprehensive data table with filtering and search
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean design using Tailwind CSS with pizza-themed branding

## Technology Stack

- **Framework**: Next.js 15+ (App Router)
- **Authentication**: NextAuth.js v4+ with Google OAuth + Credentials providers
- **Styling**: Tailwind CSS with custom components
- **TypeScript**: Full type safety throughout
- **Form Handling**: React Hook Form with Zod validation
- **Password Security**: bcrypt for password hashing
- **Icons**: Lucide React
- **User Storage**: In-memory storage (demo) - easily replaceable with database

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
cd pizza-dashboard
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-replace-with-random-string

# Google OAuth Configuration
# Get these from Google Cloud Console: https://console.cloud.google.com/
GOOGLE_CLIENT_ID=your-google-client-id-from-google-console
GOOGLE_CLIENT_SECRET=your-google-client-secret-from-google-console
```

### 3. Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (or Google Identity API)
4. Go to "Credentials" and create a new OAuth 2.0 Client ID
5. Set the authorized redirect URIs to:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://your-domain.vercel.app/api/auth/callback/google` (for production)
6. Copy the Client ID and Client Secret to your `.env.local` file

### 4. Generate NextAuth Secret

Generate a secure secret for NextAuth:

```bash
openssl rand -base64 32
```

Add this to your `.env.local` file as `NEXTAUTH_SECRET`.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser (or the port shown in your terminal).

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
