import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
    // Configuration options for NextAuth
  
    // Define custom pages for authentication routes
    pages: {
      signIn: '/login', // Redirects to '/login' when user needs to sign in
    },
  
    // Define callback functions for authentication flow
    callbacks: {
      authorized({ auth, request: { nextUrl } }) {
        const isLoggedIn = !!auth?.user; // Checks if user is logged in
        const isOnDashboard = nextUrl.pathname.startsWith('/dashboard'); // Checks if the user is accessing the dashboard
  
        if (isOnDashboard) {
          if (isLoggedIn) return true; // If user is logged in and accessing dashboard, allow access
          return false; // If user is not logged in, redirect to login page
        } else if (isLoggedIn) {
          return Response.redirect(new URL('/dashboard', nextUrl)); // If user is logged in but not accessing dashboard, redirect to dashboard
        }
  
        return true; // If none of the conditions are met, allow access
      },
    },
  
    providers: [], // Array to configure authentication providers (e.g., Google, Facebook, etc.)
  } satisfies NextAuthConfig;
  