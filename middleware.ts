import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

/** Tentukan locale awal dari Accept-Language */
function pickLocale(accept?: string): "id" | "en" {
  if (!accept) return "en";
  const primary = accept.split(",")[0]?.trim().toLowerCase();
  return primary?.startsWith("id") ? "id" : "en";
}

const LOGIN_PATH = "/login"; // <-- ganti jika login kamu di path lain

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname, search } = url;

  /** 1) Strip trailing .html (permanent) */
  if (pathname.endsWith(".html")) {
    url.pathname = pathname.slice(0, -5);
    return NextResponse.redirect(url, 301);
  }

  /** 2) Locale alias: /en|/id -> redirect ke path bersih + set cookie lang */
  const m = pathname.match(/^\/(en|id)(\/.*)?$/);
  if (m) {
    url.pathname = m[2] || "/";
    const res = NextResponse.redirect(url, 302);
    res.cookies.set("lang", m[1] as "en" | "id", {
      path: "/",
      sameSite: "lax",
    });
    return res;
  }

  /** 3) Admin guard: wajib login untuk /admin */
  const isAdmin = pathname.startsWith("/admin");
  const isAuthApi = pathname.startsWith("/api/auth");
  const isLoginPage = pathname === LOGIN_PATH;

  if (isAdmin && !isAuthApi && !isLoginPage) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      const login = new URL(LOGIN_PATH, req.url);
      login.searchParams.set("callbackUrl", pathname + search);
      return NextResponse.redirect(login);
    }
  }

  /** 4) Set cookie lang sekali jika belum ada */
  if (!req.cookies.get("lang")) {
    const locale = pickLocale(req.headers.get("accept-language") || undefined);
    const res = NextResponse.next();
    res.cookies.set("lang", locale, { path: "/", sameSite: "lax" });
    return res;
  }

  /** 5) Lolos */
  return NextResponse.next();
}

export const config = {
  // match semua kecuali assets Next & file statis
  matcher: ["/((?!_next|.*\\..*).*)"],
};
