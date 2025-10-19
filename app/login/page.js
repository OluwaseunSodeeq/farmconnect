"use client";

import LoginPage from "../components/LoginPage";

export default function Page() {
  const entryDigits = {
  "email": "admin@farmconnect.com",
  "password": "zxcvbnm"
};
console.log("Entry Digits:", entryDigits);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <LoginPage />
    </div>
  );
}

