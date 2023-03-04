import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

export default function ThemeChanger({ variant = 'icon' }) {
  // https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className={clsx(
          'rounded-full border-2 hover:border-neutral-400 focus:border-sky-500 focus:outline-none dark:border-neutral-700 dark:hover:border-neutral-500 dark:focus:border-sky-500',
          'inline-flex h-8 items-center justify-center overflow-hidden transition-all duration-200',
          {
            'w-12': variant === 'icon',
            'px-4': variant === 'labelled',
          }
        )}
      ></button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
      className={clsx(
        'rounded-full border-2 hover:border-neutral-400 focus:border-sky-500 focus:outline-none dark:border-neutral-700 dark:hover:border-neutral-500 dark:focus:border-sky-500',
        'inline-flex h-8 items-center justify-center overflow-hidden transition-all duration-200',
        {
          'w-12': variant === 'icon',
          'px-4': variant === 'labelled',
        }
      )}
    >
      {/* note that the duration is longer then the one on body, controlling the bg-color */}
      <div className='relative h-5 w-5'>
        <span
          className='absolute inset-0 rotate-90 transform text-black transition duration-700 motion-reduce:duration-[0s] dark:rotate-0 dark:text-white'
          style={{ transformOrigin: '50% 100px' }}
        >
          <MoonIcon />
        </span>
        <span
          className='absolute inset-0 rotate-0 transform text-black transition duration-700 motion-reduce:duration-[0s] dark:-rotate-90 dark:text-white'
          style={{ transformOrigin: '50% 100px' }}
        >
          <SunIcon />
        </span>
      </div>
      <span
        className={clsx('ml-3 text-black dark:text-white', {
          'sr-only': variant === 'icon',
        })}
      >
        {theme == 'dark' ? 'switch to light mode' : 'switch to dark mode'}
      </span>
    </button>
  );
}
