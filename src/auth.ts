import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

const hasGoogleKeys = Boolean(
  process.env.GOOGLE_CLIENT_ID && 
  process.env.GOOGLE_CLIENT_SECRET &&
  process.env.GOOGLE_CLIENT_ID !== "" &&
  process.env.GOOGLE_CLIENT_SECRET !== ""
);

const providers = [];

if (hasGoogleKeys) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  );
}

// Built-in Demo & Guest Credentials Provider so the app is 100% accessible even before Google OAuth keys are set
providers.push(
  Credentials({
    id: "credentials",
    name: "Demo / Guest Access",
    credentials: {
      email: { label: "Email", type: "email" },
      name: { label: "Name", type: "text" },
    },
    async authorize(credentials) {
      return {
        id: "demo-user-" + Date.now(),
        name: (credentials?.name as string) || "Scripra Pilot Member",
        email: (credentials?.email as string) || "founder@scripra.com",
        image: "https://avatar.vercel.sh/scripra",
      };
    },
  })
);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  secret:
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "scripra_production_jwt_secret_key_random_64_characters_fallback_enterprise_2026",
  trustHost: true,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});
