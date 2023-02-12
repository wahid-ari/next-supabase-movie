import useSWR from 'swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((result) => result.json());

export default function Countries() {
  const { data, error } = useSWR(
    `${process.env.API_ROUTE}/api/country`,
    fetcher
  );

  if (error) {
    return (
      <Layout title='Countries - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>
          Failed to load
        </div>
      </Layout>
    );
  }

  return (
    <Layout title='Countries - MyMovie'>
      <Title>Countries</Title>

      <div className='mt-8 grid grid-cols-2 gap-8 min-[560px]:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'>
        {data
          ? data.map((item, index) => (
              <Link
                key={index}
                href={`/dashboard/country/detail/${item.id}`}
                className='flex items-center justify-between rounded border p-3 text-[15px] font-medium text-neutral-600 shadow transition-all duration-300 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-neutral-800 dark:bg-[#1a1919] dark:text-neutral-200 dark:hover:text-emerald-500'
              >
                {item.name}
              </Link>
            ))
          : [0, 1, 2, 3, 4].map((item) => (
              <Shimer key={item} className='!h-16 w-full' />
            ))}
      </div>
    </Layout>
  );
}
