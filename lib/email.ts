import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
});

export async function sendVerificationEmail(to: string, token: string) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/cv/verify?token=${encodeURIComponent(token)}`;
  await transporter.sendMail({
    from: process.env.MAIL_FROM || "noreply@yourdomain",
    to,
    subject: "Verify your email to receive CV",
    html: `<p>Click to verify:</p><p><a href="${url}">${url}</a></p>`,
  });
}

export async function sendCvEmail(to: string, pdfBuffer: Buffer) {
  await transporter.sendMail({
    from: process.env.MAIL_FROM || "noreply@yourdomain",
    to,
    subject: "Your requested CV",
    text: "Attached is your CV.",
    attachments: [{ filename: "CV.pdf", content: pdfBuffer }],
  });
}
