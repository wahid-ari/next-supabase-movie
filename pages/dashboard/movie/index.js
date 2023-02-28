import { useState } from 'react';
import { useMovieData } from '@libs/swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import MovieGridItem from '@components/dashboard/MovieGridItem';
import InputDebounce from '@components/systems/InputDebounce';

export default function Movies() {
  const { data, error } = useMovieData();
  const [query, setQuery] = useState('');

  const filtered =
    query === ''
      ? data
      : data.filter((item) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  if (error) {
    return (
      <Layout title='Dashboard - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Movies - MyMovie' description='Browse Movies - MyMovie'>
      <Title>Movies</Title>

      <InputDebounce
        label='Search Movie'
        id='search'
        name='search'
        placeholder='Movie Name'
        className='max-w-xs !py-2'
        wrapperClassName='mt-6'
        debounce={500}
        value={query}
        onChange={(value) => setQuery(value)}
      />

      <div className='mt-8 grid grid-cols-2 gap-8 min-[560px]:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'>
        {data
          ? filtered.map((item, index) => (
              <MovieGridItem
                key={index}
                href={`/dashboard/movie/detail/${item.id}`}
                imageSrc={item.image_url}
                title={item.name}
                date={item.release_date}
              />
            ))
          : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => <Shimer key={item} className='!h-64 w-full' />)}
      </div>
    </Layout>
  );
}
