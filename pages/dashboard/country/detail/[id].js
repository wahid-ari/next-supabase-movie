import { SWRConfig } from 'swr';
import axios from 'axios';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import ActorGridItem from '@components/dashboard/ActorGridItem';
import Heading from '@components/systems/Heading';
import DirectorGridItem from '@components/dashboard/DirectorGridItem';
import StudioGridItem from '@components/dashboard/StudioGridItem';
import { useCountryData } from '@libs/swr';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export async function getServerSideProps(context) {
  // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr
  context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  const { id } = context.params;
  const res = await fetcher(`${process.env.API_ROUTE}/api/country?id=${id}`);
  return {
    props: {
      id: id,
      fallback: {
        [`${process.env.API_ROUTE}/api/country?id=${id}`]: res,
      },
    }, // will be passed to the page component as props
  };
}

export default function Country({ id, fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Page id={id} />
    </SWRConfig>
  );
}

function Page({ id }) {
  const { data, error } = useCountryData(id);

  if (error) {
    return (
      <Layout title='Country Detail - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${data ? data?.name + ' - MyMovie' : 'Country Detail - MyMovie'}`}
      description={`${
        data ? 'Browse Actors, Directors and Studio from ' + data?.name + ' - MyMovie' : 'Country Detail - MyMovie'
      }`}
    >
      <div className='flex flex-wrap items-center justify-between gap-y-3'>
        {data ? <Title>{data?.name}</Title> : <Title>Country Detail</Title>}
      </div>

      {data ? (
        data.actors.length > 0 ? (
          <>
            <Heading h3 className='mt-6'>
              Actors
            </Heading>
            <div className='mt-4 grid grid-cols-2 gap-8 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8'>
              {data.actors?.map((item, index) => (
                <ActorGridItem
                  key={index}
                  href={`/dashboard/actor/detail/${item.id}`}
                  imageSrc={item.image_url}
                  name={item.name}
                />
              ))}
            </div>
          </>
        ) : null
      ) : (
        <div className='mt-10 grid grid-cols-2 gap-8 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8'>
          {[0, 1, 2, 3, 4, 5, 6].map((item) => (
            <Shimer key={item} className='!h-52 w-full' />
          ))}
        </div>
      )}

      {data ? (
        data.directors.length > 0 ? (
          <>
            <Heading h3 className='mt-10'>
              Directors
            </Heading>
            <div className='mt-4 grid grid-cols-2 gap-6 gap-y-8 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-6'>
              {data.directors?.map((item, index) => (
                <DirectorGridItem
                  key={index}
                  href={`/dashboard/director/detail/${item.id}`}
                  imageSrc={item.image_url}
                  name={item.name}
                />
              ))}
            </div>
          </>
        ) : null
      ) : null}

      {data ? (
        data.studios.length > 0 ? (
          <>
            <Heading h3 className='mt-10'>
              Studios
            </Heading>
            <div className='mt-4 grid grid-cols-2 gap-4 md:grid-cols-4'>
              {data.studios?.map((item, index) => (
                <StudioGridItem
                  key={index}
                  index={index}
                  href={`/dashboard/studio/detail/${item.id}`}
                  name={item.name}
                />
              ))}
            </div>
          </>
        ) : null
      ) : null}
    </Layout>
  );
}
