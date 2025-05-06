'use client';
import Button from '@/components/common/button';
import TextField, {
  PasswordTextField,
} from '@/components/common/inputs/text-field';
import WavingHand from '@/components/common/waving-hand';
import AuthLayout from '@/components/layout/auth/auth-layout';
import { loginUser } from '@/lib/services/auth.service';
import { LoginType } from '@/lib/types/auth';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { toast } from 'sonner';

const LoginPage = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<LoginType>({
    defaultValues: {
      role: 'User',
    },
  });

  const { mutateAsync: _signIn, isPending: _signingIn } = useMutation({
    mutationKey: ['auth', 'sign-in'],
    mutationFn: loginUser,
    onSuccess() {
      toast.success('Signed in successfully');
      router.push('documents');
    },
  });

  const submit = (e: LoginType) => _signIn(e);

  return (
    <AuthLayout>
      <>
        <h1 className="text-xl md:text-[2.5rem] font-bold">
          Hi, FUNAABite <WavingHand />
        </h1>
        <p className="text-sm text-gray-400">
          Login to get full and personalized access to documents on digifest.
        </p>

        <form className="mt-16 space-y-8" onSubmit={handleSubmit(submit)}>
          <TextField
            label="Email address/Phone Number"
            InputProps={{
              placeholder: 'e.g adejaredaniel12@gmail.com or 08023720580',
              ...register('credential', {
                required: {
                  value: true,
                  message: 'This field is required',
                },
              }),
            }}
            helperText={errors?.credential?.message}
          />

          <PasswordTextField
            label="Password"
            InputProps={{
              ...register('password', {
                required: {
                  value: true,
                  message: 'This field is required',
                },
              }),
            }}
            helperText={errors?.password?.message}
          />

          <Button
            loading={_signingIn}
            fullWidth
            variant="filled"
            size="medium"
            className="mt-8"
          >
            <>Submit</>
          </Button>
        </form>

        <div className="flex items-center space-between gap-8">
          <p className="max-w-fit text-[.9rem] mt-3">
            Do not have an account?{' '}
            <Link href="/sign-up" className="text-primary">
              Sign up
            </Link>
          </p>

          <Link
            href="/forgot-password"
            className="max-w-fit ml-auto text-[.9rem] text-primary mt-3"
          >
            Forgot Password?
          </Link>
        </div>
      </>
    </AuthLayout>
  );
};

export default LoginPage;
