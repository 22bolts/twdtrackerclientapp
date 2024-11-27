import NextAuth from 'next-auth';
import { authOptions } from './auth-options';

const handler = NextAuth(authOptions);


export const dynamic = 'force-static'
export { handler as GET, handler as POST };
