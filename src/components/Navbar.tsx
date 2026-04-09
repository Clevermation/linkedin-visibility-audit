import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-4 md:px-6 lg:px-12 py-4 md:py-6 relative z-10">
      <Image
        src="/clevermation-logo.png"
        alt="Clevermation"
        width={160}
        height={36}
        className="h-6 md:h-7 w-auto opacity-90"
      />
      <div className="hidden md:flex items-center gap-8" />
    </nav>
  );
}
