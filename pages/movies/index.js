import { useState } from 'react';
import { useMoviesData } from '@libs/swr';
import Layout from '@components/front/Layout';
import MovieGridItem from '@components/dashboard/MovieGridItem';
import Shimer from '@components/systems/Shimer';
import Title from '@components/systems/Title';
import InputDebounce from '@components/systems/InputDebounce';
import Button from '@components/systems/Button';

export default function Movies() {
  const { data, error } = useMoviesData();
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  let lastPage = page > data?.length / 18;

  const filtered =
    query === ''
      ? data
      : data.filter((item) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  if (error) {
    return (
      <Layout title='Movies - MyMovie' description='Browse Movies - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Movies - MyMovie' description='Browse Movies - MyMovie'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <Title>Movies</Title>
        <InputDebounce
          id='search'
          name='search'
          wrapperClassName='pt-2'
          placeholder='Search Movie'
          className='max-w-xs !py-2'
          debounce={500}
          value={query}
          onChange={(value) => setQuery(value)}
        />
      </div>

      {data ? (
        <div className='mt-4 grid grid-cols-2 gap-4 min-[500px]:grid-cols-3 md:gap-8 min-[800px]:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
          {filtered.slice(0, page * 18).map((item, index) => (
            <MovieGridItem
              className='!w-full'
              key={index}
              href={`/movies/${item.id}`}
              imageSrc={item.image_url}
              title={item.name}
              date={item.release_date}
            />
          ))}
        </div>
      ) : (
        <div className='mt-4 grid grid-cols-2 gap-4 min-[500px]:grid-cols-3 md:gap-8 min-[800px]:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
          {[...Array(18).keys()].map((item) => (
            <Shimer key={item} className='!h-72 w-full' />
          ))}
        </div>
      )}

      {data && query === '' && !lastPage && (
        <div className='mt-10 flex justify-center'>
          <Button onClick={() => setPage(page + 1)}>Load More</Button>
        </div>
      )}

      {query !== '' && filtered?.length < 1 && (
        <p className='py-32 text-center'>There are no movies with name &quot;{query}&quot;</p>
      )}
    </Layout>
  );
}
