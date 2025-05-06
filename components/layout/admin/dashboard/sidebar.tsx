'use client';

import { sidebarLinks } from '@/lib/data/sidebar';
import { signOut } from '@/lib/services/admin/auth.service';
import { useSidebar } from '@/lib/store/global.store';
import { cn } from '@/lib/utils/cn';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LuLogOut } from 'react-icons/lu';

const DashboardSidebar = () => {
	const pathname = usePathname();
	const { isSidebarOpen } = useSidebar();
	const { mutateAsync: triggerSignOut, isPending: _signingOut } = useMutation({
		mutationKey: ['admin-signOut'],
		mutationFn: signOut,
	});

	return (
		<aside
			className={`max-h-screen p-[9.5px] relative duration-300 overflow-y-auto ${
				isSidebarOpen ? 'w-[285px]' : 'w-[55px]'
			} border-r border-gray-300 scrollbar-none bg-primary`}>
			<ul className="space-y-8 mt-2">
				{sidebarLinks.map((link, index) => {
					const is_current_route = pathname.startsWith(link.href);

					return (
						<Link
							href={link?.href}
							className={cn(
								'flex gap-2 px-2 py-3 rounded-md border-l-4 items-center cursor-pointer border-transparent hover:border-secondary hover:bg-secondary/5 transition-all duration-300 text-[.9rem]',
								is_current_route && 'border-secondary bg-secondary/5 text-secondary font-bold'
							)}
							key={index}>
							<span className={cn('text-[1.1rem]', is_current_route ? 'text-secondary' : '')}>{link.icon}</span>

							{isSidebarOpen && link.name}
						</Link>
					);
				})}

				<li
					className={cn(
						'py-3 px-2 text-[.9rem] flex items-center gap-2 hover:text-secondary hover:font-bold cursor-pointer duration-200',
						false && 'text-secondary font-bold animate-pulse'
					)}
					onClick={async () => await triggerSignOut()}>
					<LuLogOut />
					{isSidebarOpen && <span>Sign Out</span>}
				</li>
			</ul>
		</aside>
	);
};

export default DashboardSidebar;
