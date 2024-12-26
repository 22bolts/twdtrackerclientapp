import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '@/env.mjs';
import { pagesOptions } from './pages-options';
import axios from 'axios';

const API_ENDPOINT = 'https://twdtracker.com/api/users/signin';

export const authOptions: NextAuthOptions = {
  pages: {
    ...pagesOptions,
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 // 24 hours
      }
    }
  },
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          token: token.token,
          role: token.role,
          full_name: token.full_name,
          phone_number: token.phone_number,
          avatar: token.avatar
        },
      };
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.token = user.token;
        token.full_name = user.full_name;
        token.phone_number = user.phone_number;
        token.avatar = user.avatar;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    }
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and password required');
          }

          const response = await axios.post(API_ENDPOINT, {
            email: credentials.email,
            password: credentials.password
          });

          const userData = response.data.data;
          const token = response.data.token;

          if (userData && token) {
            return {
              id: String(userData.id), // Ensure id is a string
              email: userData.email,
              name: userData.full_name,
              role: userData.role,
              token: token,
              full_name: userData.full_name,
              phone_number: userData.phone_number,
              avatar: userData.avatar
            };
          }
          
          return null;
        } catch (error: any) {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
              throw new Error('Invalid credentials');
            }
            if (error.response?.status === 404) {
              throw new Error('User not found');
            }
          }
          throw new Error('Authentication failed');
        }
      }
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID || '',
      clientSecret: env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),
  ],
};