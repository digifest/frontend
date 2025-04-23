"use client";

import { navLinks } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <div className="container flex items-center justify-between gap-5 p-5">
        <div>
          <Link href={"/"}>
            <Image src={"/svgs/logo.svg"} width={100} alt="logo" height={50} />
          </Link>
        </div>

        <div className="flex items-center gap-10">
          {navLinks.map((link) => {
            return (
              <Link
                key={link.name}
                href={link.link}
                className="flex items-center gap-2 uppercase text-sm text-gray-600"
              >
                {link.icon}
                <span className="tracking-widest">{link.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-5">
          <button>Login</button>
          <button className="bg-primary text-white px-4 py-2 rounded-xl">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
