import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "admin@local" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@local",
      password: await hash("admin123", 10),
      role: "ADMIN",
    },
  });

  // hapus sebelumnya agar idempotent saat dev
  await prisma.project.deleteMany();

  await prisma.project.create({
    data: {
      title: "Quantum NFT Project",
      slug: "quantum-nft-project",
      description: "Experimental NFT-style interactive portfolio piece.",
      content: "<p>Showcasing neon/glassmorphism + animations.</p>",

      // IMPORTANT: sertakan kata kunci kategori + variasi framework yang dikenali
      tags: ["programming", "threejs", "next.js", "nft"],

      // simpan thumbnail di kolom images (JSON)
      images: ["https://images.unsplash.com/photo-1526378722484-bd91ca387e72"],

      published: true,
    },
  });

  console.log("✅ seed selesai");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
