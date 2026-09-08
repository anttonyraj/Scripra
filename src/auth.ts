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

const getAuthSecret = () => {
  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
  if (secret && secret.trim() !== "") {
    return secret;
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "FATAL SECURITY CONFIGURATION: AUTH_SECRET or NEXTAUTH_SECRET environment variable is missing. NextAuth cannot start in production without a verified private secret."
    );
  }
  // Development only fallback warning
  console.warn(
    "[Scripra Security Notice] Running in development without AUTH_SECRET. Please configure AUTH_SECRET in .env.local."
  );
  return "dev_only_scripra_auth_secret_local_development_environment_key";
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  secret: getAuthSecret(),
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
