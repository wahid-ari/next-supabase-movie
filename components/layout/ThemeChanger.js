import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/outline';

export default function ThemeChanger() {
  // https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return theme == 'dark' ? (
    <button
      onClick={() => setTheme('light')}
      aria-label='Light'
      className='rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
    >
      <SunIcon className='h-5 w-5 text-neutral-300 transition-all hover:text-neutral-100' />
    </button>
  ) : (
    <button
      onClick={() => setTheme('dark')}
      aria-label='Dark'
      className='rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
    >
      <MoonIcon className='h-5 w-5 text-gray-600 transition-all hover:text-gray-800' />
    </button>
  );
}
