import { SWRConfig } from 'swr';
import { useCountryData } from '@libs/swr';
import Layout from '@components/front/Layout';
import Title from '@components/systems/Title';
import ActorGridItem from '@components/dashboard/ActorGridItem';
import DirectorGridItem from '@components/dashboard/DirectorGridItem';
import StudioGridItem from '@components/dashboard/StudioGridItem';
import FrontTabs from '@components/front/FrontTabs';

export async function getServerSideProps(context) {
  // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr
  context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  const { id } = context.params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/country?id=${id}`).then((res) => res.json());
  return {
    props: {
      id: id,
      fallback: {
        [`${process.env.NEXT_PUBLIC_API_ROUTE}/api/country?id=${id}`]: res,
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
      <div className='py-2'>{data ? <Title>{data?.name}</Title> : <Title>Country Detail</Title>}</div>

      <FrontTabs
        items={[
          `Actors (${data.actors.length})`,
          `Directors (${data.directors.length})`,
          `Studios (${data.studios.length})`,
        ]}
        className='mt-5'
      >
        <FrontTabs.panel>
          {data.actors.length > 0 ? (
            <div className='grid grid-cols-2 gap-8 min-[500px]:grid-cols-3 min-[670px]:grid-cols-4 min-[850px]:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7'>
              {data.actors?.map((item, index) => (
                <ActorGridItem
                  key={index}
                  href={`/actors/${item.id}`}
                  imageSrc={item.image_url}
                  name={item.name}
                  front
                />
              ))}
            </div>
          ) : (
            <div className='rounded border border-red-500 p-3'>
              <p className='text-red-500'>There are no Actors from &quot;{data?.name}&quot; </p>
            </div>
          )}
        </FrontTabs.panel>
        <FrontTabs.panel>
          {data.directors.length > 0 ? (
            <div className='grid grid-cols-2 gap-8 gap-y-10 min-[500px]:grid-cols-3 min-[670px]:grid-cols-4 min-[850px]:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7'>
              {data.directors?.map((item, index) => (
                <DirectorGridItem
                  key={index}
                  href={`/directors/${item.id}`}
                  imageSrc={item.image_url}
                  name={item.name}
                />
              ))}
            </div>
          ) : (
            <div className='rounded border border-red-500 p-3'>
              <p className='text-red-500'>There are no Directors from &quot;{data?.name}&quot; </p>
            </div>
          )}
        </FrontTabs.panel>
        <FrontTabs.panel>
          {data.studios.length > 0 ? (
            <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
              {data.studios?.map((item, index) => (
                <StudioGridItem key={index} index={index} href={`/studios/${item.id}`} name={item.name} />
              ))}
            </div>
          ) : (
            <div className='rounded border border-red-500 p-3'>
              <p className='text-red-500'>There are no Studios from &quot;{data?.name}&quot; </p>
            </div>
          )}
        </FrontTabs.panel>
      </FrontTabs>
    </Layout>
  );
}
