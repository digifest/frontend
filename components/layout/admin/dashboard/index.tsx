'use client';
import React, { FC, ReactNode } from 'react';
import DashboardSidebar from './sidebar';
import { useRouter } from 'next/navigation';
import DashboardNavbar from './navbar';
import SessionCheckLoader from '@/components/common/loaders/session-check';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/lib/services/admin/auth.service';

interface Props {
	children: ReactNode;
}

const DashboardLayout: FC<Props> = ({ children }) => {
	const router = useRouter();
	const { data: user, isPending } = useQuery({
		queryKey: ['getUserInfo'],
		queryFn: () => () => getUserInfo(),
	});

	if (isPending) {
		return <SessionCheckLoader />;
	}

	if (!user) {
		router.push('/admin/login');
	}

	return (
		<main className="flex bg-gray-100 min-h-screen">
			<DashboardSidebar />
			<div className="w-full flex-1 max-h-screen h-screen flex flex-col">
				<DashboardNavbar />
				<div className="flex-1 overflow-y-scroll px-4 md:px-6 pb-6">{children}</div>
			</div>
		</main>
	);
};

export default DashboardLayout;
