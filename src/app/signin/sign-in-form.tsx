'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Checkbox } from '@/components/ui/checkbox';
import { Password } from '@/components/ui/password';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/utils/validators/login.schema';

const initialValues: LoginSchema = {
  email: 'admin@admin.com',
  password: 'admin',
  rememberMe: true,
};

const API_ENDPOINT = 'https://twdtracker.com/api/users/signin';

export default function SignInForm() {
  //TODO: why we need to reset it here
  const [reset, setReset] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // const onSubmit: SubmitHandler<LoginSchema> = (data) => {
  //   console.log(data);
  //   signIn('credentials', {
  //     ...data,
  //   });
  // };

  const getErrorMessage = (error: any): string => {
    if (axios.isAxiosError(error)) {
      // Network errors
      if (!error.response) {
        if (!navigator.onLine) {
          return 'No internet connection. Please check your network.';
        }
        return 'Network error. Please try again later.';
      }

      // Server errors
      switch (error.response.status) {
        case 401:
          return 'Incorrect email or password. Please try again.';
        case 403:
          return 'Account is locked. Please contact support.';
        case 404:
          return 'Account not found. Please check your credentials.';
        case 429:
          return 'Too many attempts. Please try again later.';
        case 500:
          return 'Server error. Please try again later.';
        default:
          return error.response.data?.message || 'An unexpected error occurred. Please try again.';
      }
    }

    // Timeout error
    if (error.code === 'ECONNABORTED') {
      return 'Request timed out. Please check your internet connection.';
    }

    return 'An unexpected error occurred. Please try again.';
  };

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(API_ENDPOINT, {
        email: data.email,
        password: data.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      });

      console.log("Response is:", response);

      if (response.data) {
        await signIn('credentials', {
          ...data,
          token: response.data.token,
          callbackUrl: '/'  // Simplify this for now
        });
      }
    } catch (error) {
      console.log("Error:", error);
      const errorMessage = getErrorMessage(error);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="email"
              size="lg"
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm bg-white border border-gray-300"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm bg-white border border-gray-300"
              {...register('password')}
              error={errors.password?.message}
            />
            <div className="flex items-center justify-between pb-2">
              <Checkbox
                {...register('rememberMe')}
                label="Remember Me"
                className="[&>label>span]:font-medium"
              />
              <Link
                href={routes.auth.forgotPassword1}
                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
              >
                Forget Password?
              </Link>
            </div>
            <Button 
              className="w-full bg-[#8E61E9]" 
              type="submit" 
              size="lg"
              disabled={isLoading}
            >
              <span>{isLoading ? 'Signing in...' : 'Sign in'}</span>
              {!isLoading && <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />}
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        {"Don't have an account? "}
        <Link
          href={routes.auth.signUp1}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Sign Up
        </Link>
      </Text>
    </>
  );
}
