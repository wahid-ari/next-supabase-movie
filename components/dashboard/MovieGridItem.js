import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Text from '@components/systems/Text';
import { PhotographIcon } from '@heroicons/react/outline';

export default function MovieGridItem({ href = '#', imageSrc, title, description, date, ...props }) {
  const [isLoading, setLoading] = useState(true);
  const sizes = `(max-width: 360px) 100vw, (max-width: 480px) 50vw, 33vw`;

  return (
    <Link
      href={href}
      className='group mx-auto w-40 rounded border shadow focus-visible:outline-none focus-visible:ring focus-visible:ring-sky-500 dark:border-neutral-800 sm:w-[12rem]'
      {...props}
    >
      <div className='relative h-56 w-full overflow-hidden sm:h-64'>
        {imageSrc ? (
          <Image
            alt={title}
            src={imageSrc}
            className={`transform rounded-t brightness-90 transition duration-500 ease-in-out will-change-auto group-hover:brightness-110
          ${isLoading ? 'blur-2xl' : 'blur-0'}`}
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
      <div className='p-3.5'>
        <Text.semibold className='mb-1 !text-[15px] transition-all duration-500 line-clamp-2 group-hover:text-sky-500'>
          {title}
        </Text.semibold>
        <span className='text-[13px] text-neutral-600 dark:text-neutral-400'>{date}</span>
      </div>
    </Link>
  );
}
