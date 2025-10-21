// app/login/page.tsx (client)
"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const params = useSearchParams();
  const [email, setEmail] = useState("ferdysalsabilla87@gmail.com");
  const [password, setPassword] = useState("ferdysal123");
  const [err, setErr] = useState<string | null>(null);
  const callbackUrl = params.get("callbackUrl") || "/admin";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl,
    });
    // kalau redirect:false, cek res?.error untuk tampilkan pesan
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-md space-y-4 p-6 rounded-xl border border-white/10"
    >
      <h1 className="text-2xl font-bold">Admin Login</h1>
      <input
        className="w-full rounded-lg bg-white/5 p-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full rounded-lg bg-white/5 p-3"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="w-full rounded-lg border border-white/10 bg-white/10 py-3">
        Masuk
      </button>
      {err && <p className="text-red-500 text-sm">{err}</p>}
    </form>
  );
}
