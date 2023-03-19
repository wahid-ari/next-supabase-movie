import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { CommandMenu, CommandWrapper, useCommands, useKmenu } from 'kmenu';
import { dashboard, movie, actor, director, studio, category, country } from './menu';
import {
  HomeIcon,
  ViewGridIcon,
  SearchIcon,
  ChartPieIcon,
  FilmIcon,
  PlusIcon,
  UserGroupIcon,
  UsersIcon,
  LibraryIcon,
  ColorSwatchIcon,
  FlagIcon,
  CogIcon,
  ClipboardCopyIcon,
  LogoutIcon,
  ClipboardListIcon,
} from '@heroicons/react/outline';

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
      category: 'Page',
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

  const documentation = [
    {
      commands: [
        {
          icon: <FilmIcon className='h-5 w-5' />,
          text: 'Movie API',
          keywords: 'movie api',
          perform: () => setOpen(4),
        },
      ],
    },
    {
      commands: [
        {
          icon: <UserGroupIcon className='h-5 w-5' />,
          text: 'Actor API',
          keywords: 'actor api',
          perform: () => setOpen(5),
        },
      ],
    },
    {
      commands: [
        {
          icon: <UsersIcon className='h-5 w-5' />,
          text: 'Director API',
          keywords: 'director api',
          perform: () => setOpen(6),
        },
      ],
    },
    {
      commands: [
        {
          icon: <LibraryIcon className='h-5 w-5' />,
          text: 'Studio API',
          keywords: 'studio api',
          perform: () => setOpen(7),
        },
      ],
    },
    {
      commands: [
        {
          icon: <ColorSwatchIcon className='h-5 w-5' />,
          text: 'Category API',
          keywords: 'category api',
          perform: () => setOpen(8),
        },
      ],
    },
    {
      commands: [
        {
          icon: <FlagIcon className='h-5 w-5' />,
          text: 'Country API',
          keywords: 'country api',
          perform: () => setOpen(9),
        },
      ],
    },
  ];

  const [mainCommands] = useCommands(main);
  const [dashboardCommands] = useCommands(dashboard);
  const [documentationCommands] = useCommands(documentation);
  const [movieCommands] = useCommands(movie);
  const [actorCommands] = useCommands(actor);
  const [directorCommands] = useCommands(director);
  const [studioCommands] = useCommands(studio);
  const [categoryCommands] = useCommands(category);
  const [countryCommands] = useCommands(country);

  return (
    <CommandWrapper>
      <CommandMenu commands={mainCommands} crumbs={['Home']} index={1} placeholder='What do you need?' main />

      <CommandMenu commands={dashboardCommands} crumbs={['Home', 'Dashboard']} index={2} />

      <CommandMenu commands={documentationCommands} crumbs={['Home', '', 'Documentation']} index={3} />

      <CommandMenu commands={movieCommands} crumbs={['Home', '', 'Documentation', 'Movie']} index={4} />

      <CommandMenu commands={actorCommands} crumbs={['Home', '', 'Documentation', '', 'Actor']} index={5} />

      <CommandMenu commands={directorCommands} crumbs={['Home', '', 'Documentation', '', '', 'Director']} index={6} />

      <CommandMenu commands={studioCommands} crumbs={['Home', '', 'Documentation', '', '', '', 'Studio']} index={7} />

      <CommandMenu
        commands={categoryCommands}
        crumbs={['Home', '', 'Documentation', '', '', '', '', 'Category']}
        index={8}
      />

      <CommandMenu
        commands={countryCommands}
        crumbs={['Home', '', 'Documentation', '', '', '', '', '', 'Country']}
        index={9}
      />

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
