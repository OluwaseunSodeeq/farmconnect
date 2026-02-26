import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Login failed");
        }

        return data.data.user; // must return user object
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       async authorize(credentials) {
//         const res = await fetch(process.env.POSTMAN_API_URL, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             email: credentials.email,
//             password: credentials.password,
//           }),
//         });

//         const data = await res.json();
//         if (!res.ok || !data.user) return null;

//         return {
//           id: data.user.id,
//           name: data.user.fullname,
//           email: data.user.email,
//           role: data.user.role,
//           accessToken: data.token,
//         };
//       },
//     }),
//   ],
//   session: { strategy: "jwt" },
//   secret: process.env.NEXTAUTH_SECRET,
// });

// export { handler as GET, handler as POST };

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         const res = await fetch(process.env.POSTMAN_API_URL, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(credentials),
//         });

//         const data = await res.json();

//         if (!res.ok || !data.user) return null;

//         return {
//           id: data.user.id,
//           name: data.user.fullname,
//           email: data.user.email,
//           role: data.user.role,
//           accessToken: data.token,
//         };
//       },
//     }),
//   ],
//   session: { strategy: "jwt" },
//   callbacks: {
//     jwt({ token, user }) {
//       if (user) return { ...token, ...user };
//       return token;
//     },
//     session({ session, token }) {
//       session.user = token;
//       session.accessToken = token.accessToken;
//       return session;
//     },
//   },
//   pages: { signIn: "/login" },
//   secret: process.env.NEXTAUTH_SECRET,
// });

// export { handler as GET, handler as POST };

// // pages/api/auth/[...nextauth].js
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         try {
//           const res = await fetch(process.env.POSTMAN_API_URL, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(credentials),
//           });

//           const data = await res.json();

//           if (!res.ok || !data.user) {
//             return null; // ❌ invalid credentials
//           }

//           // ✅ Valid login
//           return {
//             id: data.user.id,
//             name: data.user.fullname,
//             email: data.user.email,
//             role: data.user.role,
//             accessToken: data.token, // ✅ store token correctly
//           };
//         } catch (error) {
//           return null;
//         }
//       },
//     }),
//   ],
//   session: { strategy: "jwt" },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token = { ...token, ...user };
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = token;
//       session.accessToken = token.accessToken; // ✅ Consistent token path
//       return session;
//     },
//   },
//   pages: { signIn: "/" },
//   secret: process.env.NEXTAUTH_SECRET,
// });

// ===============================================

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       async authorize(credentials) {
//         try {
//           const start = Date.now();
//           const res = await fetch(process.env.POSTMAN_API_URL, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(credentials),
//             cache: "no-store",
//           });
//           // console.log("⏱ API Response Time:", Date.now() - start, "ms");

//           if (!res.ok) return null;

//           const { user, token } = await res.json();
//           return {
//             id: user.id,
//             name: user.fullname,
//             email: user.email,
//             role: user.role,
//             accessToken: token,
//           };
//         } catch {
//           return null;
//         }
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//     maxAge: 24 * 60 * 60,
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token = { ...token, ...user };
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = token;
//       session.accessToken = token.accessToken;
//       return session;
//     },
//   },
//   pages: { signIn: "/" },
//   secret: process.env.NEXTAUTH_SECRET,
// });
// ================================================
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// console.log("🧩 ENV CHECK:", {
//   NEXTAUTH_URL: process.env.NEXTAUTH_URL,
//   NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "✅ loaded" : "❌ missing",
//   POSTMAN_API_URL: process.env.POSTMAN_API_URL,
// });

// export default NextAuth({
//   debug: process.env.NODE_ENV === "development",
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//   try {
//     const res = await fetch(process.env.POSTMAN_API_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         email: credentials.email,
//         password: credentials.password,
//       }),
//       cache: "no-store",        // Prevents caching delays
//     });

//     if (!res.ok) return null;
//     const data = await res.json();

//     return {
//       id: data.user.id,
//       name: data.user.fullname,
//       email: data.user.email,
//       role: data.user.role,
//       accessToken: data.token,
//     };
//   } catch (error) {
//     console.error("Authorize Error:", error);
//     return null;
//   }
// }

//       // async authorize(credentials) {
//       //   // console.log("🟡 Received credentials:", credentials);

//       //   try {
//       //   //   console.log("🧩 API URL:", process.env.POSTMAN_API_URL);

//       //     const res = await axios.post(
//       //       process.env.POSTMAN_API_URL,
//       //       {
//       //         email: credentials.email,
//       //         password: credentials.password,
//       //       },
//       //       {
//       //         headers: {
//       //           "Content-Type": "application/json",
//       //         },
//       //       }
//       //     );

//       //     console.log("🟢 API Response:", res.data);

//       //     // Your API returns: { message, user, token }
//       //     const { user, token } = res.data;

//       //     if (user && user.email) {
//       //       // return user info (NextAuth will include this in the JWT)
//       //       return {
//       //         id: user.id,
//       //         name: user.fullname,
//       //         email: user.email,
//       //         role: user.role,
//       //         accessToken: token,
//       //       };
//       //     }

//       //   //   console.log("❌ Invalid user response:", res.data);
//       //     return null;
//       //   } catch (error) {
//       //     console.error("❌ Error in authorize:", error.message);
//       //     if (error.response) {
//       //       console.error("❌ API Error Response:", error.response.data);
//       //     }
//       //     return null;
//       //   }
//       // },
//     }),
//   ],

//   pages: {
//     signIn: "/", // your login page
//   },

//   session: {
//     strategy: "jwt",
//   },

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//         token.email = user.email;
//         token.name = user.name;
//         token.accessToken = user.accessToken; // store backend token in JWT
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       if (token && session.user) {
//         session.user.id = token.id;
//         session.user.role = token.role;
//         session.user.email = token.email;
//         session.user.name = token.name;
//         session.accessToken = token.accessToken; // make available to frontend
//       }
//       return session;
//     },
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// });
