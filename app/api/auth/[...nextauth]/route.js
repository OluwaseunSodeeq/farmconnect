import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(process.env.POSTMAN_API_URL, {
            email: credentials.email,
            password: credentials.password,
          });

          const user = res.data.user;

          // ✅ Allow only admins to log in
          if (user?.role === "admin") {
            return user;
          }

          // ❌ Reject if not admin
          return null;
        } catch (err) {
          console.error("Auth error:", err.response?.data || err.message);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/", // redirect to login page if not signed in
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };


// // export {GET, POST} from "@/app/_lib/auth"
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import axios from "axios";

// const handler = NextAuth({
//   providers: [
//     // Email/Password login
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         try {
//           const res = await axios.post(`${process.env.POSTMAN_API_URL}/verify`, {
//             email: credentials.email,
//             password: credentials.password,
//           }, {
//             headers: { "x-api-key": process.env.POSTMAN_API_KEY },
//           });

//           const user = res.data;

//           if (user?.isAdmin) return user;
//           return null;
//         } catch (err) {
//           console.error("Login failed:", err);
//           return null;
//         }
//       },
//     }),

//     // Google Login
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],

//   // Callback to check if user is admin
//   callbacks: {
//     async signIn({ user, account }) {
//       try {
//         // Check via Postman API if Google user is admin
//         const res = await axios.get(`${process.env.POSTMAN_API_URL}/admins`, {
//           headers: { "x-api-key": process.env.POSTMAN_API_KEY },
//         });

//         const admins = res.data;
//         const isAdmin = admins.some(a => a.email === user.email);

//         return isAdmin;
//       } catch (err) {
//         console.error("Admin check failed:", err);
//         return false;
//       }
//     },
//     async session({ session, token }) {
//       session.user = token.user || session.user;
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) token.user = user;
//       return token;
//     },
//   },
// });

// export { handler as GET, handler as POST };
