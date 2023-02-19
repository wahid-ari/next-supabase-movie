import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Text from '@components/systems/Text';
import { PhotographIcon } from '@heroicons/react/outline';

export default function MovieListItem({ href = '#', imageSrc, name, description, date, ...props }) {
  const [isLoading, setLoading] = useState(true);
  const sizes = `(max-width: 360px) 100vw, (max-width: 480px) 50vw, 33vw`;

  return (
    <Link
      href={href}
      className='group flex gap-4 rounded border shadow focus-visible:outline-none focus-visible:ring focus-visible:ring-sky-500 dark:border-neutral-800'
      {...props}
    >
      <div className='w-[88px]'>
        <div className='relative h-32 w-[88px] overflow-hidden'>
          {imageSrc ? (
            <Image
              alt={name}
              src={imageSrc}
              className={`transform rounded-l brightness-90 transition duration-500 ease-in-out will-change-auto group-hover:brightness-110
            ${isLoading ? 'blur-2xl' : 'blur-0'}`}
              fill
              sizes={sizes}
              onLoadingComplete={() => setLoading(false)}
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center rounded-l bg-neutral-200 dark:bg-neutral-800'>
              <PhotographIcon className='h-16 w-16 text-neutral-500' />
            </div>
          )}
        </div>
      </div>
      <div className='pt-3.5 pr-3'>
        <Text.semibold className='mb-1 !text-[15px] transition-all duration-500 line-clamp-2 group-hover:text-sky-500'>
          {name}
        </Text.semibold>
        <span className='text-[13px] text-neutral-600 dark:text-neutral-400'>{date}</span>
        <Text className='mt-2 font-normal line-clamp-2'>{description}</Text>
      </div>
    </Link>
  );
}
