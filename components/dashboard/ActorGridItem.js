import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Text from '@components/systems/Text';
import { PhotographIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

export default function ActorGridItem({ href = '#', imageSrc, name, front, ...props }) {
  const [isLoading, setLoading] = useState(true);
  const sizes = `(max-width: 360px) 100vw, (max-width: 480px) 50vw, 33vw`;

  return (
    <Link
      href={href}
      className={clsx(
        'group mx-auto rounded border shadow dark:border-neutral-800',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
        front ? 'w-40' : 'w-32'
      )}
      {...props}
    >
      <div className={`relative overflow-hidden ${front ? 'h-[220px]' : 'h-[180px]'}`}>
        {imageSrc ? (
          <Image
            alt={name}
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
      <div className='p-3 pb-2'>
        <Text.medium className='mb-1 !text-[15px] transition-all duration-500 line-clamp-2 group-hover:text-sky-500'>
          {name}
        </Text.medium>
      </div>
    </Link>
  );
}
