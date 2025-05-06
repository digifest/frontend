'use client';

import { navLinks } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="container flex items-center justify-between gap-5 p-5">
        <div>
          <Link href={'/'}>
            <Image src={'/svgs/logo.svg'} width={100} alt="logo" height={50} />
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
          <button className="py-3 px-4">Login</button>
          <button className="bg-primary text-white px-8 py-3 rounded-sm">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
