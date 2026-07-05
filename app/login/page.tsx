"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const searchParams = useSearchParams();

  const callbackUrl =
  searchParams?.get("callbackUrl") ?? "/jobs";
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  async function handleLogin(
  e: React.FormEvent
) {
  e.preventDefault();

  const params =
    new URLSearchParams(
      window.location.search
    );

  const callbackUrl =
    params.get("callbackUrl") ??
    "/";

  await signIn("credentials", {
    username,
    password,
    callbackUrl,
  });
}

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="border p-6 rounded-lg w-80 space-y-4"
      >
        <h1 className="text-2xl font-bold">
          Login
        </h1>

        <input
          placeholder="Username"
          className="border p-2 w-full rounded"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full rounded"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="bg-blue-600 text-white p-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </main>
  );
}