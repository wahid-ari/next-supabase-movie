import { useState } from 'react';
import Image from 'next/image';
import { SWRConfig } from 'swr';
import { useStudioData } from '@libs/swr';
import { PhotographIcon } from '@heroicons/react/outline';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import Text from '@components/systems/Text';
import Heading from '@components/systems/Heading';
import MovieGridItem from '@components/dashboard/MovieGridItem';
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
  // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr
  context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  const { id } = context.params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/studio?id=${id}`).then((res) => res.json());
  return {
    props: {
      id: id,
      fallback: {
        [`${process.env.NEXT_PUBLIC_API_ROUTE}/api/studio?id=${id}`]: res,
      },
    }, // will be passed to the page component as props
  };
}

export default function Studio({ id, fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Page id={id} />
    </SWRConfig>
  );
}

function Page({ id }) {
  const { data, error } = useStudioData(id);
  const [isLoading, setLoading] = useState(true);

  if (error) {
    return (
      <Layout title='Studio Detail - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${data ? data?.name + ' - MyMovie' : 'Studio Detail - MyMovie'}`}
      description={`${data ? 'Browse Movies by ' + data?.name + ' - MyMovie' : 'Studio Detail - MyMovie'}`}
    >
      <div className='flex flex-wrap items-center justify-between gap-y-3'>
        {data ? <Title>{data?.name}</Title> : <Title>Studio Detail</Title>}
      </div>

      {data ? (
        <div className='my-4'>
          {data?.image_url ? (
            <div className='relative h-24 w-52 overflow-hidden'>
              <Image
                alt={data?.name}
                title={data?.name}
                src={data?.image_url}
                fill
                className={`rounded object-contain ${isLoading ? 'blur-2xl' : 'blur-0'}`}
                onLoadingComplete={() => setLoading(false)}
              />
            </div>
          ) : (
            <div className='relative flex h-28 w-28 items-center justify-center overflow-hidden rounded bg-neutral-200 dark:bg-neutral-800'>
              <PhotographIcon className='h-16 w-16 text-neutral-500' />
            </div>
          )}
          <Text className='mt-4 !text-base'>
            {data?.city}, {data?.countries?.name}
          </Text>
        </div>
      ) : (
        <Shimer className='!h-40' />
      )}

      {data ? (
        data?.movies.length > 0 ? (
          <>
            <Heading className='mt-8'>Movies by {data?.name} </Heading>
            <div className='grid grid-cols-2 gap-8 min-[560px]:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'>
              {data.movies.map((item, index) => (
                <MovieGridItem
                  className='!w-full'
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
          <div className='mt-8 rounded border border-red-500 p-3'>
            <p className='text-red-500'>No Movies From &quot;{data?.name}&quot; </p>
          </div>
        )
      ) : (
        <Shimer className='mt-6 !h-60' />
      )}
    </Layout>
  );
}
