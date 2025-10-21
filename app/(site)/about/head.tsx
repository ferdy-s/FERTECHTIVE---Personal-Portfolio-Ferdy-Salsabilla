// app/about/head.tsx
export default function Head() {
  const title = "Tentang Fertechtive — Profil, Keahlian, dan Proyek";
  const description =
    "Fertechtive adalah identitas personal Ferdy Salsabilla: Web Developer dan UI/UX Designer berpengalaman 3+ tahun. Portofolio website development, UI UX, graphic design, dan digital marketing yang berfokus pada performa, aksesibilitas, serta hasil terukur.";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href="https://fertechtive.com/about" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://fertechtive.com/about" />
    </>
  );
}
