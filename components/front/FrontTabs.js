import { Tab } from '@headlessui/react';
import clsx from 'clsx';

export default function FrontTabs({ items, children, className }) {
  return (
    <Tab.Group>
      <Tab.List
        className={`flex whitespace-nowrap border-b border-neutral-200 font-medium dark:border-neutral-800 ${className}`}
      >
        <div className='flex gap-x-8'>
          {items.map((item, index) => (
            <Tab
              key={index + 1}
              className={({ selected }) =>
                clsx(
                  'w-full py-2 text-base font-medium tracking-wide transition-all',
                  'text-neutral-800 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white',
                  'border-b-2 border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
                  selected ? 'border-b-2 !border-sky-600 !text-sky-600 dark:!border-sky-500 dark:!text-sky-500' : ''
                )
              }
            >
              {item}
            </Tab>
          ))}
        </div>
      </Tab.List>
      <Tab.Panels className='mt-4 focus-visible:outline-none focus-visible:ring-0'>{children}</Tab.Panels>
    </Tab.Group>
  );
}

FrontTabs.panel = ({ children, className }) => {
  return (
    <>
      <Tab.Panel
        className={`rounded-xl py-2 text-neutral-700 focus-visible:outline-none focus-visible:ring-0 dark:text-neutral-200 ${className}`}
      >
        {children}
      </Tab.Panel>
    </>
  );
};
