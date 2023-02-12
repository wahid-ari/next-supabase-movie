import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Text from '@components/systems/Text';
import { PhotographIcon } from '@heroicons/react/outline';

export default function DirectorGridItem({
  href = '#',
  imageSrc,
  name,
  ...props
}) {
  const [isLoading, setLoading] = useState(true);
  const sizes = `(max-width: 360px) 100vw, (max-width: 480px) 50vw, 33vw`;

  return (
    <Link
      href={href}
      className='group mx-auto w-32 max-w-[8rem] rounded text-center focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500'
      {...props}
    >
      <div className='relative mx-auto mb-3 h-32 w-32 max-w-[8rem] overflow-hidden'>
        {imageSrc ? (
          <Image
            alt={name}
            src={imageSrc}
            className={`transform rounded-full object-cover brightness-90 transition duration-500 ease-in-out will-change-auto group-hover:brightness-110
            ${isLoading ? 'blur-2xl' : 'blur-0'}`}
            fill
            sizes={sizes}
            onLoadingComplete={() => setLoading(false)}
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800'>
            <PhotographIcon className='h-16 w-16 text-neutral-500' />
          </div>
        )}
      </div>
      <Text.medium className='transition-all duration-500 group-hover:text-emerald-500'>
        {name}
      </Text.medium>
    </Link>
  );
}
