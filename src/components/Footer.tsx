export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-6 px-6 md:px-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
        <span>&copy; {new Date().getFullYear()} Clevermation</span>
        <div className="flex gap-6">
          <a
            href="https://clevermation.com/datenschutz.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Datenschutz
          </a>
          <a
            href="https://clevermation.com/impressum.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Impressum
          </a>
        </div>
      </div>
    </footer>
  );
}
