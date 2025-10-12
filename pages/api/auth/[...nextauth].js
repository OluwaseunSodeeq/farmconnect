import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

// console.log("🧩 ENV CHECK:", {
//   NEXTAUTH_URL: process.env.NEXTAUTH_URL,
//   NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "✅ loaded" : "❌ missing",
//   POSTMAN_API_URL: process.env.POSTMAN_API_URL,
// });

export default NextAuth({
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // console.log("🟡 Received credentials:", credentials);

        try {
        //   console.log("🧩 API URL:", process.env.POSTMAN_API_URL);

          const res = await axios.post(
            process.env.POSTMAN_API_URL,
            {
              email: credentials.email,
              password: credentials.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log("🟢 API Response:", res.data);

          // Your API returns: { message, user, token }
          const { user, token } = res.data;

          if (user && user.email) {
            // return user info (NextAuth will include this in the JWT)
            return {
              id: user.id,
              name: user.fullname,
              email: user.email,
              role: user.role,
              accessToken: token,
            };
          }

        //   console.log("❌ Invalid user response:", res.data);
          return null;
        } catch (error) {
          console.error("❌ Error in authorize:", error.message);
          if (error.response) {
            console.error("❌ API Error Response:", error.response.data);
          }
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/", // your login page
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;
        token.accessToken = user.accessToken; // store backend token in JWT
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.email = token.email;
        session.user.name = token.name;
        session.accessToken = token.accessToken; // make available to frontend
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});
