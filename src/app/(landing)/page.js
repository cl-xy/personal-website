import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <h1 className="font-mono text-lg text-[#e2e8f0] mb-1">Xinyi Lu</h1>
        <p className="font-mono text-sm text-[#6b7280] mb-10">AI Engineer · Singapore</p>

        <nav className="space-y-4">
          <Link
            href="/agent-trace"
            className="block p-4 border border-[#262c36] rounded hover:border-[#5eaeff]/40 transition-colors group"
          >
            <span className="font-mono text-sm text-[#5eaeff] group-hover:text-[#5eaeff]">agent-trace</span>
            <p className="text-xs text-[#6b7280] mt-1">Terminal-style evaluation trace</p>
          </Link>

          <Link
            href="/evidence-atlas"
            className="block p-4 border border-[#262c36] rounded hover:border-[#0ff5e8]/40 transition-colors group"
          >
            <span className="font-mono text-sm text-[#0ff5e8] group-hover:text-[#0ff5e8]">evidence-atlas</span>
            <p className="text-xs text-[#6b7280] mt-1">Living greenhouse organism map</p>
          </Link>

          <Link
            href="/case-file"
            className="block p-4 border border-[#262c36] rounded hover:border-[#b8860b]/40 transition-colors group"
          >
            <span className="font-mono text-sm text-[#b8860b] group-hover:text-[#b8860b]">case-file</span>
            <p className="text-xs text-[#6b7280] mt-1">Workshop bench with artifacts</p>
          </Link>
        </nav>
      </div>
    </main>
  );
}
