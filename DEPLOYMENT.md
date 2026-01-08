# Deployment Guide

This guide covers deploying Schedlyx to Vercel and other platforms.

## Vercel Deployment

### Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **Supabase Project**: Set up your Supabase project
4. **Environment Variables**: Prepare your environment variables

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/schedlyx)

### Manual Deployment

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy
   vercel
   ```

2. **Configure Environment Variables**
   
   In your Vercel dashboard, add these environment variables:
   
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   VITE_GOOGLE_API_KEY=your_google_api_key
   VITE_APP_URL=https://your-app.vercel.app
   VITE_APP_NAME=Schedlyx
   ```

3. **Domain Configuration**
   - Add your custom domain in Vercel dashboard
   - Update `VITE_APP_URL` to match your domain

### Build Configuration

The project includes a `vercel.json` file with optimal settings:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Pre-deployment Testing

Run the build test script to ensure everything works:

```bash
npm run test:build
```

This script will:
- ✅ Validate all configuration files
- ✅ Install dependencies
- ✅ Run linting
- ✅ Execute tests
- ✅ Build the project
- ✅ Verify build output

## Supabase Setup

### Database Schema

1. **Create Tables**
   ```sql
   -- Users table (handled by Supabase Auth)
   
   -- Events table
   CREATE TABLE events (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     title TEXT NOT NULL,
     description TEXT,
     type TEXT NOT NULL,
     duration INTEGER NOT NULL,
     location TEXT,
     is_online BOOLEAN DEFAULT false,
     max_attendees INTEGER,
     requires_approval BOOLEAN DEFAULT false,
     allow_cancellation BOOLEAN DEFAULT true,
     cancellation_deadline INTEGER DEFAULT 24,
     buffer_time INTEGER DEFAULT 0,
     status TEXT DEFAULT 'draft',
     available_days TEXT[] DEFAULT '{}',
     time_slots JSONB DEFAULT '{}',
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   
   -- Bookings table
   CREATE TABLE bookings (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     event_id UUID REFERENCES events(id) ON DELETE CASCADE,
     user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
     first_name TEXT NOT NULL,
     last_name TEXT NOT NULL,
     email TEXT NOT NULL,
     phone TEXT,
     date DATE NOT NULL,
     time TIME NOT NULL,
     status TEXT DEFAULT 'pending',
     notes TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

2. **Row Level Security (RLS)**
   ```sql
   -- Enable RLS
   ALTER TABLE events ENABLE ROW LEVEL SECURITY;
   ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
   
   -- Events policies
   CREATE POLICY "Users can view their own events" ON events
     FOR SELECT USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can create events" ON events
     FOR INSERT WITH CHECK (auth.uid() = user_id);
   
   CREATE POLICY "Users can update their own events" ON events
     FOR UPDATE USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can delete their own events" ON events
     FOR DELETE USING (auth.uid() = user_id);
   
   -- Public events (for booking pages)
   CREATE POLICY "Anyone can view active events" ON events
     FOR SELECT USING (status = 'active');
   
   -- Bookings policies
   CREATE POLICY "Users can view their own bookings" ON bookings
     FOR SELECT USING (auth.uid() = user_id OR auth.uid() IN (
       SELECT user_id FROM events WHERE id = event_id
     ));
   
   CREATE POLICY "Anyone can create bookings" ON bookings
     FOR INSERT WITH CHECK (true);
   ```

3. **Authentication Setup**
   - Enable Email/Password authentication
   - Configure Google OAuth (optional)
   - Set up email templates

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | `https://xxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `VITE_APP_URL` | Your app's URL | `https://schedlyx.vercel.app` |

### Optional Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client ID | `123456789-xxx.apps.googleusercontent.com` |
| `VITE_GOOGLE_API_KEY` | Google Calendar API key | `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX` |
| `VITE_ANALYTICS_ID` | Analytics tracking ID | `G-XXXXXXXXXX` |
| `VITE_SENTRY_DSN` | Sentry error tracking DSN | `https://xxx@sentry.io/xxx` |

## Troubleshooting

### Common Issues

1. **Build Fails**
   ```bash
   # Check for TypeScript errors
   npm run type-check
   
   # Check for linting errors
   npm run lint
   
   # Run tests
   npm run test
   ```

2. **Environment Variables Not Working**
   - Ensure variables start with `VITE_`
   - Restart development server after changes
   - Check Vercel dashboard for correct values

3. **Supabase Connection Issues**
   - Verify URL and keys are correct
   - Check RLS policies
   - Ensure database tables exist

4. **Routing Issues**
   - Verify `vercel.json` configuration
   - Check React Router setup
   - Ensure all routes are defined

### Performance Optimization

1. **Bundle Analysis**
   ```bash
   npm run build
   npx vite-bundle-analyzer dist
   ```

2. **Lighthouse Audit**
   - Run Lighthouse on deployed site
   - Optimize images and assets
   - Enable compression

3. **Caching**
   - Vercel automatically handles caching
   - Use appropriate cache headers
   - Optimize static assets

## Monitoring

### Error Tracking

1. **Sentry Integration**
   ```bash
   npm install @sentry/react @sentry/tracing
   ```

2. **Analytics**
   - Google Analytics
   - Vercel Analytics
   - Custom event tracking

### Performance Monitoring

1. **Vercel Analytics**
   - Enable in Vercel dashboard
   - Monitor Core Web Vitals
   - Track user interactions

2. **Supabase Monitoring**
   - Database performance
   - API usage
   - Authentication metrics

## Security

### Best Practices

1. **Environment Variables**
   - Never commit secrets to git
   - Use different keys for different environments
   - Rotate keys regularly

2. **Supabase Security**
   - Enable RLS on all tables
   - Use proper authentication
   - Validate user inputs

3. **Content Security Policy**
   - Configure CSP headers
   - Restrict external resources
   - Monitor for violations

## Backup and Recovery

### Database Backups

1. **Supabase Backups**
   - Automatic daily backups
   - Manual backup creation
   - Point-in-time recovery

2. **Code Backups**
   - Git repository
   - Multiple remotes
   - Regular commits

### Disaster Recovery

1. **Deployment Rollback**
   ```bash
   # Vercel rollback
   vercel rollback
   ```

2. **Database Recovery**
   - Restore from Supabase backup
   - Migrate data if needed
   - Test functionality

---

For more help, check the [GitHub Issues](https://github.com/your-username/schedlyx/issues) or [Discussions](https://github.com/your-username/schedlyx/discussions).