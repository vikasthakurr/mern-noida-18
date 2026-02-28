import React from "react";
const Navbar = () => {
  const links = ["Home", "Cart", "Profile", "Login", "Signup"];

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a
          href="#"
          className="text-2xl font-extrabold tracking-tight text-slate-900"
        >
          GeeksKart
        </a>first_name

        <ul className="flex items-center gap-2 sm:gap-4">
          {links.map((link) => (
            <li key={link}>
              <a
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
