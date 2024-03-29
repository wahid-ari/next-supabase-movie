import { useState } from 'react';
import { useCountryData } from '@libs/swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import Link from 'next/link';
import InputDebounce from '@components/systems/InputDebounce';
import nookies from 'nookies';

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  if (!cookies.token) {
    return {
      redirect: {
        destination: '/login',
      },
    };
  }
  return {
    props: {},
  };
}

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
      <Layout title='Countries - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Countries - MyMovie' description='Browse Countries - MyMovie'>
      <Title>Countries</Title>

      <InputDebounce
        label='Search Country'
        id='search'
        name='search'
        placeholder='Country Name'
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
                href={`/dashboard/country/detail/${item.id}`}
                className='flex items-center justify-between rounded border p-3 text-[15px] font-medium text-neutral-600 shadow transition-all duration-300 hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-neutral-800 dark:bg-[#1a1919] dark:text-neutral-200 dark:hover:text-sky-500'
              >
                {item.name}
              </Link>
            ))
          : [...Array(5).keys()].map((item) => <Shimer key={item} className='!h-16 w-full' />)}
      </div>
    </Layout>
  );
}
