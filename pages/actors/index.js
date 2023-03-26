import { useState } from 'react';
import { useActorsData } from '@libs/swr';
import Layout from '@components/front/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import ActorGridItem from '@components/dashboard/ActorGridItem';
import InputDebounce from '@components/systems/InputDebounce';
import Button from '@components/systems/Button';

export default function Actors() {
  const { data, error } = useActorsData();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  let lastPage = page > data?.length / 21;

  const filtered =
    query === ''
      ? data
      : data.filter((item) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  if (error) {
    return (
      <Layout title='Actors - MyMovie' description='Browse Actors - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Actors - MyMovie' description='Browse Actors - MyMovie'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <Title>Actors</Title>
        <InputDebounce
          id='search'
          name='search'
          wrapperClassName='pt-2'
          placeholder='Search Actor'
          className='max-w-xs !py-2'
          debounce={500}
          value={query}
          onChange={(value) => setQuery(value)}
        />
      </div>

      {data ? (
        <div className='mt-4 grid grid-cols-2 gap-8 min-[500px]:grid-cols-3 min-[670px]:grid-cols-4 min-[850px]:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7'>
          {filtered.slice(0, page * 21).map((item, index) => (
            <ActorGridItem key={index} href={`/actors/${item.id}`} imageSrc={item.image_url} name={item.name} front />
          ))}
        </div>
      ) : (
        <div className='mt-4 grid grid-cols-2 gap-5 min-[500px]:grid-cols-3 min-[670px]:grid-cols-4 min-[850px]:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7'>
          {[...Array(21).keys()].map((item) => (
            <Shimer key={item} className='!h-60 w-full' />
          ))}
        </div>
      )}

      {data && query === '' && !lastPage && (
        <div className='mt-10 flex justify-center'>
          <Button onClick={() => setPage(page + 1)}>Load More</Button>
        </div>
      )}

      {query !== '' && filtered?.length < 1 && (
        <p className='py-32 text-center'>There are no actors with name &quot;{query}&quot;</p>
      )}
    </Layout>
  );
}
