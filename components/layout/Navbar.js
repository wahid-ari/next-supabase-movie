import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { MenuIcon } from '@heroicons/react/solid';
import { GlobalContext } from '@utils/GlobalContext';
import Menu from './Menu';
import clsx from 'clsx';
import ThemeChanger from './ThemeChanger';
import nookies from 'nookies';
import { useKmenu } from 'kmenu';
import Button from '@components/systems/Button';

export default function Navbar() {
  const { toggle } = useKmenu();
  const { setShowNav } = useContext(GlobalContext);
  const admin = nookies.get(null, 'name');
  const [mounted, setMounted] = useState(false);
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const showMenu = () => {
    setShowNav(true);
  };

  return (
    <div
      className={clsx(
        'sticky top-0 z-40 h-11 dark:text-neutral-50 lg:hidden',
        'flex w-full items-center justify-between gap-4 border-b p-3 px-5 dark:border-neutral-800',
        'bg-white/50 dark:bg-neutral-900/30',
        'backdrop-blur-md backdrop-filter'
      )}
    >
      <div className='flex gap-x-3'>
        <button
          className='-ml-0.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
          id='menu'
          aria-label='Menu'
        >
          <MenuIcon
            className='h-5 w-5 text-gray-600 transition-all hover:text-gray-800 dark:text-neutral-300 dark:hover:text-neutral-100'
            onClick={showMenu}
          />
        </button>
        <Link
          href='/'
          className='rounded text-center text-base font-semibold tracking-wide text-neutral-800 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-neutral-100 lg:text-2xl'
        >
          MyMovie
        </Link>
      </div>

      <div className='hidden min-[480px]:block'>
        <Button.secondary
          onClick={toggle}
          className='flex items-center gap-2 truncate !bg-transparent !px-1.5 !py-0.5  text-[13px] hover:!bg-neutral-100/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:hover:!bg-neutral-800/70'
        >
          Command Menu
          <div className='flex items-center gap-1'>
            <kbd className='rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-500 dark:border-neutral-900 dark:bg-neutral-700 dark:text-neutral-300'>
              ⌘
            </kbd>
            <kbd className='rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-500 dark:border-neutral-900 dark:bg-neutral-700 dark:text-neutral-300'>
              K
            </kbd>
          </div>
        </Button.secondary>
      </div>

      <div className='flex items-center gap-3'>
        <div className='cursor-pointer pt-1'>
          <ThemeChanger />
        </div>

        {mounted && admin.name ? <Menu className='lg:hidden' /> : null}
      </div>
    </div>
  );
}
