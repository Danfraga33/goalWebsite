import { Link } from "@remix-run/react";
import React from "react";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <header className="dark: w-full border-b bg-white px-4 py-6 dark:bg-black sm:px-6 lg:px-8">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">
          FocusForge
        </Link>
        <nav className="hidden space-x-8 md:flex">
          <Link
            to="#features"
            className="text-gray-600 transition-colors hover:text-primary dark:text-white"
          >
            Features
          </Link>
          <Link
            to="#testimonials"
            className="text-gray-600 transition-colors hover:text-primary dark:text-white"
          >
            Testimonials
          </Link>
          <Link
            to="#pricing"
            className="text-gray-600 transition-colors hover:text-primary dark:text-white"
          >
            Pricing
          </Link>
        </nav>
        <div className="flex items-center justify-center gap-2">
          <ModeToggle />
          <Link
            to="/Dashboard"
            className="rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90 dark:text-black"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
