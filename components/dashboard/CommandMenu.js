import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  ArrowSmRightIcon,
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
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Get All Movie',
          href: '/movie/list',
          newTab: true,
          keywords: 'get all movie',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Get Detail Movie',
          href: '/movie/detail',
          newTab: true,
          keywords: 'get detail movie',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Create Movie',
          href: '/movie/create',
          newTab: true,
          keywords: 'create movie',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Edit Movie',
          href: '/movie/edit',
          newTab: true,
          keywords: 'edit movie',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Delete Movie',
          href: '/movie/delete',
          newTab: true,
          keywords: 'delete movie',
        },
      ],
    },
    {
      category: 'Actor API',
      commands: [
        {
          icon: <UserGroupIcon className='h-4 w-4' />,
          text: 'Actor Playground',
          href: '/actor',
          newTab: true,
          keywords: 'actor playground',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Get All actor',
          href: '/actor/list',
          newTab: true,
          keywords: 'get all actor',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Get Detail Actor',
          href: '/actor/detail',
          newTab: true,
          keywords: 'get detail actor',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Create Actor',
          href: '/actor/create',
          newTab: true,
          keywords: 'create actor',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Edit Actor',
          href: '/actor/edit',
          newTab: true,
          keywords: 'edit actor',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Delete Actor',
          href: '/actor/delete',
          newTab: true,
          keywords: 'delete actor',
        },
      ],
    },
    {
      category: 'Director API',
      commands: [
        {
          icon: <UsersIcon className='h-4 w-4' />,
          text: 'Director Playground',
          href: '/director',
          newTab: true,
          keywords: 'director playground',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Get All Director',
          href: '/director/list',
          newTab: true,
          keywords: 'get all director',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Get Detail Director',
          href: '/director/detail',
          newTab: true,
          keywords: 'get detail director',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Create Director',
          href: '/director/create',
          newTab: true,
          keywords: 'create director',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Edit Director',
          href: '/director/edit',
          newTab: true,
          keywords: 'edit director',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Delete Director',
          href: '/director/delete',
          newTab: true,
          keywords: 'delete director',
        },
      ],
    },
    {
      category: 'Studio API',
      commands: [
        {
          icon: <LibraryIcon className='h-4 w-4' />,
          text: 'Studio Playground',
          href: '/studio',
          newTab: true,
          keywords: 'studio playground',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Get All Studio',
          href: '/studio/list',
          newTab: true,
          keywords: 'get all studio',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Get Detail Studio',
          href: '/studio/detail',
          newTab: true,
          keywords: 'get detail studio',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Create Studio',
          href: '/studio/create',
          newTab: true,
          keywords: 'create studio',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Edit Studio',
          href: '/studio/edit',
          newTab: true,
          keywords: 'edit studio',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Delete Studio',
          href: '/studio/delete',
          newTab: true,
          keywords: 'delete studio',
        },
      ],
    },
    {
      category: 'Category API',
      commands: [
        {
          icon: <ColorSwatchIcon className='h-4 w-4' />,
          text: 'Category Playground',
          href: '/category',
          newTab: true,
          keywords: 'category playground',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Get All Category',
          href: '/category/list',
          newTab: true,
          keywords: 'get all category',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Get Detail Category',
          href: '/category/detail',
          newTab: true,
          keywords: 'get detail category',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Create Category',
          href: '/category/create',
          newTab: true,
          keywords: 'create category',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Edit Category',
          href: '/category/edit',
          newTab: true,
          keywords: 'edit category',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Delete Category',
          href: '/category/delete',
          newTab: true,
          keywords: 'delete category',
        },
      ],
    },
    {
      category: 'Country API',
      commands: [
        {
          icon: <FlagIcon className='h-4 w-4' />,
          text: 'Country Playground',
          href: '/country',
          newTab: true,
          keywords: 'country playground',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Get All Country',
          href: '/country/list',
          newTab: true,
          keywords: 'get all country',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Get Detail Country',
          href: '/country/detail',
          newTab: true,
          keywords: 'get detail country',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Create Country',
          href: '/country/create',
          newTab: true,
          keywords: 'create country',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Edit Country',
          href: '/country/edit',
          newTab: true,
          keywords: 'edit country',
        },
        {
          icon: <ArrowSmRightIcon className='h-4 w-4' />,
          text: 'Delete Country',
          href: '/country/delete',
          newTab: true,
          keywords: 'delete country',
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
