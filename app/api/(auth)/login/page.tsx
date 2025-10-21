"use client";
import { useState } from "react";

export default function LoginPage() {
  const [err, setErr] = useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/callback/credentials", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        redirect: "false",
        callbackUrl: "/admin",
        email: String(fd.get("email") || ""),
        password: String(fd.get("password") || ""),
      }),
    });
    if (res.ok) window.location.href = "/admin";
    else setErr("Login gagal");
  }
  return (
    <div className="max-w-sm mx-auto mt-20 border border-white/10 rounded-xl p-6 bg-white/5">
      <h1 className="text-xl font-semibold mb-4">Admin Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full bg-transparent border p-2 rounded"
          name="email"
          placeholder="Email"
        />
        <input
          className="w-full bg-transparent border p-2 rounded"
          type="password"
          name="password"
          placeholder="Password"
        />
        <button className="w-full border rounded p-2">Masuk</button>
        {err && <p className="text-red-400 text-sm">{err}</p>}
      </form>
    </div>
  );
}
