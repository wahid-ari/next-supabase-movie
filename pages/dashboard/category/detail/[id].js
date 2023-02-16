import useSWR from 'swr';
import axios from 'axios';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import MovieGridItem from '@components/dashboard/MovieGridItem';

export async function getServerSideProps(context) {
  const { id } = context.params;
  return {
    props: {
      id: id,
    }, // will be passed to the page component as props
  };
}

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Category({ id }) {
  const { data, error } = useSWR(`${process.env.API_ROUTE}/api/category?id=${id}`, fetcher);

  if (error) {
    return (
      <Layout title='Category Detail - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title={`${data ? data?.name + ' Movies - MyMovie' : 'Category Detail - MyMovie'}`}>
      <div className='flex flex-wrap items-center justify-between gap-y-3'>
        {data ? <Title>{data?.name} Movies</Title> : <Title>Category Detail</Title>}
      </div>

      {data ? (
        data?.movies.length > 0 ? (
          <>
            <div className='mt-8 grid grid-cols-2 gap-8 min-[560px]:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'>
              {data.movies.map((item, index) => (
                <MovieGridItem
                  key={index}
                  href={`/dashboard/movie/detail/${item.id}`}
                  imageSrc={item.image_url}
                  title={item.name}
                  date={item.release_date}
                />
              ))}
            </div>
          </>
        ) : (
          <div className='mt-8 rounded border border-red-500 p-3'>
            <p className='text-red-500'>No Movies in &quot;{data?.name}&quot; </p>
          </div>
        )
      ) : (
        <div className='mt-8 grid grid-cols-2 gap-8 min-[560px]:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'>
          {[0, 1, 2, 3, 4].map((item) => (
            <Shimer key={item} className='!h-64 w-full' />
          ))}
        </div>
      )}
    </Layout>
  );
}
