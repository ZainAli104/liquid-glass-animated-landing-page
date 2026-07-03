import { ArrowUpRight } from "./Icons";

const NAV_LINKS = ["Home", "About", "Skills", "Work", "Contact"];

export function Navbar() {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-8 lg:px-16 flex items-center justify-between">
      {/* Logo */}
      <a
        href="#"
        className="liquid-glass rounded-full w-12 h-12 flex items-center justify-center shrink-0"
      >
        <span className="font-heading italic text-white text-2xl leading-none">z</span>
      </a>

      {/* Center pill (desktop only) */}
      <div className="hidden md:flex items-center liquid-glass rounded-full px-1.5 py-1.5">
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            className="px-3 py-2 text-sm font-medium text-white/90 font-body"
          >
            {link}
          </a>
        ))}
        <button className="bg-white text-black rounded-full px-4 py-2 text-sm font-medium font-body whitespace-nowrap flex items-center gap-1 ml-1">
          Contact Me
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>

      {/* Invisible spacer to balance the logo */}
      <div className="w-12 h-12 invisible shrink-0" />
    </nav>
  );
}
