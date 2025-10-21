"use client";

import Link from "next/link";
import Head from "next/head";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  Layers,
  Cpu,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import {
  useId,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
  type ElementType,
} from "react";
import { useActionState } from "react";
import Script from "next/script";
import { createCvRequest } from "@/app/admin/cv/actions";

/* ---------- util ---------- */
function cx(...cls: Array<string | false | null | undefined>) {
  return cls.filter(Boolean).join(" ");
}

/* ================== PAGE ================== */
export default function Page() {
  return (
    <main
      role="main"
      className="relative isolate overflow-hidden bg-deep-950 text-white pt-28 md:pt-32 pb-24"
    >
      {/* background ringan dan aman performa */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-deep-900 via-deep-950 to-black"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[280px] w-[280px] rounded-full bg-cyan-500/10 blur-2xl -z-10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 h-[280px] w-[280px] rounded-full bg-violet-500/10 blur-2xl -z-10"
      />

      {/* container */}
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-10 space-y-16 md:space-y-20 pt-6 md:pt-8 lg:pt-10">
        {/* ===== Breadcrumb + JSON-LD ===== */}

        {/* ===== HERO ===== */}
        <header className="grid items-start gap-10 md:grid-cols-12">
          {/* kiri */}
          <div className="md:col-span-7 max-w-2xl">
            <FadeIn
              as="h1"
              className="text-3xl md:text-5xl lg:text-[56px] font-extrabold leading-tight tracking-tight"
            >
              Tentang{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 bg-clip-text text-transparent">
                Fertechtive
              </span>
            </FadeIn>

            <FadeIn
              delay={0.08}
              as="p"
              className="mt-5 text-[15px] md:text-[17px] lg:text-[18px] text-white/80 leading-relaxed max-w-2xl"
            >
              <strong>Fertechtive</strong> adalah identitas personal dari{" "}
              <strong>Ferdy Salsabilla</strong>, seorang{" "}
              <strong>Web Developer</strong> dan <strong>UI/UX Designer</strong>{" "}
              dengan pengalaman lebih dari tiga tahun. <br />
              <br />
              Platform ini menjadi ruang untuk mendokumentasikan karya dan
              eksperimen saya di bidang <strong>
                website development
              </strong>, <strong>UI/UX Designer</strong>,{" "}
              <strong>Graphic Design</strong>, dan{" "}
              <strong>Digital Marketing</strong> berbasis data, dengan fokus
              pada pengalaman pengguna, performa, dan keberlanjutan digital.
            </FadeIn>

            <div className="mt-6 flex flex-wrap gap-3">
              <PrimaryLink href="/portfolio">Lihat Portfolio</PrimaryLink>
              <RequestCvButton />
            </div>
          </div>

          {/* kanan: foto */}
          <FadeIn className="md:col-span-5 order-first md:order-none">
            <Image
              src="/ferdy.jpg"
              alt="Ferdy Salsabilla"
              width={640}
              height={380}
              priority
              sizes="(max-width: 768px) 100vw, 640px"
              className="h-auto w-full rounded-2xl border border-white/10 object-cover shadow-xl"
            />
          </FadeIn>
        </header>

        {/* ===== PRINSIP DAN PENDEKATAN (versi revisi 5 poin seimbang) ===== */}
        <section
          aria-labelledby="prinsip"
          className="grid gap-8 md:grid-cols-12"
        >
          {/* Prinsip */}
          <div className="md:col-span-7 space-y-6">
            <Eyebrow>Prinsip dan Pendekatan</Eyebrow>
            <h2
              id="prinsip"
              className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug tracking-tight"
            >
              Pendekatan kerja{" "}
              <span className="text-cyan-300">
                yang terukur, kreatif, dan berkelanjutan
              </span>
            </h2>

            <ul className="mt-3 space-y-5">
              <ValueItem
                icon={
                  <Sparkles className="h-5 w-5 text-cyan-300" aria-hidden />
                }
                title="Integrasi desain dan teknologi"
                desc="Setiap ide dimulai dari pemahaman pengguna dan diterjemahkan menjadi sistem antarmuka yang efisien. Desain bukan hanya tampilan, tetapi juga struktur logika di baliknya."
                className="text-[15px] md:text-[17px] leading-relaxed"
              />
              <ValueItem
                icon={
                  <Layers className="h-5 w-5 text-violet-300" aria-hidden />
                }
                title="Pendekatan berbasis sistem"
                desc="Proyek disusun dari fondasi data, komponen, hingga interaksi untuk memastikan skalabilitas dan konsistensi di seluruh platform."
                className="text-[15px] md:text-[17px] leading-relaxed"
              />
              <ValueItem
                icon={<Cpu className="h-5 w-5 text-cyan-300" aria-hidden />}
                title="Efisiensi dalam setiap proses"
                desc="Menggunakan Next.js, TailwindCSS, dan Prisma untuk membangun alur kerja cepat, aman, serta mudah dipelihara tanpa mengorbankan kualitas visual."
                className="text-[15px] md:text-[17px] leading-relaxed"
              />
              <ValueItem
                icon={
                  <CheckCircle2
                    className="h-5 w-5 text-violet-300"
                    aria-hidden
                  />
                }
                title="Keterukuran hasil dan dampak"
                desc="Setiap keputusan desain atau kode dievaluasi berdasarkan hasil nyata, seperti waktu muat, keterbacaan, dan kenyamanan pengguna."
                className="text-[15px] md:text-[17px] leading-relaxed"
              />
              <ValueItem
                icon={<Cpu className="h-5 w-5 text-cyan-300" aria-hidden />}
                title="Kolaborasi lintas disiplin"
                desc="Bekerja bersama tim desain, pengembang, dan peneliti untuk memastikan produk akhir selaras dengan visi bisnis dan kebutuhan manusia."
                className="text-[15px] md:text-[17px] leading-relaxed"
              />
            </ul>
          </div>

          {/* Ringkasan Dampak */}
          <FadeIn
            className="md:col-span-5 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            delay={0.05}
          >
            <h3 className="text-lg md:text-xl font-semibold">
              Ringkasan Dampak
            </h3>
            <p className="mt-2 text-[14px] md:text-[16px] text-white/70">
              Hasil yang dirasakan pengguna dan tim setelah pendekatan ini
              diterapkan. Setiap aspek diukur dan divalidasi agar terus
              memberikan nilai nyata.
            </p>

            <div className="mt-5 grid gap-4">
              <ImpactCard
                title="Interaksi antarmuka halus"
                detail="Respon sistem diukur di bawah dua ratus milidetik untuk menjaga pengalaman tetap lancar."
                meterLabel="Stabilitas interaksi"
                meterValue={92}
              />
              <ImpactCard
                title="Struktur mudah dipahami"
                detail="Informasi terorganisir dengan hierarki heading dan navigasi yang ramah SEO serta pengguna."
                meterLabel="Keterbacaan konten"
                meterValue={95}
              />
              <ImpactCard
                title="Performa efisien"
                detail="Aset dioptimalkan dan animasi disesuaikan agar tetap mulus tanpa mengganggu pemuatan."
                meterLabel="Kecepatan muatan"
                meterValue={93}
              />
            </div>
          </FadeIn>
        </section>

        {/* ===== KEMAMPUAN ===== */}
        <section aria-labelledby="skill">
          <div className="mb-10 text-center">
            <Eyebrow>Spektrum kemampuan</Eyebrow>
            <h2
              id="skill"
              className="text-2xl md:text-3xl font-bold tracking-tight"
            >
              Apa Yang Saya Kuasai
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-[14px] md:text-[16px] text-white/70">
              Fondasi teknis dipadukan dengan desain yang terukur. Fokus pada
              manfaat nyata, alur kerja jelas, serta kualitas jangka panjang.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* FRONT END */}
            <SkillCard
              title="Front End"
              bullets={[
                "Arsitektur antarmuka modern untuk pengalaman cepat dan intuitif.",
                "Manajemen state efisien untuk alur interaksi tanpa hambatan.",
                "Optimasi performa melalui caching, prefetch, dan render adaptif.",
                "Desain responsif dengan tata letak fleksibel di berbagai perangkat.",
                "Integrasi aksesibilitas agar pengalaman pengguna lebih inklusif.",
              ]}
            >
              <LogosRow
                logos={[
                  [
                    "HTML",
                    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
                  ],
                  [
                    "CSS",
                    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
                  ],
                  [
                    "JavaScript",
                    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                  ],
                  [
                    "React",
                    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                  ],
                  [
                    "Next.js",
                    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
                  ],
                  [
                    "Flutter",
                    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
                  ],
                ]}
                badges={[
                  "TailwindCSS",
                  "Framer Motion",
                  "Aksesibilitas dan SEO",
                ]}
              />
            </SkillCard>

            {/* BACK END DAN DATA */}
            <SkillCard
              title="Back End dan Data"
              bullets={[
                "API dirancang aman, stabil, dan konsisten di seluruh sistem.",
                "Pengelolaan basis data efisien dengan indexing dan migrasi terukur.",
                "Penggunaan ORM modern untuk relasi dan validasi otomatis.",
                "Logging, observabilitas, dan pembatasan laju bawaan untuk reliabilitas.",
                "Struktur modular agar integrasi antar layanan tetap bersih dan cepat.",
              ]}
            >
              <LogosRow
                logos={[
                  [
                    "Node.js",
                    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
                  ],
                  [
                    "Laravel",
                    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
                  ],
                  [
                    "PostgreSQL",
                    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
                  ],
                  [
                    "MySQL",
                    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
                  ],
                  [
                    "SQLite",
                    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
                  ],
                  [
                    "Python",
                    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
                  ],
                ]}
                badges={["Prisma ORM", "Antrian dasar", "Keamanan API"]}
              />
            </SkillCard>

            {/* UI UX DAN DESAIN */}
            <SkillCard
              title="UI dan UX serta Desain"
              bullets={[
                "Arsitektur informasi yang memastikan navigasi logis dan efisien.",
                "Sistem desain dengan komponen reusable untuk konsistensi visual.",
                "Prototyping cepat untuk validasi ide dan micro-interaction.",
                "Pengujian kegunaan untuk memastikan desain benar-benar dipahami.",
                "Integrasi branding dan warna untuk menciptakan identitas yang kuat.",
              ]}
            >
              <LogosRow
                logos={[
                  [
                    "Figma",
                    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
                  ],
                  ["Adobe Photoshop", "https://skillicons.dev/icons?i=ps"],
                  ["Adobe Illustrator", "https://skillicons.dev/icons?i=ai"],
                ]}
                badges={["Design System", "Wireframing", "Usability Testing"]}
              />
            </SkillCard>

            {/* PRODUKTIVITAS DAN ALAT KERJA */}
            <SkillCard
              title="Produktivitas dan Alat Kerja"
              bullets={[
                "Dokumentasi rapi dan berkelanjutan untuk efisiensi kolaborasi.",
                "Workflow otomatis yang mempercepat pengujian dan deployment.",
                "Kontrol versi dan review terstruktur melalui Git & GitHub.",
                "Pemanfaatan AI tools untuk mempercepat debugging dan riset.",
                "Lingkungan kerja lintas platform dengan standar kualitas konsisten.",
              ]}
            >
              <LogosRow
                logos={[
                  ["Microsoft Word", "https://skillicons.dev/icons?i=word"],
                  [
                    "Microsoft PowerPoint",
                    "https://skillicons.dev/icons?i=powerpoint",
                  ],
                  ["Microsoft Excel", "https://skillicons.dev/icons?i=excel"],
                  [
                    "Visual Studio Code",
                    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
                  ],
                  [
                    "Android Studio",
                    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg",
                  ],
                  [
                    "Git",
                    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
                  ],
                ]}
                badges={[]}
              />
            </SkillCard>
          </div>
        </section>

        {/* ===== ALUR KERJA FERDY SALSABILLA — GRID 3x3, RESPONSIF (SEJAJAR DGN SKILLS) ===== */}
        {(() => {
          const steps = [
            {
              title: "Analisis Awal dan Pemahaman Kebutuhan",
              desc: "Saya memulai dengan memahami tujuan, konteks, hambatan, dan harapan hasil agar solusi relevan dan bernilai.",
              detail: [
                "Diskusi terarah untuk mengurai masalah inti",
                "Daftar kebutuhan yang terukur dan mudah dipahami",
                "Prioritas kerja yang selaras dengan tujuan",
              ],
            },
            {
              title: "Riset Kontekstual dan Benchmark",
              desc: "Saya memetakan pasar, pengguna, dan pendekatan kompetitor agar keputusan proyek berbasis data dan tepat sasaran.",
              detail: [
                "Analisis pola dan preferensi pengguna",
                "Pemetaan pembeda dan peluang unik",
                "Ringkasan insight sebagai landasan strategi",
              ],
            },
            {
              title: "Strategi dan Perencanaan Proyek",
              desc: "Saya menyusun rencana yang ringkas dan terstruktur sehingga progres jelas dan dapat dipantau dengan mudah.",
              detail: [
                "Roadmap dengan milestone terukur",
                "Urutan pengerjaan berdasarkan dampak",
                "Indikator keberhasilan untuk setiap tahap",
              ],
            },
            {
              title: "Struktur Informasi dan Arsitektur Solusi",
              desc: "Saya membuat kerangka informasi dan alur interaksi yang logis sehingga sistem mudah dipahami sejak awal.",
              detail: [
                "Diagram alur pengguna dan hierarki konten",
                "Struktur data yang konsisten",
                "Keterhubungan setiap bagian yang transparan",
              ],
            },
            {
              title: "Desain Pengalaman dan Antarmuka",
              desc: "Saya merancang pengalaman yang intuitif dan tampilan yang elegan agar estetika dan kegunaan berjalan seimbang.",
              detail: [
                "Prototype untuk menilai alur utama",
                "Konsistensi gaya, warna, dan tipografi",
                "Aksesibilitas dan kenyamanan lintas perangkat",
              ],
            },
            {
              title: "Implementasi dan Integrasi Solusi",
              desc: "Saya merealisasikan rancangan menjadi sistem nyata dengan memastikan stabilitas, keamanan, dan efisiensi.",
              detail: [
                "Penerapan logika dan aturan bisnis",
                "Integrasi data dan layanan pendukung",
                "Validasi hasil agar sesuai rencana",
              ],
            },
            {
              title: "Uji Fungsionalitas dan Validasi Pengalaman",
              desc: "Saya menguji fitur dan proses nyata untuk memastikan kelancaran penggunaan dan kualitas hasil.",
              detail: [
                "Pengujian fungsi dan performa",
                "Peninjauan pengalaman pengguna",
                "Perbaikan berdasarkan temuan prioritas",
              ],
            },
            {
              title: "Peluncuran dan Pemantauan Awal",
              desc: "Saya menyiapkan peluncuran yang terkendali dan memantau perilaku sistem agar tetap stabil dan responsif.",
              detail: [
                "Konfigurasi keamanan dan akses",
                "Observasi pasca rilis untuk mendeteksi anomali",
                "Laporan performa awal dan rekomendasi",
              ],
            },
            {
              title: "Evaluasi dan Pengembangan Berkelanjutan",
              desc: "Saya menutup siklus dengan evaluasi menyeluruh dan menyiapkan langkah berikutnya berdasarkan data dan umpan balik.",
              detail: [
                "Perbandingan hasil terhadap indikator keberhasilan",
                "Dokumentasi proses dan pembelajaran",
                "Rencana iterasi yang relevan",
              ],
            },
          ] as const;

          return (
            <section
              id="workflow"
              aria-labelledby="workflow-title"
              className="relative py-14" // ← tidak ada max-w atau px agar ikut container induk
            >
              {/* latar halus tetap penuh lebar */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 [background:radial-gradient(900px_420px_at_50%_-10%,rgba(99,102,241,0.12),transparent_70%),radial-gradient(700px_320px_at_85%_10%,rgba(34,197,94,0.08),transparent_70%)]"
                style={{
                  maskImage:
                    "radial-gradient(900px_420px_at_center,black,transparent)",
                }}
              />

              <div className="relative text-center mb-12">
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-widest text-white/70">
                  Alur kerja
                </span>
                <h2
                  id="workflow-title"
                  className="mt-4 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white"
                >
                  Alur Kerja Profesional
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-[14px] md:text-[16px] text-white/70 leading-relaxed">
                  Pendekatan personal yang menyeimbangkan strategi, estetika,
                  dan ketepatan teknis sehingga hasil kerja relevan, efisien,
                  dan bernilai tinggi.
                </p>
              </div>

              {/* GRID 3x3 — sejajar dengan section Skills karena ikut padding container induk */}
              <div
                className="
          grid gap-8
          grid-cols-1 sm:grid-cols-2 xl:grid-cols-3
          auto-rows-fr
        "
                role="list"
                aria-label="Sembilan tahap alur kerja"
              >
                {steps.map((step, idx) => (
                  <details
                    key={idx}
                    className="
              group h-full
              border border-white/10 rounded-2xl
              bg-white/[0.02] backdrop-blur-sm
              hover:bg-white/[0.04] transition-colors
              flex flex-col
            "
                  >
                    <summary
                      className="
                flex items-start justify-between gap-4
                cursor-pointer list-none select-none
                p-5 md:p-6 lg:p-7
              "
                    >
                      <div className="min-w-0">
                        <h3 className="text-lg md:text-xl font-semibold tracking-tight text-white">
                          {step.title}
                        </h3>
                        <p className="text-sm md:text-[15px] text-white/70 mt-1 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>

                      <span
                        className="
                  shrink-0 rounded-md border border-white/10
                  px-2 py-1 text-xs text-white/60
                  transition-transform duration-200
                  group-open:rotate-180
                "
                        aria-hidden="true"
                      >
                        ▼
                      </span>
                    </summary>

                    <div className="px-5 md:px-6 lg:px-7 pb-5 md:pb-6 lg:pb-7">
                      <ul className="pl-5 list-disc text-sm md:text-[15px] text-white/80 space-y-2">
                        {step.detail.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          );
        })()}

        {/* ===== PENUTUP — KUNJUNGI HASIL KARYA PROFESIONAL SAYA (SEJAJAR DGN SKILLS) ===== */}
        <section
          aria-labelledby="expertise"
          className="relative py-14 border-t border-white/10"
        >
          <div className="relative">
            <div className="text-center mb-10">
              <h2
                id="expertise"
                className="text-2xl md:text-3xl font-bold tracking-tight"
              >
                Kunjungi hasil karya profesional saya
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-[14px] md:text-[16px] text-white/70 leading-relaxed">
                Empat bidang utama yang saya tekuni. Setiap kartu mengarahkan
                langsung ke portfolio masing-masing bidang.
              </p>
            </div>

            {/* GRID 2 KOLOM — proporsional & sejajar dengan section skills */}
            <div className="grid gap-8 md:grid-cols-2 auto-rows-fr">
              {[
                {
                  title: "Website Development",
                  desc: "Situs yang cepat, stabil, dan mudah dirawat.",
                  href: "/portfolio/web",
                  points: [
                    "Struktur halaman efisien",
                    "Performa dan keamanan terjaga",
                    "Optimasi dasar pencarian",
                  ],
                },
                {
                  title: "UI UX Design",
                  desc: "Antarmuka intuitif dengan pengalaman konsisten.",
                  href: "/portfolio/ui-ux",
                  points: [
                    "Alur interaksi ringkas",
                    "Komponen seragam",
                    "Aksesibilitas terjamin",
                  ],
                },
                {
                  title: "Graphic Design",
                  desc: "Identitas visual yang kuat dan mudah dikenali.",
                  href: "/portfolio/graphic",
                  points: [
                    "Sistem identitas konsisten",
                    "Komposisi proporsional",
                    "Adaptasi lintas media",
                  ],
                },
                {
                  title: "Digital Marketing",
                  desc: "Strategi konten dan distribusi pesan yang efektif.",
                  href: "/portfolio/marketing",
                  points: [
                    "Konten terukur",
                    "Kanal tepat sasaran",
                    "Evaluasi berkelanjutan",
                  ],
                },
              ].map((card, idx) => (
                <article
                  key={idx}
                  className="
            flex flex-col justify-between h-full
            rounded-2xl border border-white/10
            bg-white/[0.02] backdrop-blur-sm
            hover:bg-white/[0.04] transition-colors
            p-6 md:p-8
          "
                >
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold tracking-tight text-white">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm md:text-[15px] text-white/70 leading-relaxed">
                      {card.desc}
                    </p>
                    <ul className="mt-4 list-disc pl-5 text-sm md:text-[15px] text-white/80 space-y-1.5">
                      {card.points.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <Link
                      href={card.href}
                      className="
                inline-flex items-center justify-center
                rounded-full border border-white/15
                bg-white/[0.03] px-5 py-2.5
                text-sm font-medium text-white
                hover:bg-white/[0.06]
                focus:outline-none focus:ring-2 focus:ring-white/20
              "
                      aria-label={`Lihat portfolio ${card.title}`}
                    >
                      Lihat portfolio
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ============== Komponen kecil ============== */
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] md:text-[12px] uppercase tracking-widest text-white/70">
      {children}
    </div>
  );
}

type ValueItemProps = {
  icon: ReactNode;
  title: string;
  desc: string;
  className?: string;
};
function ValueItem({ icon, title, desc, className }: ValueItemProps) {
  return (
    <li className="flex items-start gap-3">
      <div className="mt-1">{icon}</div>
      <div>
        <div className="font-semibold text-[15px] md:text-[17px]">{title}</div>
        <p
          className={cx(
            "text-white/70 leading-relaxed text-[14px] md:text-[16px]",
            className
          )}
        >
          {desc}
        </p>
      </div>
    </li>
  );
}

/* ===== Ringkasan Dampak card dengan meter animasi aman Lighthouse ===== */
function ImpactCard({
  title,
  detail,
  meterLabel,
  meterValue,
}: {
  title: string;
  detail: string;
  meterLabel: string;
  meterValue: number; // 0..100
}) {
  return (
    <FadeIn className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h4 className="text-base md:text-lg font-semibold">{title}</h4>
      <p className="mt-1.5 text-[14px] md:text-[16px] text-white/70">
        {detail}
      </p>
      <div className="mt-3">
        <div className="flex items-center justify-between text-[12px] text-white/70">
          <span>{meterLabel}</span>
          <span className="font-semibold text-white">{meterValue}%</span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-white/10 overflow-hidden">
          <motion.div
            initial={{ width: 0, opacity: 0.5 }}
            whileInView={{ width: `${meterValue}%`, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400"
          />
        </div>
      </div>
    </FadeIn>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <FadeIn className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
      <div className="text-2xl md:text-3xl font-extrabold">{number}</div>
      <div className="text-xs md:text-[13px] text-white/60">{label}</div>
    </FadeIn>
  );
}

function KVDigest({
  title,
  items,
}: {
  title: string;
  items: Array<[string, string]>;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-sm md:text-base font-extrabold mb-3">{title}</div>
      <dl className="grid grid-cols-2 gap-y-1 text-[12px] md:text-[13px] text-white/75">
        {items.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between">
            <dt>{k}</dt>
            <dd className="font-semibold text-white">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function CaseCard({
  tag,
  title,
  points,
}: {
  tag: string;
  title: string;
  points: string[];
}) {
  return (
    <FadeIn className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl will-change-transform">
      <div className="text-[11px] md:text-[12px] uppercase tracking-wider text-white/60">
        {tag}
      </div>
      <h3 className="mt-1 text-lg font-semibold">{title}</h3>
      <ul className="mt-2 space-y-1.5 text-[14px] md:text-[16px] text-white/75">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2">
            <CheckCircle2
              className="mt-0.5 h-4 w-4 text-brand-200"
              aria-hidden
            />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </FadeIn>
  );
}

function SkillCard({
  title,
  bullets,
  children,
}: {
  title: string;
  bullets: string[];
  children: ReactNode;
}) {
  return (
    <FadeIn className="group relative rounded-3xl bg-white/5 backdrop-blur-xl p-8 border border-white/10 hover:border-cyan-400/40 transition-all hover:-translate-y-0.5">
      <div className="relative">
        <h3 className="text-2xl md:text-[28px] font-bold mb-4 text-white tracking-tight">
          {title}
        </h3>

        {/* gunakan marker bawaan agar a11y & hydration stabil */}
        <ul className="mt-2 list-disc pl-5 marker:text-cyan-300 space-y-3 text-[14px] md:text-[15px] text-white/80 leading-relaxed">
          {bullets.map((text, i) => (
            <li key={`${title}-${i}`}>{text}</li>
          ))}
        </ul>

        <div className="mt-6 pt-4 border-t border-white/10">{children}</div>
      </div>
    </FadeIn>
  );
}

function LogosRow({
  logos,
  badges,
}: {
  logos: Array<[string, string]>;
  badges: string[];
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {logos.map(([name, src]) => (
          <Logo key={name} name={name} src={src} />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {badges.map((b) => (
          <Badge key={b}>{b}</Badge>
        ))}
      </div>
    </div>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[12px] md:text-[13px]">
      {children}
    </span>
  );
}

/* gunakan <img> agar tidak perlu remotePatterns */
function Logo({ name, src }: { name: string; src: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 pl-2 pr-3 py-1 text-[12px] md:text-[13px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        width={16}
        height={16}
        loading="lazy"
        decoding="async"
        className="inline-block"
      />
      {name}
    </span>
  );
}

function Step({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc: string;
}) {
  return (
    <FadeIn className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="mb-2 inline-flex items-center rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-[11px] md:text-[12px]">
        Langkah {num}
      </div>
      <h3 className="text-base md:text-lg font-semibold">{title}</h3>
      <p className="mt-1.5 text-[14px] md:text-[16px] text-white/70 leading-relaxed">
        {desc}
      </p>
    </FadeIn>
  );
}

/* ===== Motion helper agar ramah Lighthouse ===== */
function FadeIn({
  as,
  className,
  children,
  delay = 0,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  delay?: number;
}) {
  const shouldReduce = useReducedMotion();
  const Tag = (as || "div") as keyof typeof motion;
  const MotionTag = (motion as any)[Tag] ?? motion.div;

  // Always render the same element with the same className on SSR & client.
  // No initial inline styles => no attribute diffs during hydration.
  return (
    <MotionTag
      initial={false}
      whileInView={
        shouldReduce
          ? { opacity: 1, y: 0 } // still identical DOM; animation is effectively skipped
          : { opacity: 1, y: 0 } // target is the same; animation engine will do nothing on first paint
      }
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: shouldReduce ? 0 : 0.45, delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/* ===== Modal Request CV + Captcha lokal tanpa pihak eksternal ===== */
function RequestCvButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-2 text-sm font-medium hover:bg-white/10 transition"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        Request CV <ArrowRight className="h-4 w-4" aria-hidden />
      </button>
      {open && <CvModal onClose={() => setOpen(false)} />}
    </>
  );
}

function CvModal({ onClose }: { onClose: () => void }) {
  const id = useId();

  // kirim ke Server Action createCvRequest
  const initialState: { ok: string | null; error: string | null } = {
    ok: null,
    error: null,
  };
  const [state, formAction, pending] = useActionState(
    createCvRequest,
    initialState
  );

  // Captcha lokal: math + honeypot + time trap
  const openedAt = useMemo(() => Date.now(), []);
  const { a, b, op, answer } = useMemo(() => {
    const ops = ["+", "−"] as const;
    const a = Math.floor(6 + Math.random() * 7); // 6..12
    const b = Math.floor(2 + Math.random() * 7); // 2..8
    const op = ops[Math.random() > 0.5 ? 1 : 0];
    const answer = op === "+" ? a + b : a - b;
    return { a, b, op, answer };
  }, []);

  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState<string | null>(null);

  useEffect(() => {
    if (state.ok) {
      const t = setTimeout(onClose, 1200);
      return () => clearTimeout(t);
    }
  }, [state.ok, onClose]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const form = e.currentTarget as HTMLFormElement;
    const hp = (form.elements.namedItem("hp") as HTMLInputElement)?.value ?? "";
    const elapsed = Date.now() - openedAt;

    if (hp.trim() !== "") {
      e.preventDefault();
      setCaptchaError("Terjadi kesalahan. Silakan coba lagi.");
      return;
    }
    if (elapsed < 2500) {
      e.preventDefault();
      setCaptchaError(
        "Form terlalu cepat dikirim. Coba lagi dalam beberapa detik."
      );
      return;
    }
    if (parseInt(captchaInput, 10) !== answer) {
      e.preventDefault();
      setCaptchaError("Jawaban captcha tidak sesuai.");
      return;
    }
    setCaptchaError(null);
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <button
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Tutup modal"
      />
      <div
        role="dialog"
        aria-labelledby={`${id}-title`}
        aria-modal="true"
        className="relative z-10 w-full max-w-lg rounded-2xl border border-white/10 bg-deep-900 p-6 shadow-2xl"
      >
        <h3 id={`${id}-title`} className="text-xl md:text-2xl font-semibold">
          Request CV
        </h3>

        <form
          action={formAction}
          className="mt-4 space-y-4"
          noValidate
          onSubmit={handleSubmit}
        >
          {/* honeypot */}
          <div className="sr-only" aria-hidden>
            <label>
              Jangan diisi
              <input name="hp" type="text" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          {/* time trap */}
          <input type="hidden" name="openedAt" value={String(openedAt)} />

          <Field label="Nama Lengkap" name="fullName" required />
          <Field label="Email" name="email" type="email" required />
          <Field label="Perusahaan atau Organisasi (opsional)" name="company" />
          <TextareaField label="Pesan (opsional)" name="message" />

          {/* Captcha */}
          <div className="grid gap-1">
            <label className="text-sm md:text-[15px] text-white/80">
              Verifikasi
            </label>
            <div className="flex items-center gap-2">
              <span className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm md:text-[15px]">
                {a} {op} {b} = ?
              </span>
              <input
                inputMode="numeric"
                pattern="[0-9]*"
                name="captchaAnswer"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className="flex-1 rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm md:text-[15px] outline-none focus:border-white/40"
                aria-describedby={`${id}-capdesc`}
                required
              />
              <input
                type="hidden"
                name="captchaQuestion"
                value={`${a}${op}${b}`}
              />
            </div>
            <p
              id={`${id}-capdesc`}
              className="text-[12px] md:text-[13px] text-white/60"
            >
              Jawab operasi di atas untuk mengirim permintaan.
            </p>
            <p aria-live="polite" className="text-sm text-rose-400">
              {captchaError}
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/25 px-4 py-2 text-sm hover:bg-white/10"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={pending}
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black shadow disabled:opacity-60"
            >
              {pending ? "Mengirim…" : "Kirim"}
            </button>
          </div>

          {state.error && (
            <p className="text-sm text-rose-400">{state.error}</p>
          )}
          {state.ok && (
            <p className="text-sm text-emerald-300">
              {state.ok ||
                "Terima kasih. Verifikasi akan dikirim melalui email sebelum CV PDF dikirim."}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="grid gap-1">
      <label className="text-sm md:text-[15px] text-white/80">
        {label} {required && <span className="text-rose-400">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm md:text-[15px] outline-none focus:border-white/40"
      />
    </div>
  );
}

function TextareaField({ label, name }: { label: string; name: string }) {
  return (
    <div className="grid gap-1">
      <label className="text-sm md:text-[15px] text-white/80">{label}</label>
      <textarea
        name={name}
        rows={3}
        className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm md:text-[15px] outline-none focus:border-white/40"
      />
    </div>
  );
}

/* ===== Links ===== */
function PrimaryLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-full bg-white px-6 py-2 text-sm md:text-[15px] font-semibold text-black shadow hover:opacity-90 transition"
    >
      {children}
    </Link>
  );
}
function GhostLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-full border border-white/25 px-6 py-2 text-sm md:text-[15px] font-medium hover:bg-white/10 transition"
    >
      {children}
    </Link>
  );
}

/* ===== Structured Data: BreadcrumbList (client safe) ===== */
function StructuredBreadcrumbJSONLD() {
  if (typeof window === "undefined") return null;
  const origin = location.origin;
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: `${origin}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tentang",
        item: `${origin}/about`,
      },
    ],
  };
  return (
    <Script
      id="ld-breadcrumb"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
