import useSWR from 'swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import MovieGridItem from '@components/dashboard/MovieGridItem';

const fetcher = (url) => fetch(url).then((result) => result.json());

export default function Movies() {
  const { data, error } = useSWR(`${process.env.API_ROUTE}/api/movie`, fetcher);

  if (error) {
    return (
      <Layout title='Dashboard - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>
          Failed to load
        </div>
      </Layout>
    );
  }

  return (
    <Layout title='Movies - MyMovie'>
      <Title>Movies</Title>

      <div className='mt-8 grid grid-cols-2 gap-8 min-[560px]:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'>
        {data
          ? data.map((item, index) => (
              <MovieGridItem
                key={index}
                href={`/dashboard/movie/detail/${item.id}`}
                imageSrc={item.image_url}
                title={item.name}
                date={item.release_date}
              />
            ))
          : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <Shimer key={item} className='!h-64 w-full' />
            ))}
      </div>
    </Layout>
  );
}
