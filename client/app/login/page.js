"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginForm from "../components/LoginForm";
import { useEffect } from "react";

export default function Page() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  // Optional: prevent flicker while checking session
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Checking .....</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <LoginForm />
    </div>
  );
}
