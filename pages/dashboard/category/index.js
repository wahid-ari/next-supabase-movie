import { useState } from 'react';
import useSWR from 'swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import Link from 'next/link';
import InputDebounce from '@components/systems/InputDebounce';

const fetcher = (url) => fetch(url).then((result) => result.json());

export default function Categories() {
  const { data, error } = useSWR(`${process.env.API_ROUTE}/api/category/total-movie`, fetcher);
  const [query, setQuery] = useState('');

  const filtered =
    query === ''
      ? data
      : data.filter((item) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  if (error) {
    return (
      <Layout title='Categories - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Categories - MyMovie' description='Browse Categories - MyMovie'>
      <Title>Categories</Title>

      <InputDebounce
        label='Search Category'
        id='search'
        name='search'
        placeholder='Category Name'
        className='max-w-xs !py-2'
        wrapperClassName='mt-6'
        debounce={500}
        value={query}
        onChange={(value) => setQuery(value)}
      />

      <div className='mt-8 grid grid-cols-2 gap-8 min-[560px]:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'>
        {data
          ? filtered.map((item, index) => (
              <Link
                key={index}
                href={`/dashboard/category/detail/${item.id}`}
                className='flex items-center justify-between rounded border p-4 text-base font-medium text-neutral-600 transition-all duration-300 hover:bg-gradient-to-r hover:from-sky-500 hover:to-sky-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-neutral-800 dark:text-neutral-200 dark:hover:text-white'
              >
                <span>{item.name}</span>
                {item.total}
              </Link>
            ))
          : [0, 1, 2, 3, 4].map((item) => <Shimer key={item} className='!h-16 w-full' />)}
      </div>
    </Layout>
  );
}
