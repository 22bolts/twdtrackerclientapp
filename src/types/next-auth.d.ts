import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      token: string
      full_name: string
      phone_number: string
      avatar: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    role?: string
    token?: string
    full_name?: string
    phone_number?: string
    avatar?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
    token?: string
    full_name?: string
    phone_number?: string
    avatar?: string
  }
}