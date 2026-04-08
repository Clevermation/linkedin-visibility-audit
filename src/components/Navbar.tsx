import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 md:px-12 py-6 relative z-10">
      <Image
        src="/clevermation-logo.png"
        alt="Clevermation"
        width={160}
        height={36}
        className="h-7 w-auto opacity-90"
      />
      <div className="hidden md:flex items-center gap-8">
        <a
          href="#so-funktionierts"
          className="text-sm font-medium text-gray hover:text-white transition-colors"
        >
          So funktioniert&apos;s
        </a>
        <a
          href="#faq"
          className="text-sm font-medium text-gray hover:text-white transition-colors"
        >
          FAQ
        </a>
      </div>
    </nav>
  );
}
