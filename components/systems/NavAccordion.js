import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/solid';

export default function NavAccordion({ title, routeName, icon, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cek, setCek] = useState(false);
  const router = useRouter();

  // set sidebar nav accordion open or close based on route
  useEffect(() => {
    if (router.pathname.includes(routeName)) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
    setCek(true);
  }, [router.pathname]);

  return cek ? (
    <>
      <Disclosure defaultOpen={isOpen}>
        {({ open }) => (
          <>
            <Disclosure.Button className='mb-1 flex w-full items-center justify-start gap-2 rounded py-2 pl-3 text-gray-700 outline-none transition-all hover:text-sky-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-sky-500 dark:text-neutral-300 dark:hover:text-sky-500'>
              <div className='flex-grow text-left text-sm'>
                <div className='flex items-center gap-2'>
                  {icon}
                  <span>{title}</span>
                </div>
              </div>
              <ChevronRightIcon
                className={`durat h-5 w-5 transition-all duration-300 ${
                  open ? 'rotate-90 transform transition-transform' : 'transition-transform'
                }`}
              />
            </Disclosure.Button>
            <Transition
              enter='transition-max-height ease-in-out duration-500 overflow-hidden'
              enterFrom='max-h-0'
              enterTo='max-h-screen'
              leave='transition-max-height ease-in-out duration-100 overflow-hidden'
              leaveFrom='max-h-screen'
              leaveTo='max-h-0'
            >
              <Disclosure.Panel className='relative overflow-hidden py-1 pl-4 pr-1 transition-all'>
                {children}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
      <hr className='ml-3 dark:border-neutral-800' />
    </>
  ) : (
    ''
  );
}
