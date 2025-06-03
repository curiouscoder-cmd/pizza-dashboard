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

---

## 📁 Project Structure

```
pizza-dashboard/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # Dashboard pages
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Base UI components
│   │   ├── layout/           # Layout components
│   │   └── forms/            # Form components
│   ├── lib/                   # Utility functions and configurations
│   │   ├── auth.ts           # NextAuth configuration
│   │   ├── validations.ts    # Zod schemas
│   │   └── utils.ts          # Helper functions
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
├── .env.example              # Environment variables template
└── README.md                 # Project documentation
```

---

## 📖 Usage Instructions

### **Accessing the Application**
1. Navigate to `http://localhost:3000`
2. Sign in using Google OAuth or create an account
3. Access the dashboard after successful authentication

### **Default Demo Credentials**
For testing purposes, use:
- **Email:** `demo@example.com`
- **Password:** `Demo123!`

### **Navigation Guide**
- **Dashboard:** Overview of key metrics and recent activity
- **Customers:** Manage customer information and relationships
- **Orders:** Track and manage pizza orders
- **Schedule:** Plan and manage delivery schedules
- **Activity:** View system activity and logs

---

## 🤔 Assumptions & Design Decisions

### **In-Memory Storage**
- **Assumption:** This is a demonstration/prototype application
- **Rationale:** Simplifies setup and deployment without database dependencies
- **Trade-off:** Data doesn't persist between server restarts
- **Future:** Will be replaced with proper database integration

### **Mock Data Usage**
- **Purpose:** Provides realistic data for testing and demonstration
- **Benefit:** Allows immediate exploration of features without setup complexity
- **Limitation:** Not suitable for production use

### **UI/UX Design Choices**
- **Color Scheme:** Warm, pizza-themed colors (creamy, red, green)
- **Typography:** Clean, readable fonts with proper hierarchy
- **Layout:** Card-based design for easy scanning and interaction
- **Responsiveness:** Mobile-first approach with progressive enhancement

### **Authentication Flow**
- **Multi-provider:** Supports both social and credential-based authentication
- **Security:** Implements industry-standard security practices
- **User Experience:** Streamlined onboarding with email verification

---

## 🚧 Challenges Faced

### **Technical Challenges**
1. **Form State Management**
   - **Challenge:** Complex forms with nested validation
   - **Solution:** Implemented React Hook Form with Zod schemas
   - **Outcome:** Type-safe, performant form handling

2. **Authentication Integration**
   - **Challenge:** Seamless multi-provider authentication
   - **Solution:** NextAuth.js with custom providers and callbacks
   - **Outcome:** Secure, scalable authentication system

3. **Responsive Design**
   - **Challenge:** Consistent experience across all devices
   - **Solution:** Tailwind CSS with mobile-first approach
   - **Outcome:** Fully responsive, accessible interface

### **Trade-offs Made**
- **In-memory storage** vs. database complexity
- **Mock data** vs. real API integration
- **Feature completeness** vs. development timeline

---

## 📚 Third-Party Libraries

### **Core Dependencies**
```json
{
  "react-hook-form": "^7.45.0",
  "@hookform/resolvers": "^3.1.0",
  "zod": "^3.21.0",
  "lucide-react": "^0.263.0",
  "bcrypt": "^5.1.0",
  "next-auth": "^4.22.0"
}
```

### **Library Purposes**
- **`react-hook-form`** - Efficient form state management with minimal re-renders
- **`@hookform/resolvers`** - Integration between React Hook Form and validation libraries
- **`zod`** - TypeScript-first schema validation for forms and API data
- **`lucide-react`** - Beautiful, consistent icon library with React components
- **`bcrypt`** - Secure password hashing for credential-based authentication
- **`next-auth`** - Complete authentication solution for Next.js applications

---

## 🚀 Future Enhancements

### **Phase 1: Database Integration**
- [ ] PostgreSQL/MongoDB integration
- [ ] Data persistence and migrations
- [ ] Advanced querying capabilities

### **Phase 2: Real-time Features**
- [ ] WebSocket integration for live updates
- [ ] Real-time order tracking
- [ ] Push notifications

### **Phase 3: Advanced Analytics**
- [ ] Sales reporting and analytics
- [ ] Customer behavior insights
- [ ] Performance metrics dashboard

### **Phase 4: Mobile Development**
- [ ] React Native mobile app
- [ ] Offline capability
- [ ] GPS tracking for deliveries

### **Phase 5: Business Features**
- [ ] Payment processing integration
- [ ] Inventory management
- [ ] Multi-location support
- [ ] Advanced reporting tools

---

## 🤝 Contributing

We welcome contributions to improve the Pizza Dashboard! Here's how you can help:

### **Getting Started**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### **Code Style Guidelines**
- Follow TypeScript best practices
- Use meaningful variable and function names
- Write comprehensive comments for complex logic
- Ensure all components are properly typed
- Follow the existing code formatting (Prettier configuration)

### **Pull Request Process**
1. Ensure your code passes all linting checks
2. Update documentation if necessary
3. Add tests for new features
4. Ensure the build passes
5. Request review from maintainers

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Nitya Jain

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🔧 Troubleshooting

### **Common Issues & Solutions**

#### **Port Conflicts**
```bash
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution:** Use a different port
```bash
npm run dev -- -p 3001
```

#### **Environment Variable Issues**
```bash
Error: NEXTAUTH_SECRET is not defined
```
**Solution:** Ensure all required environment variables are set in `.env.local`

#### **OAuth Configuration Problems**
```bash
Error: redirect_uri_mismatch
```
**Solution:** Verify redirect URIs in Google Cloud Console match your application URL

#### **Build Errors**
```bash
Type error: Cannot find module
```
**Solution:** Clear cache and reinstall dependencies
```bash
rm -rf .next node_modules
npm install
npm run build
```

#### **Authentication Issues**
- Verify Google OAuth credentials are correct
- Check that the Google+ API is enabled
- Ensure NEXTAUTH_URL matches your domain
- Verify NEXTAUTH_SECRET is set and secure

---

## 📸 Screenshots & Demo

### **Dashboard Overview**
![Dashboard Screenshot](./docs/screenshots/dashboard.png)

### **Customer Management**
![Customer Management Screenshot](./docs/screenshots/customers.png)

### **Live Demo**
🔗 **[View Live Demo](https://pizza-dashboard-demo.vercel.app)** *(Coming Soon)*

> **Note:** Screenshots and demo links will be updated as the project evolves.

---

## 📞 Contact & Support

### **Getting Help**
- 📧 **Email:** [nityajain@example.com](mailto:nityajain@example.com)
- 🐛 **Issues:** [GitHub Issues](https://github.com/nityajain/pizza-dashboard/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/nityajain/pizza-dashboard/discussions)

### **Reporting Issues**
When reporting issues, please include:
1. **Environment details** (OS, Node.js version, browser)
2. **Steps to reproduce** the issue
3. **Expected vs actual behavior**
4. **Error messages** or screenshots
5. **Relevant code snippets**

### **Feature Requests**
We love hearing about new ideas! Please use GitHub Issues with the "enhancement" label to suggest new features.

---

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for hosting and deployment platform
- **Tailwind CSS** for the utility-first CSS framework
- **NextAuth.js** for authentication solutions
- **React Hook Form** for form management
- **Lucide** for beautiful icons

---

<div align="center">

**Made with ❤️ by [Nitya Jain](https://github.com/nityajain)**

⭐ **Star this repository if you found it helpful!**

</div>
