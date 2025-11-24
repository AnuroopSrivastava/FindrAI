"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      localStorage.setItem("admin-auth", "true");
      window.location.href = "/admin/dashboard";
    } else {
      setError("Incorrect Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="bg-white/10 border border-blue-500/30 p-10 rounded-2xl max-w-sm w-full">
        <h1 className="text-2xl font-bold text-blue-400 mb-4">Admin Login</h1>

        <input
          type="password"
          placeholder="Enter Admin Password"
          className="w-full p-3 rounded-xl bg-black/30 border border-white/20 outline-none text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-400 mt-2">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full mt-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all"
        >
          Login
        </button>
      </div>
    </div>
  );
}
