"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const AdminLogin = () => {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "checking">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("checking");
    setError(null);

    const password = String(new FormData(event.currentTarget).get("password") ?? "");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        setError(result.error ?? "Could not sign in.");
        setStatus("idle");
        return;
      }

      router.refresh();
    } catch {
      setError("Could not reach the server.");
      setStatus("idle");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 p-8 space-y-5"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">VoltLabs admin</h1>
          <p className="text-sm text-gray-600 mt-1">Sign in to manage orders.</p>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            autoComplete="current-password"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#EAA832] focus:ring-2 focus:ring-[#EAA832]/20 outline-none transition-all"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "checking"}
          className="w-full bg-[#EAA832] hover:bg-[#D4922A] disabled:bg-[#EAA832]/50 text-white py-3 rounded-xl font-semibold transition-all cursor-pointer disabled:cursor-not-allowed"
        >
          {status === "checking" ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
};

export default AdminLogin;
