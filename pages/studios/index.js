import { useState } from 'react';
import { useStudioData } from '@libs/swr';
import Layout from '@components/front/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import InputDebounce from '@components/systems/InputDebounce';
import Button from '@components/systems/Button';
import StudioImageGridItem from '@components/front/StudioImageGridItem';

export default function Actors() {
  const { data, error } = useStudioData();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  let lastPage = page > data?.length / 15;

  const filtered =
    query === ''
      ? data
      : data.filter((item) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  if (error) {
    return (
      <Layout title='Studios - MyMovie' description='Browse Studios - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Studios - MyMovie' description='Browse Studios - MyMovie'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <Title>Studios</Title>
        <InputDebounce
          id='search'
          name='search'
          wrapperClassName='pt-2'
          placeholder='Search Studio'
          className='max-w-xs !py-2'
          debounce={500}
          value={query}
          onChange={(value) => setQuery(value)}
        />
      </div>

      {data ? (
        <div className='mt-6 grid grid-cols-1 gap-8 sm:mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {filtered.slice(0, page * 15).map((item, index) => (
            <StudioImageGridItem key={index} href={`/studios/${item.id}`} imageSrc={item.image_url} name={item.name} />
          ))}
        </div>
      ) : (
        <div className='mt-6 grid grid-cols-1 gap-8 sm:mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {[...Array(15).keys()].map((item) => (
            <Shimer key={item} className='!h-36 w-full' />
          ))}
        </div>
      )}

      {data && query === '' && !lastPage && (
        <div className='mt-10 flex justify-center'>
          <Button onClick={() => setPage(page + 1)}>Load More</Button>
        </div>
      )}

      {query !== '' && filtered?.length < 1 && (
        <p className='py-32 text-center'>There are no studios with name &quot;{query}&quot;</p>
      )}
    </Layout>
  );
}
