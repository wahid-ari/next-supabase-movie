import { useState } from 'react';
import { useDirectorsData } from '@libs/swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import DirectorGridItem from '@components/dashboard/DirectorGridItem';
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

export default function Director() {
  const { data, error } = useDirectorsData();
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
      <Layout title='Dashboard - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Directors - MyMovie' description='Browse Directors - MyMovie'>
      <Title>Directors</Title>

      <InputDebounce
        label='Search Director'
        id='search'
        name='search'
        placeholder='Director Name'
        className='max-w-xs !py-2'
        wrapperClassName='mt-6'
        debounce={500}
        value={query}
        onChange={(value) => setQuery(value)}
      />

      <div className='mt-8 grid grid-cols-2 gap-6 gap-y-8 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-6'>
        {data
          ? filtered
              .slice(0, page * 18)
              .map((item, index) => (
                <DirectorGridItem
                  key={index}
                  href={`/dashboard/director/detail/${item.id}`}
                  imageSrc={item.image_url}
                  name={item.name}
                />
              ))
          : [...Array(18).keys()].map((item) => (
              <div key={item} className='flex items-center justify-center'>
                <Shimer className='!mx-8 !h-32 !w-32 !rounded-full' />
              </div>
            ))}
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
