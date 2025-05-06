'use client';
import Button from '@/components/common/button';
import TextField, {
  PasswordTextField,
} from '@/components/common/inputs/text-field';
import SelectCollege from '@/components/common/select-fields/select-college';
import SelectDepartment from '@/components/common/select-fields/select-department';
import WavingHand from '@/components/common/waving-hand';
import AuthLayout from '@/components/layout/auth/auth-layout';
import {
  getColleges,
  getDepartmentsForCollege,
} from '@/lib/services/academics.service';
import { signUpUser } from '@/lib/services/auth.service';
import { SignUp } from '@/lib/types/auth';
import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const SignUpPage = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SignUp>({});

  const [college, department] = watch(['college', 'department']);

  const { data: colleges, isLoading: collegesLoading } = useQuery({
    queryKey: ['colleges'],
    queryFn: getColleges,
  });

  const { data: departments, isLoading: departmentsLoading } = useQuery({
    queryKey: ['colleges', college?._id, 'departments'],
    queryFn: () => getDepartmentsForCollege(college?._id),
    enabled: !!college,
  });

  const { mutateAsync: _signUp, isPending: _loading } = useMutation({
    mutationKey: ['auth', 'sign-up'],
    mutationFn: signUpUser,
    onSuccess() {
      toast.success('Signed up successfully');
      router.push('/search');
    },
  });

  const submit = (e: SignUp) => {
    console.log(e);
    if (!college) {
      return setError('college', { message: 'This field is required' });
    }
    if (!department) {
      return setError('department', { message: 'This field is required' });
    }
    _signUp(e);
  };

  return (
    <AuthLayout>
      <>
        <h1 className="text-xl md:text-[2.5rem] font-bold">
          Hi, FUNAABite <WavingHand />
        </h1>
        <p className="text-sm text-gray-400">
          Create your digifest account to get full and personalized access{' '}
          <br /> to notes and past questions.
        </p>

        <form
          onSubmit={handleSubmit(submit)}
          className="mt-8 md:mt-16 space-y-8 md:grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <TextField
            label="First Name"
            InputProps={{
              placeholder: 'e.g Daniel',
              ...register('firstName', {
                required: {
                  value: true,
                  message: 'This field is required',
                },
              }),
            }}
            helperText={errors?.firstName?.message}
          />

          <TextField
            label="Last Name"
            InputProps={{
              placeholder: 'e.g Adejare',
              ...register('lastName', {
                required: {
                  value: true,
                  message: 'This field is required',
                },
              }),
            }}
            helperText={errors?.lastName?.message}
          />

          <TextField
            label="Email Address"
            InputProps={{
              placeholder: 'e.g adejaredaniel@gmail.com',
              type: 'email',
              ...register('email', {
                required: {
                  value: true,
                  message: 'This field is required',
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Enter a valid email address',
                },
              }),
            }}
            helperText={errors?.email?.message}
          />

          <TextField
            label="Phone number"
            InputProps={{
              placeholder: 'e.g 08023720580',
              type: 'tel',
              ...register('phoneNumber', {
                required: {
                  value: true,
                  message: 'This field is required',
                },
                pattern: {
                  value: /^\+?[0-9,]+$/,
                  message: 'Enter a valid phone number',
                },
              }),
            }}
            helperText={errors?.phoneNumber?.message}
          />

          <SelectCollege
            colleges={colleges ?? []}
            onSelect={(college) => {
              setValue('college', college!);
              setValue('department', undefined!);
              clearErrors('college');
            }}
            selected={college}
            loading={collegesLoading}
            label="College"
            placeholder="Select college"
            helperText={errors?.college?.message}
          />

          <SelectDepartment
            data={!college ? [] : departments ?? []}
            onSelect={(department) => {
              setValue('department', department!);
              clearErrors('department');
            }}
            selected={department}
            loading={collegesLoading || departmentsLoading}
            label="Departments"
            placeholder={
              !college ? 'Select college first' : 'Select department'
            }
            helperText={errors?.department?.message}
          />

          <PasswordTextField
            className="col-span-2"
            label="Password"
            InputProps={{
              ...register('password', {
                required: {
                  value: true,
                  message: 'This field is required',
                },
                minLength: {
                  value: 8,
                  message: 'Password must not be less than 8 characters',
                },
              }),
            }}
            helperText={errors?.password?.message}
          />

          <Button
            fullWidth
            variant="filled"
            size="medium"
            className="col-span-2"
            loading={_loading}
          >
            Sign Up
          </Button>
        </form>

        <p className="max-w-fit text-[.9rem] mt-3">
          Alright have an account?{' '}
          <Link href="/login" className="text-primary">
            Log in
          </Link>
        </p>
      </>
    </AuthLayout>
  );
};

export default SignUpPage;
