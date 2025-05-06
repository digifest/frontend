'use client';
import { LoginType } from '@/lib/types/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaEyeSlash, FaRegEye } from 'react-icons/fa';
import { toast } from 'sonner';
import { EMAIL_REGEX } from '@/lib/utils/regex';
import { useMutation } from '@tanstack/react-query';
import { signIn } from '@/lib/services/admin/auth.service';
import { RoleNames } from '@/lib/enums';
import AuthLayout from '@/components/layout/auth/auth-layout';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/store/auth.store';

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginType>();
	const { setToken, fetchUser } = useAuth();
	const [showPassword, setShowPassword] = useState(false);

	const togglePassword = () => setShowPassword((prev) => !prev);

	const router = useRouter();

	const { mutateAsync: _signIn, isPending: _signingIn } = useMutation({
		mutationKey: ['admin-signIn'],
		mutationFn: signIn,
		onSuccess() {
			toast.success('Login successful!');
			router.push('/admin/dashboard');
		},
	});

	const submit: SubmitHandler<LoginType> = async (e: LoginType) => {
		const data = await _signIn({
			credential: e.credential,
			password: e.password,
			role: RoleNames.Admin,
		});
		setToken(data?.access_token as string);
		// fetchUser();
	};

	return (
		<AuthLayout>
			<div className="space-y-8 max-w-3xl">
				<h1 className="text-4xl font-bold">Welcome Back!</h1>
				<p className="text-gray-400 text-sm">Enter your credentials to access your account</p>

				<form onSubmit={handleSubmit(submit)}>
					<div className="space-y-5">
						<div className="space-y-2">
							<label className="text-sm" htmlFor="email">
								Email address
							</label>
							<input
								type="email"
								className={`w-full bg-transparent duration-200 focus:ring ring-gray-200 p-4 rounded-lg border  ${
									errors.credential ? 'border-red-500' : 'border-gray-200'
								}`}
								placeholder="Enter your email address"
								{...register('credential', {
									required: true,
									pattern: {
										value: EMAIL_REGEX,
										message: 'Invalid email address',
									},
								})}
							/>
						</div>
						<div className="select-none space-y-2">
							<label className="text-sm" htmlFor="email">
								Password
							</label>
							<div
								className={`flex items-center rounded-lg focus-within:ring ring-gray-200 px-4 border ${
									errors?.password ? 'border-red-500' : 'border-gray-200'
								} duration-300`}>
								<input
									type={showPassword ? 'text' : 'password'}
									className="w-full bg-transparent py-4 focus:border-none outline-none"
									placeholder="Enter your password"
									{...register('password', {
										required: true,
										minLength: 8,
									})}
								/>

								<div onClick={togglePassword} className="cursor-pointer text-gray-400">
									{!showPassword ? <FaRegEye /> : <FaEyeSlash />}
								</div>
							</div>
						</div>

						<button
							type="submit"
							className="bg-black text-white hover:text-white hover:bg-primary duration-300 w-full rounded-md py-3 disabled:bg-black disabled:text-white">
							{!_signingIn ? 'Login' : 'Signing In...'}
						</button>
					</div>
				</form>

				{/* <Link href="/forgot-password" className="text-gray-400 hover:text-primary duration-200">
							Forgot password?{' '}
						</Link> */}
			</div>
		</AuthLayout>
	);
};

export default Login;
