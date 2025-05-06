'use client';

import { sidebarLinks } from '@/lib/data/sidebar';
import { signOut } from '@/lib/services/admin/auth.service';
import { useSidebar } from '@/lib/store/global.store';
import { cn } from '@/lib/utils/cn';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LuLogOut, LuMenu } from 'react-icons/lu';
import { MdClose } from 'react-icons/md';
import { toast } from 'sonner';

const DashboardSidebar = () => {
	const router = useRouter();
	const pathname = usePathname();
	const { isSidebarOpen, toggleSidebar } = useSidebar();
	const { mutateAsync: triggerSignOut, isPending: _signingOut } = useMutation({
		mutationKey: ['admin-signOut'],
		mutationFn: signOut,
		onSuccess: () => {
			toast.success('Logged out succesfully');
			router.push('/admin/login');
		},
	});

	return (
		<>
			{/* Mobile Menu Button */}
			<button
				onClick={toggleSidebar}
				className="lg:hidden fixed top-3 right-4 z-50 p-2 rounded-md bg-primary text-white">
				{isSidebarOpen ? <MdClose size={24} /> : <LuMenu size={24} />}
			</button>

			{/* Overlay for mobile */}
			{isSidebarOpen && (
				<div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={toggleSidebar} />
			)}

			{/* Sidebar */}
			<aside
				className={cn(
					'fixed lg:static top-0 left-0 h-screen z-40 p-[9.5px]',
					'duration-300 overflow-y-auto bg-primary',
					'lg:w-[285px] lg:translate-x-0',
					isSidebarOpen ? 'w-[285px] translate-x-0' : 'w-[55px] -translate-x-full lg:translate-x-0',
					'border-r border-gray-300 scrollbar-none'
				)}>
				{/* Logo or Header */}
				{isSidebarOpen && (
					<div className="h-16 flex items-center justify-center border-b border-gray-300 mb-4">
						<Image src={'/svgs/logo.svg'} width={100} alt="logo" height={50} />
					</div>
				)}

				{/* Navigation Links */}
				<ul className="space-y-8">
					{sidebarLinks.map((link, index) => {
						const is_current_route = pathname.startsWith(link.href);

						return (
							<Link
								href={link?.href}
								className={cn(
									'flex gap-2 px-2 py-3 rounded-md border-l-4',
									'items-center cursor-pointer border-transparent',
									'hover:border-secondary hover:bg-secondary/5',
									'transition-all duration-300 text-[.9rem]',
									'text-white',
									is_current_route && 'border-secondary bg-secondary/5 text-secondary font-bold'
								)}
								key={index}
								onClick={() => {
									if (window.innerWidth < 1024) {
										toggleSidebar();
									}
								}}>
								<span className={cn('text-[1.1rem]', is_current_route ? 'text-secondary' : '')}>{link.icon}</span>

								{isSidebarOpen && link.name}
							</Link>
						);
					})}

					{/* Sign Out Button */}
					<li
						className={cn(
							'py-3 px-2 text-[.9rem] flex items-center gap-2',
							'hover:text-secondary hover:font-bold cursor-pointer duration-200',
							'text-white',
							_signingOut && 'text-secondary font-bold animate-pulse'
						)}
						onClick={async () => await triggerSignOut()}>
						<LuLogOut />
						{isSidebarOpen && <span>Sign Out</span>}
					</li>
				</ul>
			</aside>
		</>
	);
};

export default DashboardSidebar;
