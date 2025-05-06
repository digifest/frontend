'use client';
import { LoginType } from '@/lib/types/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaEyeSlash, FaRegEye } from 'react-icons/fa';
import { toast } from 'sonner';
import { EMAIL_REGEX } from '@/lib/utils/regex';
import { useMutation } from '@tanstack/react-query';
import { signIn } from '@/lib/services/admin/auth.service';
import { RoleNames } from '@/lib/enums';

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginType>();
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

	const submit: SubmitHandler<LoginType> = async (data) => {
		await _signIn({ credentials: data.credential, password: data.password, role: RoleNames.Admin });
	};

	return (
		<main className="py-4 px-12 h-screen flex items-center min-w-screen relative overflow-y-auto scrollbar-none">
			<div className="w-full h-full flex justify-between items-center gap-8 rounded-xl border-2 border-gray-200">
				<div className="w-full h-full bg-gray-100 pt-0 p-8 flex flex-col justify-center">
					<Link href={'/'}>
						<Image src={'/svgs/logo.svg'} width={100} alt="logo" height={50} />
					</Link>
					<h1 className="text-4xl font-bold mt-8 mb-4">Document Management System</h1>
					<p className="text-gray-400 text-sm">
						Securely manage, access, and collaborate on university documents from anywhere.
					</p>
					<div className="grid grid-cols-3 gap-4 mt-10">
						<div className="w-full h-[50px] bg-gray-200 border-2 border-gray-300 rounded-md"></div>
						<div className="w-full h-[50px] bg-gray-200 border-2 border-gray-300 rounded-md"></div>
						<div className="w-full h-[50px] bg-gray-200 border-2 border-gray-300 rounded-md"></div>
					</div>
					<div className="grid grid-cols-3 gap-4 mt-4">
						<div className="w-full h-[50px] bg-gray-200 border-2 border-gray-300 rounded-md"></div>
						<div className="w-full h-[50px] bg-gray-200 border-2 border-gray-300 rounded-md"></div>
						<div className="w-full h-[50px] bg-gray-200 border-2 border-gray-300 rounded-md"></div>
					</div>
					<div className="grid grid-cols-3 gap-4 mt-4">
						<div className="w-full h-[50px] bg-gray-200 border-2 border-gray-300 rounded-md"></div>
						<div className="w-full h-[50px] bg-gray-200 border-2 border-gray-300 rounded-md"></div>
						<div className="w-full h-[50px] bg-gray-200 border-2 border-gray-300 rounded-md"></div>
					</div>
				</div>

				<div className="w-full h-full pt-2 p-8 flex flex-col justify-center">
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

								<button className="bg-black text-white hover:text-white hover:bg-primary duration-300 w-full rounded-md py-3 disabled:bg-black disabled:text-white">
									{!_signingIn ? 'Login' : 'Signing In...'}
								</button>
							</div>
						</form>

						{/* <Link href="/forgot-password" className="text-gray-400 hover:text-primary duration-200">
							Forgot password?{' '}
						</Link> */}
					</div>
				</div>
			</div>
		</main>
	);
};

export default Login;
