import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GlobalContext } from '@utils/GlobalContext';
import {
  XIcon,
  LogoutIcon,
  ViewGridIcon,
  CogIcon,
  TemplateIcon,
  UserGroupIcon,
  ColorSwatchIcon,
  ChartPieIcon,
  SearchIcon,
  LoginIcon,
  ExternalLinkIcon,
  FlagIcon,
  UsersIcon,
  FilmIcon,
  LibraryIcon,
} from '@heroicons/react/outline';
import NavLink from '@components/systems/NavLink';
import NavAccordion from '@components/systems/NavAccordion';
import Modal from '@components/systems/Modal';
import clsx from 'clsx';
import ThemeChanger from './ThemeChanger';
import nookies from 'nookies';

export default function Sidebar() {
  const router = useRouter();
  const { showNav, setShowNav } = useContext(GlobalContext);
  const [openModal, setOpenModal] = useState(false);

  const hideMenu = () => {
    setShowNav(false);
  };

  // https://stackoverflow.com/questions/54989513/react-prevent-scroll-when-modal-is-open
  useEffect(() => {
    if (showNav) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'visible';
  }, [showNav]);

  useEffect(() => {
    setShowNav(false);
  }, [router.pathname, setShowNav]);

  async function handleLogout() {
    setOpenModal(false);
    hideMenu();
    // sometimes, this not work,
    // the token has been deleted in backend,
    // but the cookies in browser still exist
    nookies.destroy(null, 'id');
    nookies.destroy(null, 'username');
    nookies.destroy(null, 'name');
    nookies.destroy(null, 'type');
    nookies.destroy(null, 'token');
    // so try this, seems work
    document.cookie = 'id=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'username=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'name=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'type=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/');
  }

  return (
    <>
      <div
        className={`${
          showNav ? 'fixed lg:relative' : 'top-0 hidden lg:sticky lg:flex'
        } z-50 flex h-screen max-h-screen w-screen flex-col flex-nowrap border-r bg-white dark:border-neutral-800 dark:bg-neutral-900 lg:w-60`}
      >
        <div className='flex items-center justify-between gap-2 px-4'>
          <button
            className='rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 lg:hidden'
            onClick={hideMenu}
            id='closemenu'
            aria-label='Close Menu'
          >
            <XIcon className='h-5 w-5 text-gray-600 transition-all hover:text-gray-800 dark:text-neutral-300 dark:hover:text-neutral-100' />
          </button>
          <p className='py-2.5 text-left text-base font-semibold tracking-wide text-neutral-800 dark:text-neutral-100'>
            MyMovie
          </p>
          <div className='cursor-pointer pt-1'>
            <ThemeChanger />
          </div>
        </div>

        <div
          className={clsx(
            'flex flex-col flex-nowrap gap-1 overflow-auto border-t px-4 pt-4 dark:border-neutral-800 sm:flex-grow',
            'scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-800'
          )}
        >
          <NavLink isHome href='/dashboard' icon={<ViewGridIcon className='h-[18px] w-[18px]' />}>
            Dashboard
          </NavLink>

          <NavLink href='/search' icon={<SearchIcon className='h-[18px] w-[18px]' />} className='mt-1'>
            Search
          </NavLink>

          <NavLink href='/statistics' icon={<ChartPieIcon className='h-[18px] w-[18px]' />} className='mt-1'>
            Statistics
          </NavLink>

          <NavLink href='/movie' icon={<FilmIcon className='h-[18px] w-[18px]' />} className='mt-1'>
            Movie
          </NavLink>

          <NavLink href='/actor' icon={<UserGroupIcon className='h-[18px] w-[18px]' />} className='mt-1'>
            Actor
          </NavLink>

          <NavLink href='/director' icon={<UsersIcon className='h-[18px] w-[18px]' />} className='mt-1'>
            Director
          </NavLink>

          <NavLink href='/studio' icon={<LibraryIcon className='h-[18px] w-[18px]' />} className='mt-1'>
            Studio
          </NavLink>

          <NavLink href='/category' icon={<ColorSwatchIcon className='h-[18px] w-[18px]' />} className='mt-1'>
            Category
          </NavLink>

          <NavLink href='/country' icon={<FlagIcon className='h-[18px] w-[18px]' />} className='mt-1'>
            Country
          </NavLink>

          <NavLink href='/settings' icon={<CogIcon className='h-[18px] w-[18px]' />} className='mt-1'>
            Settings
          </NavLink>

          <a
            href={process.env.NEXT_PUBLIC_API_DOCS}
            className={clsx(
              'mt-1 mb-1 flex w-full items-center justify-start gap-2 px-3 py-2 transition-all',
              'rounded text-sm font-medium text-gray-600 hover:text-sky-600 dark:text-neutral-300',
              'hover:bg-gray-100 dark:hover:bg-neutral-800 dark:hover:text-sky-500',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
            )}
            target='_blank'
            rel='noopener noreferrer'
          >
            <ExternalLinkIcon className='h-[18px] w-[18px]' />
            Docs
          </a>

          {/* <NavAccordion title="Design" routeName="design" icon={<TemplateIcon className="w-4 h-4" />}>
          <NavLink
            href="/design"
            icon={<TemplateIcon className="w-4 h-4" />}
          >
            Example
          </NavLink>
        </NavAccordion> */}
        </div>

        <hr className='mt-2 dark:border-neutral-800' />
        <div className='px-4 py-2'>
          <button
            onClick={() => setOpenModal(true)}
            className={clsx(
              'flex w-full items-center justify-start gap-2 px-3 py-2 text-sm font-semibold transition-all',
              'rounded text-red-600 hover:bg-red-100 dark:hover:bg-neutral-800',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500'
            )}
          >
            <LogoutIcon className='h-[18px] w-[18px]' />
            Logout
          </button>
        </div>
      </div>
      <Modal
        title='Logout'
        open={openModal}
        showIcon
        isDanger
        onClose={() => setOpenModal(false)}
        onConfirm={handleLogout}
        confirmText='Logout'
      >
        Are you sure want to logout?
      </Modal>
    </>
  );
}
