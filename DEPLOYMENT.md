# Deployment Guide

## Vercel Deployment (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Google Cloud Console project with OAuth credentials

### Step 1: Prepare Your Repository
1. Push your code to GitHub
2. Ensure `.env.local` is in `.gitignore` (it should be by default)
3. Make sure `.env.example` is committed to the repository

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your pizza-dashboard repository
4. Vercel will automatically detect it's a Next.js project

### Step 3: Configure Environment Variables
In the Vercel dashboard, add these environment variables:

```
NEXTAUTH_URL=https://your-project-name.vercel.app
NEXTAUTH_SECRET=your-production-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**Important**: Generate a new `NEXTAUTH_SECRET` for production:
```bash
openssl rand -base64 32
```

### Step 4: Update Google OAuth Settings
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to your project > Credentials
3. Edit your OAuth 2.0 Client ID
4. Add your Vercel domain to authorized redirect URIs:
   ```
   http://localhost:3000/api/auth/callback/google (for development)
   https://your-project-name.vercel.app/api/auth/callback/google (for production)
   ```

### Step 5: Deploy
1. Click "Deploy" in Vercel
2. Wait for the build to complete
3. Test your deployed application

## Railway Deployment (Alternative)

### Step 1: Prepare Railway
1. Go to [railway.app](https://railway.app) and sign up
2. Connect your GitHub account
3. Create a new project from your repository

### Step 2: Configure Environment Variables
Add the same environment variables as above, but with your Railway domain:
```
NEXTAUTH_URL=https://your-app.railway.app
```

### Step 3: Update Google OAuth
Add your Railway domain to Google OAuth redirect URIs:
```
https://your-app.railway.app/api/auth/callback/google
```

## Testing Your Deployment

### Checklist
- [ ] Application loads without errors
- [ ] Google OAuth sign-in works
- [ ] User is redirected to dashboard after login
- [ ] Dashboard displays user information correctly
- [ ] Pizza orders page loads and displays data
- [ ] Search and filter functionality works
- [ ] Responsive design works on mobile
- [ ] Logout functionality works

### Common Issues

1. **OAuth Error**: Check redirect URIs match exactly
2. **Environment Variables**: Ensure all variables are set correctly
3. **Build Errors**: Check the build logs in Vercel/Railway dashboard
4. **CORS Issues**: Usually resolved by correct NEXTAUTH_URL setting

## Domain Configuration (Optional)

### Custom Domain on Vercel
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update `NEXTAUTH_URL` to use your custom domain
5. Update Google OAuth redirect URIs

## Security Considerations

1. **Environment Variables**: Never commit real credentials to Git
2. **NEXTAUTH_SECRET**: Use a strong, unique secret for production
3. **Google OAuth**: Restrict your OAuth client to specific domains
4. **HTTPS**: Always use HTTPS in production (automatic with Vercel/Railway)

## Monitoring

### Vercel Analytics
- Enable Vercel Analytics for usage insights
- Monitor function execution times
- Track Core Web Vitals

### Error Tracking
Consider adding error tracking services like:
- Sentry
- LogRocket
- Bugsnag

## Backup and Recovery

1. **Code**: Always keep your code in version control
2. **Environment Variables**: Keep a secure backup of your production environment variables
3. **Database**: If you add a database later, ensure regular backups

## Performance Optimization

1. **Images**: Next.js Image component is already optimized
2. **Fonts**: Google Fonts are preloaded
3. **Bundle Size**: Monitor with `npm run build`
4. **Caching**: Vercel provides automatic edge caching
