import Login from '@/components/ui/admin/account/login';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Login',
	description: 'Login to your administrative account.',
};

const Page = () => <Login />;

export default Page;
