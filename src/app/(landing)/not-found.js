import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="max-w-4xl mx-auto px-5 sm:px-6 md:px-8 pt-32 pb-24 text-center">
      <h1 className="font-heading text-3xl font-bold text-ink mb-4">404</h1>
      <p className="text-muted">Page not found.</p>
      <Link href="/" className="inline-block mt-6 text-sm text-terracotta hover:underline">
        Back home
      </Link>
    </main>
  );
}
