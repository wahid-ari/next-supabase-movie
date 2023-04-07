import { useState } from 'react';
import { SWRConfig } from 'swr';
import { useCountryData } from '@libs/swr';
import Layout from '@components/front/Layout';
import Title from '@components/systems/Title';
import ActorGridItem from '@components/dashboard/ActorGridItem';
import DirectorGridItem from '@components/dashboard/DirectorGridItem';
import StudioGridItem from '@components/dashboard/StudioGridItem';
import FrontTabs from '@components/front/FrontTabs';
import Text from '@components/systems/Text';
import Button from '@components/systems/Button';
import InputDebounce from '@components/systems/InputDebounce';

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
  const [query, setQuery] = useState('');
  const [page, setPage] = useState({
    actor: 1,
    director: 1,
  });
  let lastPageActor = page.actor > data?.actors?.length / 24;
  let lastPageDirector = page.director > data?.directors?.length / 21;

  const filteredActor =
    query === ''
      ? data.actors
      : data.actors.filter((item) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  const filteredDirector =
    query === ''
      ? data.directors
      : data.directors.filter((item) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  const filteredStudio =
    query === ''
      ? data.studios
      : data.studios.filter((item) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );

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
      <div className='flex flex-wrap items-center justify-between gap-2 py-2'>
        <div>
          {data ? <Title>{data?.name}</Title> : <Title>Country Detail</Title>}
          <Text className='mt-1 !text-base'>Browse actors, directors and studios from {data?.name}</Text>
        </div>
        <InputDebounce
          id='search'
          name='search'
          wrapperClassName='pt-2'
          placeholder='Search'
          className='max-w-xs !py-2'
          debounce={500}
          value={query}
          onChange={(value) => setQuery(value)}
        />
      </div>

      <FrontTabs
        items={[
          `Actors (${filteredActor.length})`,
          `Directors (${filteredDirector.length})`,
          `Studios (${filteredStudio.length})`,
        ]}
        className='md:mt-3'
      >
        <FrontTabs.panel>
          {data.actors.length > 0 ? (
            <div className='grid grid-cols-2 gap-8 min-[500px]:grid-cols-3 min-[670px]:grid-cols-4 min-[850px]:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7'>
              {filteredActor?.slice(0, page.actor * 24).map((item, index) => (
                <ActorGridItem key={index} href={`/actors/${item.id}`} imageSrc={item.image_url} name={item.name} front />
              ))}
            </div>
          ) : (
            <div className='rounded border border-red-500 p-3'>
              <p className='text-red-500'>There are no Actors from &quot;{data?.name}&quot; </p>
            </div>
          )}
          {data && query === '' && !lastPageActor && (
            <div className='mt-10 flex justify-center'>
              <Button
                onClick={() =>
                  setPage({
                    ...page,
                    actor: page.actor + 1,
                  })
                }
              >
                Load More
              </Button>
            </div>
          )}
          {data.actors.length > 0 && query !== '' && filteredActor?.length < 1 && (
            <p className='py-32 text-center'>There are no actors with name &quot;{query}&quot;</p>
          )}
        </FrontTabs.panel>

        <FrontTabs.panel>
          {data.directors.length > 0 ? (
            <div className='grid grid-cols-2 gap-8 gap-y-10 min-[500px]:grid-cols-3 min-[670px]:grid-cols-4 min-[850px]:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7'>
              {filteredDirector?.slice(0, page.director * 21).map((item, index) => (
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
          {data && query === '' && !lastPageDirector && (
            <div className='mt-10 flex justify-center'>
              <Button
                onClick={() =>
                  setPage({
                    ...page,
                    director: page.director + 1,
                  })
                }
              >
                Load More
              </Button>
            </div>
          )}
          {data.directors.length > 0 && query !== '' && filteredDirector?.length < 1 && (
            <p className='py-32 text-center'>There are no directors with name &quot;{query}&quot;</p>
          )}
        </FrontTabs.panel>

        <FrontTabs.panel>
          {data.studios.length > 0 ? (
            <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
              {filteredStudio?.map((item, index) => (
                <StudioGridItem key={index} index={index} href={`/studios/${item.id}`} name={item.name} />
              ))}
            </div>
          ) : (
            <div className='rounded border border-red-500 p-3'>
              <p className='text-red-500'>There are no Studios from &quot;{data?.name}&quot; </p>
            </div>
          )}
          {data.studios.length > 0 && query !== '' && filteredStudio?.length < 1 && (
            <p className='py-32 text-center'>There are no studios with name &quot;{query}&quot;</p>
          )}
        </FrontTabs.panel>
      </FrontTabs>
    </Layout>
  );
}
