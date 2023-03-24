import { useState } from 'react';
import { useCategoryTotalData } from '@libs/swr';
import Layout from '@components/front/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import Link from 'next/link';
import InputDebounce from '@components/systems/InputDebounce';
import clsx from 'clsx';

export default function Categories() {
  const { data, error } = useCategoryTotalData();
  const [query, setQuery] = useState('');

  const filtered =
    query === ''
      ? data
      : data.filter((item) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  if (error) {
    return (
      <Layout title='Categories - MyMovie' description='Browse Categories - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Categories - MyMovie' description='Browse Categories - MyMovie'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <Title>Categories</Title>
        <InputDebounce
          id='search'
          name='search'
          wrapperClassName='pt-2'
          placeholder='Search Category'
          className='w-48 !py-2 sm:max-w-xs'
          debounce={500}
          value={query}
          onChange={(value) => setQuery(value)}
        />
      </div>

      {data ? (
        <div className='mt-4 grid grid-cols-1 gap-8 min-[400px]:grid-cols-2 min-[560px]:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'>
          {filtered.map((item, index) => (
            <Link
              key={index}
              href={`/categories/${item.id}`}
              className={clsx(
                'flex items-center justify-between rounded border p-4 text-base font-medium',
                'transition-all duration-300 hover:bg-gradient-to-r hover:from-sky-500 hover:to-sky-700',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-neutral-800',
                'text-neutral-600 hover:text-white dark:text-neutral-200 dark:hover:text-white'
              )}
            >
              <span>{item.name}</span>
              {item.total}
            </Link>
          ))}
        </div>
      ) : (
        <div className='mt-4 grid grid-cols-1 gap-x-8 gap-y-5 min-[400px]:grid-cols-2 min-[560px]:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'>
          {[...Array(15).keys()].map((item) => (
            <Shimer key={item} className='!h-14 w-full' />
          ))}
        </div>
      )}
    </Layout>
  );
}
