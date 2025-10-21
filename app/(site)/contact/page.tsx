export default function ContactPage() {
  return (
    <section className="max-w-xl space-y-3">
      <h1 className="text-2xl font-semibold">Contact</h1>
      <p className="opacity-80">
        Email:{" "}
        <a className="underline" href="mailto:hello@yourdomain.com">
          hello@yourdomain.com
        </a>
      </p>
    </section>
  );
}
