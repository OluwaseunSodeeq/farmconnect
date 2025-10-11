import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

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
        console.log("🟡 Received credentials:", credentials);

        try {
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
          const user = res.data.user || res.data.data || res.data;

          if (user && user.email) {
            return {
              id: user.id || 1,
              name: user.fullname || user.email.split("@")[0],
              email: user.email,
              role: user.role || "user",
            };
          }

          console.log("❌ Invalid user response:", res.data);
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
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});



// ========================================

// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import axios from "axios";

// export const authOptions = {
//   debug: true,
//   providers: [
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         console.log("🟡 Received credentials:", credentials);
//         console.log("🟡 API URL:", process.env.POSTMAN_API_URL);

//         try {
//           const res = await axios.post(
//             process.env.POSTMAN_API_URL,
//             {
//               email: credentials.email,
//               password: credentials.password,
//             },
//             {
//               headers: {
//                 Authorization: `Bearer ${process.env.POSTMAN_BEARER}`,
//                 "Content-Type": "application/json",
//               },
//             }
//           );

//           console.log("🟢 API Response:", res.data);

//           // ✅ Extract the user from the response
//           const user = res.data.user;

//           // ✅ If login was successful and user exists
//           if (user && user.email) {
//             return {
//               id: user.id,
//               name: user.fullname || user.email.split("@")[0],
//               email: user.email,
//               role: user.role,
//               token: res.data.token, // optional if you need it later
//             };
//           }

//           console.log("❌ Invalid user response:", res.data);
//           return null;
//         } catch (error) {
//           console.error("❌ Error in authorize:", error.message);
//           if (error.response) {
//             console.error("❌ API Error Response:", error.response.data);
//           }
//           return null;
//         }
//       },
//     }),
//   ],

//   session: { strategy: "jwt" },
//   secret: process.env.NEXTAUTH_SECRET,

//   pages: {
//     signIn: "/", // your login page
//   },

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//         token.email = user.email;
//         token.name = user.name;
//         token.accessToken = user.token;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token && session.user) {
//         session.user.id = token.id;
//         session.user.role = token.role;
//         session.user.email = token.email;
//         session.user.name = token.name;
//         session.user.accessToken = token.accessToken;
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };


// ========================================

// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import axios from "axios";

// // ✅ Define your options separately
// export const authOptions = {
//   debug: true,
//   providers: [
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         console.log("🟡 Received credentials:", credentials);
//         console.log("🟡 API URL:", process.env.POSTMAN_API_URL);

//         try {
//           const res = await axios.post(process.env.POSTMAN_API_URL, {
//             email: credentials.email,
//             password: credentials.password,
//           });

//           console.log("🟢 API Response:", res.data);
//           const user = res.data;

//           if (user && user.email) {
//             return {
//               id: user.id || 1,
//               name: user.name || user.email.split("@")[0],
//               email: user.email,
//               role: user.role || "admin",
//             };
//           }

//           console.log("❌ Invalid user response:", user);
//           return null;
//         } catch (error) {
//           console.error("❌ Error in authorize:", error.message);
//           if (error.response) {
//             console.error("❌ API Error Response:", error.response.data);
//           }
//           return null;
//         }
//       },
//     }),
//   ],

//   session: { strategy: "jwt" },
//   secret: process.env.NEXTAUTH_SECRET,

//   pages: {
//     signIn: "/", // 👈 your login page
//   },

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token && session.user) {
//         session.user.id = token.id;
//         session.user.role = token.role;
//       }
//       return session;
//     },
//   },
// };

// // ✅ Create handler for both GET & POST
// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };


// ===========================
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import axios from "axios";

// const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//   try {
//     const res = await axios.post(process.env.POSTMAN_API_URL, {
//       email: credentials.email,
//       password: credentials.password,
//     });

//     const user = res.data;
//     console.log("✅ API response:", user);

//     if (user && user.email) {
//       return {
//         id: user.id || 1,
//         name: user.name || user.email.split("@")[0],
//         email: user.email,
//         role: user.role || "admin",
//       };
//     } else {
//       console.log("❌ Invalid user data:", user);
//       return null;
//     }
//   } catch (err) {
//     console.error("❌ Authorization failed:", err.response?.data || err.message);
//     return null; // ⚠️ Always return null to prevent NextAuth from crashing
//   }
// }

//       // async authorize(credentials) {
//       //   try {
//       //     const apiUrl = process.env.POSTMAN_API_URL;
//       //     if (!apiUrl) throw new Error("POSTMAN_API_URL not set in .env.local");

//       //     const res = await axios.post(apiUrl, {
//       //       email: credentials.email,
//       //       password: credentials.password,
//       //     });

//       //     console.log("✅ API Response Data:", res.data);

//       //     const user = res.data;

//       //     if (user && user.email) {
//       //       return {
//       //         id: user.id || 1,
//       //         name: user.name || user.email.split("@")[0],
//       //         email: user.email,
//       //         role: user.role || "admin",
//       //       };
//       //     }

//       //     return null;
//       //   } catch (err) {
//       //     console.error("❌ Authorization error:", err.response?.data || err.message);
//       //     throw new Error("Invalid credentials or API error");
//       //   }
//       // },
//     }),
//   ],

//   pages: {
//     login: "/",
//   },

//   session: {
//     strategy: "jwt",
//   },

//   secret: process.env.NEXTAUTH_SECRET,

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token && session.user) {
//         session.user.id = token.id;
//         session.user.role = token.role;
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
// ===========================


// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import axios from "axios";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           const res = await axios.post(process.env.POSTMAN_API_URL, {
//             email: credentials.email,
//             password: credentials.password,
//           });

//           const user = res.data.user;

//           // ✅ Allow only admins to log in
//           if (user?.role === "admin") {
//             return user;
//           }

//           // ❌ Reject if not admin
//           return null;
//         } catch (err) {
//           console.error("Auth error:", err.response?.data || err.message);
//           return null;
//         }
//       },
//     }),
//   ],

//   pages: {
//     signIn: "/", // redirect to login page if not signed in
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// });

// export { handler as GET, handler as POST };
// =========================================

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
