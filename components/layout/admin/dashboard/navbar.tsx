'use client';
import { sidebarLinks } from '@/lib/data/sidebar';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BiBell } from 'react-icons/bi';

const DashboardNavbar = () => {
	const [page, setPage] = useState<string>('');
	const pathname = usePathname();

	useEffect(() => {
		const currentPage = sidebarLinks.find((link) => pathname.startsWith(link.href))?.name;
		setPage(currentPage || '');
	}, [pathname]);

	return (
		<nav className="flex items-center justify-between pt-5 px-5 md:pt-6 md:px-6">
			<h1 className="text-[1rem] md:text-[1.5rem] uppercase font-bold">{page}</h1>

			<BiBell size={25} cursor={'pointer'} className="hidden md:block" />
		</nav>
	);
};

export default DashboardNavbar;
