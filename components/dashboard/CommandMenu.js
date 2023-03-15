import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  ArrowRightIcon,
  ChartPieIcon,
  ClipboardCopyIcon,
  ClipboardListIcon,
  CogIcon,
  ColorSwatchIcon,
  FilmIcon,
  FlagIcon,
  HomeIcon,
  LibraryIcon,
  LogoutIcon,
  PlusIcon,
  SearchIcon,
  UserGroupIcon,
  UsersIcon,
  ViewGridIcon,
} from '@heroicons/react/outline';
import { CommandMenu, CommandWrapper, useCommands, useKmenu } from 'kmenu';

export default function CommandsMenu() {
  const router = useRouter();
  const { setOpen, toggle } = useKmenu();

  // Toggle the menu when ⌘ K || ⌘ k is pressed
  useEffect(() => {
    const down = (e) => {
      if (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        toggle();
      }
      if (e.key.toLowerCase() === 'd' && e.shiftKey) {
        e.preventDefault();
        toggle();
        setOpen(2);
      }
      if (e.key.toLowerCase() === 'a' && e.shiftKey) {
        e.preventDefault();
        toggle();
        setOpen(3);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  async function copyUrl() {
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
    try {
      await navigator.clipboard.writeText(`${origin}${router.asPath}`);
    } catch (err) {
      console.log(err);
    }
  }

  // https://github.com/harshhhdev/kmenu#adding-commands
  const main = [
    {
      category: 'Navigation',
      commands: [
        {
          icon: <HomeIcon className='h-5 w-5' />,
          text: 'Home',
          href: '/',
          keywords: 'home',
        },
        {
          icon: <ViewGridIcon className='h-5 w-5' />,
          text: 'Dashboard',
          shortcuts: { keys: ['⇧', 'D'] },
          keywords: 'dashboard',
          perform: () => setOpen(2),
        },
        {
          icon: <SearchIcon className='h-5 w-5' />,
          text: 'Search',
          href: '/search',
          keywords: 'search',
        },
        {
          icon: <ChartPieIcon className='h-5 w-5' />,
          text: 'Statistic',
          href: '/statistics',
          keywords: 'statistic',
        },
      ],
    },
    {
      category: 'Manage',
      commands: [
        {
          icon: <FilmIcon className='h-5 w-5' />,
          text: 'Movie',
          href: '/movie',
          keywords: 'movie',
        },
        {
          icon: <PlusIcon className='h-5 w-5' />,
          text: 'Add Movie',
          href: '/movie/add',
          keywords: 'add movie',
        },
        {
          icon: <UserGroupIcon className='h-5 w-5' />,
          text: 'Actor',
          href: '/actor',
          keywords: 'actor',
        },
        {
          icon: <PlusIcon className='h-5 w-5' />,
          text: 'Add Actor',
          href: '/actor/add',
          keywords: 'add actor',
        },
        {
          icon: <UsersIcon className='h-5 w-5' />,
          text: 'Director',
          href: '/director',
          keywords: 'director',
        },
        {
          icon: <LibraryIcon className='h-5 w-5' />,
          text: 'Studio',
          href: '/studio',
          keywords: 'studio',
        },
        {
          icon: <ColorSwatchIcon className='h-5 w-5' />,
          text: 'Category',
          href: '/category',
          keywords: 'category',
        },
        {
          icon: <FlagIcon className='h-5 w-5' />,
          text: 'Country',
          href: '/country',
          keywords: 'country',
        },
      ],
    },
    {
      category: 'General',
      commands: [
        {
          icon: <CogIcon className='h-5 w-5' />,
          text: 'Setting',
          href: '/settings',
          keywords: 'setting',
        },
        {
          icon: <ClipboardCopyIcon className='h-5 w-5' />,
          text: 'Copy URL',
          keywords: 'copy url',
          perform: () => copyUrl(),
        },
        {
          icon: <LogoutIcon className='h-5 w-5' />,
          text: 'Log Out',
          keywords: 'log out',
          href: '/logout',
        },
      ],
    },
    {
      category: 'Documentation',
      commands: [
        {
          icon: <ClipboardListIcon className='h-5 w-5' />,
          text: 'API Documentation',
          shortcuts: { keys: ['⇧', 'A'] },
          keywords: 'api documentation',
          perform: () => setOpen(3),
        },
      ],
    },
  ];

  const dashboard = [
    {
      category: 'Dashboard',
      commands: [
        {
          icon: <ViewGridIcon className='h-4 w-4' />,
          text: 'Dashboard',
          href: '/dashboard',
          keywords: 'Dashboard',
        },
        {
          icon: <FilmIcon className='h-4 w-4' />,
          text: 'Movie',
          href: '/dashboard/movie',
          keywords: 'movie',
        },
        {
          icon: <UserGroupIcon className='h-4 w-4' />,
          text: 'Actor',
          href: '/dashboard/actor',
          keywords: 'actor',
        },
        {
          icon: <UsersIcon className='h-4 w-4' />,
          text: 'Director',
          href: '/dashboard/director',
          keywords: 'director',
        },
        {
          icon: <LibraryIcon className='h-4 w-4' />,
          text: 'Studio',
          href: '/dashboard/studio',
          keywords: 'studio',
        },
        {
          icon: <ColorSwatchIcon className='h-4 w-4' />,
          text: 'Category',
          href: '/dashboard/category',
          keywords: 'category',
        },
        {
          icon: <FlagIcon className='h-4 w-4' />,
          text: 'Country',
          href: '/dashboard/country',
          keywords: 'country',
        },
      ],
    },
  ];

  const documentation = [
    {
      category: 'Movie API',
      commands: [
        {
          icon: <FilmIcon className='h-4 w-4' />,
          text: 'Movie Playground',
          href: '/movie',
          newTab: true,
          keywords: 'movie playground',
        },
        {
          icon: <ArrowRightIcon className='h-4 w-4' />,
          text: 'Get All Movie',
          href: '/movie/list',
          newTab: true,
          keywords: 'get all movie',
        },
        {
          icon: <ArrowRightIcon className='h-4 w-4' />,
          text: 'Get Detail Movie',
          href: '/movie/detail',
          newTab: true,
          keywords: 'get detail movie',
        },
        {
          icon: <ArrowRightIcon className='h-4 w-4' />,
          text: 'Create Movie',
          href: '/movie/create',
          newTab: true,
          keywords: 'create movie',
        },
        {
          icon: <ArrowRightIcon className='h-4 w-4' />,
          text: 'Edit Movie',
          href: '/movie/edit',
          newTab: true,
          keywords: 'edit movie',
        },
        {
          icon: <ArrowRightIcon className='h-4 w-4' />,
          text: 'Delete Movie',
          href: '/movie/delete',
          newTab: true,
          keywords: 'delete movie',
        },
      ],
    },
  ];

  const [mainCommands] = useCommands(main);
  const [dashboardCommands] = useCommands(dashboard);
  const [documentationCommands] = useCommands(documentation);

  return (
    <CommandWrapper>
      <CommandMenu commands={mainCommands} crumbs={['Home']} index={1} placeholder='What do you need?' />

      <CommandMenu commands={dashboardCommands} crumbs={['Home', 'Dashboard']} index={2} />

      <CommandMenu commands={documentationCommands} crumbs={['Home', 'Documentation']} index={3} />

      <div className='mt-4 hidden justify-end border-t pt-4 dark:border-t-neutral-700 sm:flex'>
        <div className='flex gap-4'>
          <span className='text-sm dark:text-neutral-300'>
            Open
            <kbd className='ml-2 rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400'>
              Enter
            </kbd>
          </span>
          <span className='text-sm dark:text-neutral-300'>
            Back
            <kbd className='ml-2 rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400'>
              Backspace
            </kbd>
          </span>
          <span className='text-sm dark:text-neutral-300'>
            Close
            <kbd className='ml-2 rounded border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400'>
              Esc
            </kbd>
          </span>
        </div>
      </div>
    </CommandWrapper>
  );
}
