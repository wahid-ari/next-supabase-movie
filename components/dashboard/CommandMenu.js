import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ArrowRightIcon, ClipboardCopyIcon, CogIcon, SearchIcon } from '@heroicons/react/outline';
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
          icon: <SearchIcon className='h-5 w-5' />,
          text: 'Documentation',
          shortcuts: { keys: ['⇧', 'e'] },
          perform: () => setOpen(2),
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
          perform: () => copyUrl(),
        },
      ],
    },
  ];

  const nested = [
    {
      category: 'Documentation',
      commands: [
        {
          icon: <ArrowRightIcon className='h-4 w-4' />,
          text: 'Quickstart',
          href: 'https://github.com/harshhhdev/kmenu#-quickstart',
          newTab: true,
        },
        {
          icon: <ArrowRightIcon className='h-4 w-4' />,
          text: 'Using the Provider',
          href: 'https://github.com/harshhhdev/kmenu/#using-the-provider',
          newTab: true,
        },
      ],
    },
  ];

  const [mainCommands] = useCommands(main);
  const [navigationCommands] = useCommands(nested);

  return (
    <CommandWrapper>
      <CommandMenu commands={mainCommands} crumbs={['Home']} index={1} placeholder='What do you need?' />

      <CommandMenu commands={navigationCommands} crumbs={['Home', 'Documentation']} index={2} />

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
