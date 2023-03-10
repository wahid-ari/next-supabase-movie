import Image from 'next/image';
import Link from 'next/link';

export default function Footer({ className }) {
  return (
    <footer className={`border-t dark:border-neutral-800 ${className && className}`}>
      <div className='mx-auto max-w-7xl px-4 pt-10 pb-6 '>
        <div className='gap-16 md:flex md:justify-between'>
          <div className='mb-6 md:mb-0 md:w-2/5'>
            {/* web logo  */}
            <Link href='/' passHref className='group inline-flex rounded focus-visible:outline-none'>
              <div className='flex items-center rounded font-medium text-neutral-900 group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-sky-500'>
                <Image alt='Logo' src='/icon.jpg' width={30} height={30} className='mr-2 rounded-lg' />
                <span className='text-xl font-semibold text-neutral-800 dark:text-neutral-200'>MyMovie</span>
              </div>
            </Link>
            {/* web logo  */}
            <p className='mt-4 pb-2 pr-4 text-[15px] text-neutral-700 dark:text-neutral-300'>
              Find Information and statistics about movies, actors, directors and other film industry professionals.
            </p>
          </div>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 md:w-2/4 md:grid-cols-3'>
            <div>
              <h2 className='mb-4 text-sm font-semibold uppercase text-neutral-800 dark:text-neutral-200'>Resources</h2>
              <ul className='text-neutral-700 dark:text-neutral-300'>
                <li className='mb-2'>
                  <a
                    href='https://flowbite.com/'
                    className='rounded text-[15px] hover:text-neutral-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:hover:text-neutral-100'
                  >
                    Flowbite
                  </a>
                </li>
                <li>
                  <a
                    href='https://tailwindcss.com/'
                    className='rounded text-[15px] hover:text-neutral-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:hover:text-neutral-100'
                  >
                    Tailwind CSS
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className='mb-4 text-sm font-semibold uppercase text-neutral-800 dark:text-neutral-200'>Follow us</h2>
              <ul className='text-neutral-700 dark:text-neutral-300'>
                <li className='mb-2'>
                  <a
                    href='https://github.com/themesberg/flowbite'
                    className='rounded text-[15px] hover:text-neutral-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:hover:text-neutral-100'
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href='https://discord.gg/4eeurUVvTy'
                    className='rounded text-[15px] hover:text-neutral-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:hover:text-neutral-100'
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className='mb-4 text-sm font-semibold uppercase text-neutral-800 dark:text-neutral-200'>Resources</h2>
              <ul className='text-neutral-700 dark:text-neutral-300'>
                <li className='mb-2'>
                  <a
                    href='https://github.com'
                    target='_blank'
                    className='rounded text-[15px] hover:text-neutral-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:hover:text-neutral-100'
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href='https://github.com'
                    target='_blank'
                    className='rounded text-[15px] hover:text-neutral-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:hover:text-neutral-100'
                  >
                    API Docs
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className='mt-8 mb-6 border-t dark:border-neutral-800 sm:mx-auto md:mt-6' />
        <div className='sm:flex sm:items-center sm:justify-between'>
          <span className='text-sm text-neutral-700 dark:text-neutral-300 sm:text-center'>
            © 2023{' '}
            <Link
              href='/'
              className='rounded transition-all duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
            >
              MyMovie™
            </Link>
            . All Rights Reserved.
          </span>
          <div className='mt-4 flex space-x-6 sm:mt-0 sm:justify-center'>
            <a
              href='#'
              className='rounded text-neutral-700 transition-all duration-200 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-neutral-300 dark:hover:text-white'
            >
              <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                <path
                  fillRule='evenodd'
                  d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='sr-only'>Instagram page</span>
            </a>
            <a
              href='#'
              className='rounded text-neutral-700 transition-all duration-200 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-neutral-300 dark:hover:text-white'
            >
              <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
              </svg>
              <span className='sr-only'>Twitter page</span>
            </a>
            <a
              href='https://github.com'
              target='_blank'
              className='rounded text-neutral-700 transition-all duration-200 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-neutral-300 dark:hover:text-white'
            >
              <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                <path
                  fillRule='evenodd'
                  d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='sr-only'>GitHub account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
