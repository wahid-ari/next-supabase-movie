import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SWRConfig } from 'swr';
import { useActorData } from '@libs/swr';
import axios from 'axios';
import { UserIcon } from '@heroicons/react/outline';
import moment from 'moment';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import Text from '@components/systems/Text';
import Heading from '@components/systems/Heading';
import MovieGridItem from '@components/dashboard/MovieGridItem';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export async function getServerSideProps(context) {
  // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr
  context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  const { id } = context.params;
  const res = await fetcher(`${process.env.API_ROUTE}/api/actor?id=${id}`);
  return {
    props: {
      id: id,
      fallback: {
        [`${process.env.API_ROUTE}/api/actor?id=${id}`]: res,
      },
    }, // will be passed to the page component as props
  };
}

export default function Actor({ id, fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Page id={id} />
    </SWRConfig>
  );
}

function Page({ id }) {
  const { data, error } = useActorData(id);
  const [isLoading, setLoading] = useState(true);

  if (error) {
    return (
      <Layout title='Actor Detail - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${data ? data?.name + ' - MyMovie' : 'Actor Detail - MyMovie'}`}
      description={`${data ? data?.biography : 'Actor Detail - MyMovie'}`}
    >
      <div className='flex flex-wrap items-center justify-between gap-y-3'>
        {data ? <Title>{data?.name}</Title> : <Title>Actor Detail</Title>}
      </div>

      {data ? (
        <div className='mt-4 flex flex-wrap gap-5 sm:flex-nowrap'>
          {data?.image_url.startsWith('http') ? (
            <div className='relative mx-auto h-80 w-60 overflow-hidden sm:h-96 sm:w-2/4 md:w-2/5 xl:w-1/4 2xl:w-1/5'>
              <Image
                alt={data?.name}
                title={data?.name}
                src={data?.image_url}
                fill
                className={`rounded ${isLoading ? 'blur-2xl' : 'blur-0'}`}
                onLoadingComplete={() => setLoading(false)}
              />
            </div>
          ) : (
            <div className='relative mx-auto flex h-72 w-52 items-center justify-center overflow-hidden rounded bg-neutral-200 dark:bg-neutral-800 sm:w-1/3 md:w-1/4 xl:h-96'>
              <UserIcon className='h-32 w-32 text-neutral-500' />
            </div>
          )}
          <div className='sm:w-2/3 md:w-3/4 xl:w-3/4 2xl:w-4/5'>
            <Heading className='-mt-1 mb-2'>Biography</Heading>
            <Text className='!text-[15px]'>{data.biography || '-'}</Text>
            <div className='flex flex-wrap gap-x-12'>
              <div>
                <Heading className='mt-4 mb-2'>Gender</Heading>
                <Text className='!text-[15px]'>{data.gender == 1 ? 'Male' : 'Female'}</Text>
                <Heading className='mt-4 mb-2'>Country</Heading>
                {data.countries ? (
                  <Link
                    href={`/dashboard/country/detail/${data.countries?.id}`}
                    className='rounded text-[15px] font-medium text-sky-500 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-500'
                  >
                    {data.countries?.name || '-'}
                  </Link>
                ) : (
                  '-'
                )}
              </div>
              <div>
                <Heading className='mt-4 mb-2'>Birthday</Heading>
                <Text className='!text-[15px]'>
                  {data.birthday ? (
                    <>
                      {data.birthday} ({moment().diff(data.birthday, 'years', false)} years old)
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </Text>
                <Heading className='mt-4 mb-2'>Social Media</Heading>
                {data.instagram_url == '' && data.twitter_url == '' ? (
                  <span>-</span>
                ) : (
                  <div className='flex gap-4'>
                    {data.instagram_url && (
                      <a
                        href={data.instagram_url}
                        target='_blank'
                        rel='noreferrer'
                        className='rounded text-[15px] font-medium text-sky-500 transition-all duration-300 hover:text-sky-600 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-500'
                      >
                        Instagram
                      </a>
                    )}
                    {data.twitter_url && (
                      <a
                        href={data.twitter_url}
                        target='_blank'
                        rel='noreferrer'
                        className='rounded text-[15px] font-medium text-sky-500 transition-all duration-300 hover:text-sky-600 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-500'
                      >
                        Twitter
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='mt-4 flex flex-wrap gap-5 sm:flex-nowrap'>
          <div className='mx-auto w-60 sm:w-2/4 md:w-2/5 xl:w-1/4 2xl:w-1/5'>
            <Shimer className='h-80 sm:h-96' />
          </div>
          <div className='sm:w-2/3 md:w-3/4 xl:w-3/4 2xl:w-4/5'>
            <Shimer className='h-80 sm:h-96' />
          </div>
        </div>
      )}

      {data ? (
        data?.movies.length > 0 ? (
          <>
            <Heading className='mt-8'>{data?.name} Movies</Heading>
            <div className='grid grid-cols-2 gap-8 min-[560px]:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'>
              {data.movies.map((item, index) => (
                <MovieGridItem
                  key={index}
                  href={`/dashboard/movie/detail/${item.id}`}
                  imageSrc={item.image_url}
                  title={item.name}
                  date={item.release_date}
                />
              ))}
            </div>
          </>
        ) : (
          <div className='rounded border border-red-500 p-3'>
            <p className='text-red-500'>No Movies From &quot;{data?.name}&quot; </p>
          </div>
        )
      ) : (
        <Shimer className='mt-6 !h-60' />
      )}
    </Layout>
  );
}
