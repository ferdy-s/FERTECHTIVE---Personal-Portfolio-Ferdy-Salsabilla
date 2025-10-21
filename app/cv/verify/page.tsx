"use client";
import { useEffect, useState } from "react";
export default function VerifyPage() {
  const [state, setState] = useState<"loading"|"ok"|"error">("loading");
  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token") || "";
    fetch(`/api/cv/verify?token=${encodeURIComponent(token)}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(() => setState("ok"))
      .catch(() => setState("error"));
  }, []);
  return (
    <div className="text-center">
      {state === "loading" && <p>Verifying...</p>}
      {state === "ok" && <p className="text-green-400">Email verified. Admin will review and send your CV.</p>}
      {state === "error" && <p className="text-red-400">Invalid or expired token.</p>}
    </div>
  );
}
