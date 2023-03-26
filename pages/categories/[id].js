import { useState } from 'react';
import { SWRConfig } from 'swr';
import { useCategoryData } from '@libs/swr';
import Layout from '@components/front/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import MovieGridItem from '@components/dashboard/MovieGridItem';
import InputDebounce from '@components/systems/InputDebounce';
import Button from '@components/systems/Button';

export async function getServerSideProps(context) {
  // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr
  context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  const { id } = context.params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/category?id=${id}`).then((res) => res.json());
  return {
    props: {
      id: id,
      fallback: {
        [`${process.env.NEXT_PUBLIC_API_ROUTE}/api/category?id=${id}`]: res,
      },
    }, // will be passed to the page component as props
  };
}

export default function Category({ id, fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Page id={id} />
    </SWRConfig>
  );
}

function Page({ id }) {
  const { data, error } = useCategoryData(id);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  let lastPage = page > data?.movies?.length / 18;

  const filtered =
    query === ''
      ? data.movies
      : data.movies.filter((item) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  if (error) {
    return (
      <Layout title='Category Detail - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${data ? data?.name + ' Movies - MyMovie' : 'Category Detail - MyMovie'}`}
      description={`${data ? 'Browse ' + data?.name + ' Movies - MyMovie' : 'Category Detail - MyMovie'}`}
    >
      <div className='flex flex-wrap items-center justify-between gap-2 py-2'>
        {data ? <Title>{data?.name} Movies</Title> : <Title>Category Detail</Title>}
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
        data?.movies.length > 0 ? (
          <>
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
          </>
        ) : (
          <div className='mt-4 rounded border border-red-500 p-3'>
            <p className='text-red-500'>No Movies in &quot;{data?.name}&quot; </p>
          </div>
        )
      ) : (
        <div className='mt-4 grid grid-cols-2 gap-4 min-[500px]:grid-cols-3 md:gap-8 min-[800px]:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
          {[...Array(5).keys()].map((item) => (
            <Shimer key={item} className='!h-64 w-full' />
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
