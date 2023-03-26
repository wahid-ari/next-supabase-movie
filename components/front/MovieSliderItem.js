import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Text from '@components/systems/Text';
import { PhotographIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

export default function MovieSliderItem({ href = '#', imageSrc, title, description, date, ...props }) {
  const [isLoading, setLoading] = useState(true);
  const sizes = `(max-width: 360px) 100vw, (max-width: 480px) 50vw, 33vw`;

  return (
    <Link href={href} className='group rounded focus-visible:outline-none' {...props}>
      <div className='m-1 h-[320px] rounded border shadow dark:border-neutral-800 sm:h-[354px]'>
        <div className='relative h-56 w-full overflow-hidden sm:h-64'>
          {imageSrc ? (
            <Image
              alt={title}
              src={imageSrc}
              className={clsx(
                'rounded-t brightness-90 group-hover:brightness-110',
                'transform transition duration-500 ease-in-out will-change-auto',
                isLoading ? 'blur-2xl' : 'blur-0'
              )}
              fill
              sizes={sizes}
              onLoadingComplete={() => setLoading(false)}
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center rounded-t bg-neutral-200 dark:bg-neutral-800'>
              <PhotographIcon className='h-16 w-16 text-neutral-500' />
            </div>
          )}
        </div>
        <div className='px-2.5 py-3'>
          <Text.medium
            className={clsx(
              'rounded px-1 py-0.5 !text-[15px] transition-all duration-500 line-clamp-2',
              'group-hover:text-sky-500 group-focus-visible:ring-2 group-focus-visible:ring-sky-500'
            )}
          >
            {title}
          </Text.medium>
          <span className='px-1 text-[13px] text-neutral-600 dark:text-neutral-400'>{date}</span>
        </div>
      </div>
    </Link>
  );
}
