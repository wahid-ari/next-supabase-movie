import useSWR from 'swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import DirectorGridItem from '@components/dashboard/DirectorGridItem';

const fetcher = (url) => fetch(url).then((result) => result.json());

export default function Director() {
  const { data, error } = useSWR(`${process.env.API_ROUTE}/api/director`, fetcher);

  if (error) {
    return (
      <Layout title='Dashboard - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Directors - MyMovie' description='Browse Directors - MyMovie'>
      <Title>Directors</Title>

      <div className='mt-8 grid grid-cols-2 gap-6 gap-y-8 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-6'>
        {data
          ? data.map((item, index) => (
              <DirectorGridItem
                key={index}
                href={`/dashboard/director/detail/${item.id}`}
                imageSrc={item.image_url}
                name={item.name}
              />
            ))
          : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((item) => (
              <div key={item} className='flex items-center justify-center'>
                <Shimer className='!mx-8 !h-32 !w-32 !rounded-full' />
              </div>
            ))}
      </div>
    </Layout>
  );
}
