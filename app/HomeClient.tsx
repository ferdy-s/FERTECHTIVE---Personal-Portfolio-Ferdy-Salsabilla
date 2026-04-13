"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SpaceField from "@/components/effects/SpaceField";
import dynamic from "next/dynamic";

const Globe3D = dynamic(() => import("@/components/Globe3D"), {
  ssr: false,
});

export default function HomeClient() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-deep-950 text-white">
      <SpaceField density={0.22} speed={0.32} />

      {/* ambient lighting */}
      <div className="pointer-events-none absolute -top-32 left-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-3xl" />

      {/* MAIN WRAPPER */}
      <div className="relative z-10 flex min-h-screen items-center px-6">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">

          {/* ================= LEFT ================= */}
          <div className="text-center md:text-left">

            {/* badge */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-wider text-white/70"
            >
              Selamat Datang di Halaman
            </motion.div>

            {/* title */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-5 text-[44px] md:text-[92px] font-semibold tracking-tight leading-[1.05]"
            >
              FERTECHTIVE
            </motion.h1>

            {/* desc */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mx-auto mt-5 max-w-lg text-[15px] text-white/60 leading-relaxed md:mx-0"
            >
              <span className="text-white/90 font-medium">Fertechtive</span>{" "}
              adalah portfolio digital yang menampilkan{" "}
              <span className="text-cyan-300">gagasan</span>,{" "}
              <span className="text-violet-300">karya</span>, dan eksplorasi
              teknologi dengan pendekatan modern dan berdampak.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex items-center justify-center gap-3 md:justify-start"
            >
              <Link
                href="/portfolio"
                className="rounded-full bg-white px-6 py-2.5 text-[14px] font-medium text-black hover:opacity-90 transition"
              >
                Lihat Karya
              </Link>

              <a
                href="https://wa.me/6282134027993"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/50 px-6 py-2.5 text-[14px] text-white/70 hover:border-white/80 hover:text-white transition"
              >
                Hubungi Saya
              </a>
            </motion.div>
          </div>


{/* ================= RIGHT (REAL 3D GLOBE) ================= */}
<div className="hidden md:flex items-center justify-center w-[600px] h-[600px]">
  <Globe3D />
</div>

        </div>
      </div>
    </section>
  );
}