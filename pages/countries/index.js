import { useState } from 'react';
import { useCountryData } from '@libs/swr';
import Layout from '@components/front/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import Link from 'next/link';
import InputDebounce from '@components/systems/InputDebounce';
import clsx from 'clsx';

export default function Countries() {
  const { data, error } = useCountryData();
  const [query, setQuery] = useState('');

  const filtered =
    query === ''
      ? data
      : data.filter((item) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  if (error) {
    return (
      <Layout title='Countries - MyMovie' description='Browse Countries - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Countries - MyMovie' description='Browse Countries - MyMovie'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <Title>Countries</Title>
        <InputDebounce
          id='search'
          name='search'
          wrapperClassName='pt-2'
          placeholder='Search Country'
          className='max-w-xs !py-2'
          debounce={500}
          value={query}
          onChange={(value) => setQuery(value)}
        />
      </div>

      {data ? (
        <div className='mt-4 grid grid-cols-2 gap-8 min-[560px]:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'>
          {filtered.map((item, index) => (
            <Link
              key={index}
              href={`/countries/${item.id}`}
              className='flex items-center justify-between rounded border p-3 text-[15px] font-medium text-neutral-600 shadow transition-all duration-300 hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-neutral-800 dark:bg-[#1a1919] dark:text-neutral-200 dark:hover:text-sky-500'
            >
              {item.name}
            </Link>
          ))}
        </div>
      ) : (
        <div className='mt-4 grid grid-cols-2 gap-x-8 gap-y-5 min-[560px]:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'>
          {[...Array(15).keys()].map((item) => (
            <Shimer key={item} className='!h-12 w-full' />
          ))}
        </div>
      )}
    </Layout>
  );
}
