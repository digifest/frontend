import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Name" },
        password: { label: "Password" },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password)
          return null;
        // const { email, password } = credentials;

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {},
  pages: {
    signIn: "/dashboard",
    signOut: "/account/login",
    error: "/account/login",
  },
};

export default authOptions;
