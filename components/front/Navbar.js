import Link from 'next/link';
import { Fragment } from 'react';
import { Menu, Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronRightIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import ActiveLink from '@components/front/ActiveLink';
import clsx from 'clsx';
import Image from 'next/image';
import ThemeChanger from './ThemeChanger';

export default function Navbar() {
  return (
    <div>
      <Popover as='nav' className='border-b shadow-sm dark:border-b-neutral-800'>
        <>
          <div className='mx-auto max-w-7xl p-4'>
            <div className='flex items-center justify-between'>
              {/* web logo  */}
              <Link
                href='/'
                passHref
                className='rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
              >
                <div className='flex items-center justify-center font-medium text-gray-900 md:justify-start'>
                  <Image alt='Logo' src='/icon.jpg' width={30} height={30} className='mr-2 rounded-lg' />
                  <span className='text-xl font-semibold text-neutral-700 dark:text-white'>MyMovie</span>
                </div>
              </Link>
              {/* web logo  */}

              {/* Nav Link  */}
              <div className='hidden md:block'>
                <div className='flex items-center space-x-4'>
                  <ActiveLink
                    href='/movies'
                    activeClassName='!text-sky-500 dark:text-sky-500'
                    className='rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                  >
                    <span className='px-3 text-[15px] font-medium text-gray-700 transition-all duration-200 hover:text-sky-500 dark:text-neutral-200 dark:hover:text-sky-500'>
                      Movies
                    </span>
                  </ActiveLink>
                  <ActiveLink
                    href='/actors'
                    activeClassName='!text-sky-500 dark:text-sky-500'
                    className='rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                  >
                    <span className='px-3 text-[15px] font-medium text-gray-700 transition-all duration-200 hover:text-sky-500 dark:text-neutral-200 dark:hover:text-sky-500'>
                      Actors
                    </span>
                  </ActiveLink>
                  <ActiveLink
                    href='/directors'
                    activeClassName='!text-sky-500 dark:text-sky-500'
                    className='rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                  >
                    <span className='px-3 text-[15px] font-medium text-gray-700 transition-all duration-200 hover:text-sky-500 dark:text-neutral-200 dark:hover:text-sky-500'>
                      Directors
                    </span>
                  </ActiveLink>
                  <ActiveLink
                    href='/studios'
                    activeClassName='!text-sky-500 dark:text-sky-500'
                    className='rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                  >
                    <span className='px-3 text-[15px] font-medium text-gray-700 transition-all duration-200 hover:text-sky-500 dark:text-neutral-200 dark:hover:text-sky-500'>
                      Studios
                    </span>
                  </ActiveLink>
                  <Popover className='relative'>
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={clsx(
                            'group flex items-center space-x-2 rounded px-3 text-[15px] font-medium transition-all duration-200',
                            ' text-gray-700 hover:text-sky-500 dark:text-neutral-200 dark:hover:text-sky-500',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                          )}
                        >
                          <span>More</span>
                          <ChevronDownIcon
                            className={`${
                              open
                                ? 'rotate-180 transform transition-transform duration-300'
                                : 'transition-transform duration-300'
                            } h-4 w-4`}
                          />
                        </Popover.Button>
                        <Transition
                          as={Fragment}
                          enter='duration-200 ease-out'
                          enterFrom='opacity-0 scale-95'
                          enterTo='opacity-100 scale-100'
                          leave='duration-100 ease-in'
                          leaveFrom='opacity-100 scale-100'
                          leaveTo='opacity-0 scale-95'
                        >
                          <Popover.Panel className='absolute top-8 z-10 flex w-40 flex-col space-y-2.5 rounded bg-white px-4 py-4 shadow dark:bg-[#1a1a1a]'>
                            <ActiveLink
                              activeClassName='!text-sky-500 dark:text-sky-500'
                              className='rounded text-[15px] font-medium text-neutral-700 transition-all duration-200 hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-neutral-200 dark:hover:text-sky-500'
                              href='/categories'
                            >
                              <span>Categories</span>
                            </ActiveLink>
                            <ActiveLink
                              activeClassName='!text-sky-500 dark:text-sky-500'
                              className='rounded text-[15px] font-medium text-neutral-700 transition-all duration-200 hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-neutral-200 dark:hover:text-sky-500'
                              href='/countries'
                            >
                              <span>Countries</span>
                            </ActiveLink>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </div>
              </div>
              {/* End Nav Link  */}

              <div className='hidden items-center gap-3 md:flex'>
                <ThemeChanger />
                <Link
                  href='/login'
                  className='rounded bg-sky-500 px-3.5 py-1.5 text-sm font-medium text-white transition-all duration-200 hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400'
                  passHref
                >
                  Login
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className='flex md:hidden'>
                <Popover.Button className='inline-flex items-center justify-center rounded text-gray-500 transition-all hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-neutral-300 dark:hover:text-neutral-100'>
                  <span className='sr-only'>Open main menu</span>
                  <MenuIcon className='h-6 w-6' aria-hidden='true' />
                </Popover.Button>
              </div>
              {/* End Mobile menu button */}
            </div>
          </div>

          {/* Mobile menu panel */}
          <Transition
            as={Fragment}
            enter='duration-150 ease-out'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='duration-100 ease-in'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Popover.Panel
              focus
              className='absolute inset-x-0 top-0 z-10 origin-top-right transform p-3 transition md:hidden'
            >
              <div className='overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5 dark:bg-[#1a1a1a]'>
                <div className='flex items-center justify-between border-b py-3 dark:border-b-neutral-800'>
                  <div className='ml-5'>
                    <Link
                      href='/'
                      passHref
                      className='flex w-full items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400'
                    >
                      <span className='text-xl font-semibold dark:text-white'>MyMovie</span>
                    </Link>
                  </div>
                  {/* CLose Mobile Menu Button  */}
                  <div className='mr-4 flex items-center gap-2'>
                    <ThemeChanger />
                    <Popover.Button className='rounded p-1 text-gray-700 transition-all hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100'>
                      <span className='sr-only'>Close main menu</span>
                      <XIcon className='h-5 w-5' aria-hidden='true' />
                    </Popover.Button>
                  </div>
                  {/* EndCLose Mobile Menu Button  */}
                </div>
                <div className='my-4 flex flex-col space-y-1 px-4'>
                  <ActiveLink
                    href='/movies'
                    activeClassName='text-sky-500 dark:text-sky-500'
                    className={clsx(
                      'block rounded px-3 py-1.5 text-[15px] font-medium',
                      'text-gray-600 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-800',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                    )}
                  >
                    <span>Movies</span>
                  </ActiveLink>
                  <ActiveLink
                    href='/actors'
                    activeClassName='text-sky-500 dark:text-sky-500'
                    className={clsx(
                      'block rounded px-3 py-1.5 text-[15px] font-medium',
                      'text-gray-600 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-800',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                    )}
                  >
                    <span>Actors</span>
                  </ActiveLink>
                  <ActiveLink
                    href='/directors'
                    activeClassName='text-sky-500 dark:text-sky-500'
                    className={clsx(
                      'block rounded px-3 py-1.5 text-[15px] font-medium',
                      'text-gray-600 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-800',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                    )}
                  >
                    <span>Directors</span>
                  </ActiveLink>
                  <ActiveLink
                    href='/studios'
                    activeClassName='text-sky-500 dark:text-sky-500'
                    className={clsx(
                      'block rounded px-3 py-1.5 text-[15px] font-medium',
                      'text-gray-600 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-800',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                    )}
                  >
                    <span>Studios</span>
                  </ActiveLink>
                  <Menu>
                    {({ open }) => (
                      <>
                        <Menu.Button className='w-full rounded px-3 py-1.5 text-[15px] font-medium text-gray-600 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-neutral-200 dark:hover:bg-neutral-800'>
                          <div className='flex items-center justify-between'>
                            <span>More</span>
                            <ChevronRightIcon
                              className={`${
                                open
                                  ? 'rotate-90 transform transition-transform duration-200'
                                  : 'transition-transform duration-200'
                              } h-5 w-5`}
                            />
                          </div>
                        </Menu.Button>
                        <Menu.Items className='space-y-1 px-3'>
                          <Menu.Item>
                            <ActiveLink activeClassName='bg-blue-500 text-white' href='/categories'>
                              <span className='block rounded px-3 py-1.5 text-[15px] font-medium text-gray-600 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-800'>
                                Categories
                              </span>
                            </ActiveLink>
                          </Menu.Item>
                          <Menu.Item>
                            <ActiveLink activeClassName='bg-blue-500 text-white' href='/countries'>
                              <span className='block rounded px-3 py-1.5 text-[15px] font-medium text-gray-600 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-800'>
                                Countries
                              </span>
                            </ActiveLink>
                          </Menu.Item>
                        </Menu.Items>
                      </>
                    )}
                  </Menu>
                  <Link
                    href='/nav-bar'
                    className='block rounded px-3 py-1.5 text-[15px] font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-neutral-200 dark:hover:bg-neutral-800'
                  >
                    Login
                  </Link>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
          {/* End Mobile menu panel */}
        </>
      </Popover>
    </div>
  );
}
