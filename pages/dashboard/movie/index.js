import { useState } from 'react';
import { useMoviesData } from '@libs/swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import MovieGridItem from '@components/dashboard/MovieGridItem';
import InputDebounce from '@components/systems/InputDebounce';
import nookies from 'nookies';
import Button from '@components/systems/Button';

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  if (!cookies.token) {
    return {
      redirect: {
        destination: '/login',
      },
    };
  }
  return {
    props: {},
  };
}

export default function Movies() {
  const { data, error } = useMoviesData();
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
          ? filtered.slice(0, page * 15).map((item, index) => (
              <MovieGridItem
                className='!w-full'
                key={index}
                href={`/dashboard/movie/detail/${item.id}`}
                imageSrc={item.image_url}
                title={item.name}
                date={item.release_date}
              />
            ))
          : [...Array(10).keys()].map((item) => <Shimer key={item} className='!h-64 w-full' />)}
      </div>

      {data && query === '' && !lastPage && (
        <div className='mt-8 mb-2 flex justify-center'>
          <Button onClick={() => setPage(page + 1)}>Load More</Button>
        </div>
      )}

      {query !== '' && filtered?.length < 1 && (
        <p className='py-32 text-center'>There are no movies with name &quot;{query}&quot;</p>
      )}
    </Layout>
  );
}
