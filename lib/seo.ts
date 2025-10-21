// lib/seo.ts
export function makeMeta({
  title,
  desc,
  url,
  image,
}: {
  title: string;
  desc: string;
  url: string;
  image?: string;
}) {
  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      url,
      images: [{ url: image || "/og.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [image || "/og.png"],
    },
  };
}
