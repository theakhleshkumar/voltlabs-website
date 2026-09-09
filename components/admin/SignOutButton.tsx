"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SignOutButton = () => {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const signOut = async () => {
    setBusy(true);
    try {
      await fetch("/api/admin/login", { method: "DELETE" });
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={signOut}
      disabled={busy}
      className="text-sm text-gray-600 hover:text-[#EAA832] font-medium cursor-pointer disabled:opacity-50"
    >
      {busy ? "Signing out..." : "Sign out"}
    </button>
  );
};

export default SignOutButton;
