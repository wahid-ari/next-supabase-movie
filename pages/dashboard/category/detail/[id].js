import { SWRConfig } from 'swr';
import { useCategoryData } from '@libs/swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import MovieGridItem from '@components/dashboard/MovieGridItem';
import nookies from 'nookies';

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  if (!cookies.token) {
    return {
      redirect: {
        destination: '/login',
      },
    };
  }
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
      <div className='flex flex-wrap items-center justify-between gap-y-3'>
        {data ? <Title>{data?.name} Movies</Title> : <Title>Category Detail</Title>}
      </div>

      {data ? (
        data?.movies.length > 0 ? (
          <>
            <div className='mt-8 grid grid-cols-2 gap-8 min-[560px]:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'>
              {data.movies.map((item, index) => (
                <MovieGridItem
                  className='!w-full'
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
          {[...Array(5).keys()].map((item) => (
            <Shimer key={item} className='!h-64 w-full' />
          ))}
        </div>
      )}
    </Layout>
  );
}
