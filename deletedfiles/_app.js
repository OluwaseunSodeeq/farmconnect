import { SessionProvider } from "next-auth/react";
import "../app/globals.css";
import ProtectedRoute from "../app/components/ProtectedRoute";

const protectedRoutes = [
  "/dashboard",
  "/dashboard/orders",
  "/dashboard/settings",
];

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  router,
}) {
  const isProtected = protectedRoutes.some((path) =>
    router.pathname.startsWith(path)
  );

  return (
    <SessionProvider session={session}>
      {isProtected ? (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}
