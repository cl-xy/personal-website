import Link from "next/link";

export default function Navbar() {
    return (
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="space-x-8">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <Link href="/about" className="hover:text-blue-600">About</Link>
              <Link href="/projects" className="hover:text-blue-600">Projects</Link>
              <Link href="/resume" className="hover:text-blue-600">Resume</Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }