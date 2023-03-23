import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import useToast from '@utils/useToast';
import Button from '@components/systems/Button';
import Heading from '@components/systems/Heading';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import nookies from 'nookies';
import HeadSeo from '@components/layout/HeadSeo';
import Link from 'next/link';

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  if (cookies.token) {
    return {
      redirect: {
        destination: '/dashboard',
      },
    };
  }
  return {
    props: {},
  };
}

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updateToast, pushToast, dismissToast } = useToast();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (loggedIn) {
      router.push('/dashboard');
    }
  }, [loggedIn]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    let isError = false;
    if (!form.username) {
      isError = true;
      pushToast({ message: "Username can't be empty", isError: true });
    }
    if (!form.password) {
      isError = true;
      pushToast({ message: "Password can't be empty", isError: true });
    }

    // jika tidak ada error save data
    if (!isError) {
      const toastId = pushToast({
        message: 'Login Admin...',
        isLoading: true,
      });
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/login`, form);
        if (res.status == 200) {
          nookies.set(null, 'id', res.data.id, { path: '/' });
          nookies.set(null, 'username', res.data.username, { path: '/' });
          nookies.set(null, 'name', res.data.name, { path: '/' });
          nookies.set(null, 'type', res.data.type, { path: '/' });
          nookies.set(null, 'token', res.data.token, { path: '/' });
          updateToast({
            toastId,
            message: 'Success Login',
            isError: false,
          });
          setLoggedIn(true);
        }
      } catch (error) {
        updateToast({
          toastId,
          message: error.response.data.error,
          isError: true,
        });
        console.error(error);
      }
    }
    setLoading(false);
  }

  return (
    <div className='text-sm font-medium dark:bg-white'>
      <HeadSeo title='Login - MyMovie' description='Login - MyMovie' />

      <div className='min-h-screen w-screen sm:grid sm:grid-cols-12'>
        <div className='banner flex flex-col justify-between gap-2 p-8 sm:hidden'>
          <div className='mb-2 flex items-center gap-4'>
            <Image alt='Logo' src='/icon.jpg' width={50} height={50} className='rounded-[17px]' />
            <h1 className='text-4xl font-bold text-white'>MyMovie</h1>
          </div>
          <p className='text-base font-normal text-white'>
            With MyMovie, it&apos;s easy to find Information and statistics about movies, TV shows as well as actors,
            directors and other film industry professionals.
          </p>
        </div>

        <div className='flex w-full items-center justify-center px-8 py-16 sm:col-span-6 md:col-span-5 md:px-16 md:py-0'>
          <div className='w-full sm:max-w-md'>
            <Image alt='Logo' src='/icon.jpg' width={100} height={100} className='mx-auto mb-16 hidden sm:block' />

            <Heading h1 className='mb-6 font-semibold !text-neutral-800'>
              Login
            </Heading>

            <div className='mb-5'>
              <label className='block text-sm text-gray-800' htmlFor='username'>
                Username
              </label>
              <input
                type='text'
                name='username'
                placeholder='Username'
                value={form.username}
                onChange={handleChange}
                className='mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-[0.6rem] text-sm font-medium outline-none ring-gray-300 transition-all focus:border-sky-600 focus:ring-1 focus:ring-sky-600 dark:bg-white dark:text-neutral-800'
                autoComplete='off'
                required
              />
            </div>

            <div className='mb-5'>
              <label className='block text-sm text-gray-800' htmlFor='password'>
                Password
              </label>
              <div className='relative mb-4 flex items-center'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  placeholder='Password'
                  value={form.password}
                  onChange={handleChange}
                  className='mt-2 w-full rounded-md border border-gray-300 bg-white px-4 py-[0.6rem] text-sm font-medium outline-none ring-gray-300 transition-all focus:border-sky-600 focus:ring-1 focus:ring-sky-600 dark:bg-white dark:text-neutral-800'
                  autoComplete='off'
                  required
                />
                <button
                  aria-label='show'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-0 z-10 mr-0.5 mt-2 rounded-md border-gray-300 p-1.5 outline-none ring-gray-300 backdrop-blur-lg focus:border-sky-600 focus:ring-1 focus:ring-sky-600'
                >
                  {showPassword ? (
                    <EyeIcon className='h-5 w-5 text-gray-600' />
                  ) : (
                    <EyeOffIcon className='h-5 w-5 text-gray-600' />
                  )}
                </button>
              </div>
            </div>

            <Button onClick={handleLogin} className='w-full !text-base'>
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <p className='mt-4 text-center font-normal dark:text-neutral-800'>
              Continue to{' '}
              <Link
                href='/'
                className='rounded font-medium text-sky-600 transition-all duration-300 hover:text-sky-500 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
              >
                Home
              </Link>
            </p>
          </div>
        </div>

        <div className='banner hidden flex-col justify-between gap-2 px-8 py-12 sm:col-span-6 sm:flex md:col-span-7'>
          <div>
            <h1 className='font-bold text-white sm:text-4xl md:text-5xl'>MyMovie</h1>
            <br />
            <p className='text-base font-normal text-white'>
              With MyMovie, it&apos;s easy to find Information and statistics about movies, TV shows as well as actors,
              directors and other film industry professionals.
            </p>
          </div>
          <p className='font-semibold text-white'>© MyMovie - 2023</p>
        </div>
      </div>
    </div>
  );
}
