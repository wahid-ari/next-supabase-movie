import { useState } from 'react';
import { useActorsData } from '@libs/swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import ActorGridItem from '@components/dashboard/ActorGridItem';
import InputDebounce from '@components/systems/InputDebounce';
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
  return {
    props: {},
  };
}

export default function Actors() {
  const { data, error } = useActorsData();
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
    <Layout title='Actors - MyMovie' description='Browse Actors - MyMovie'>
      <Title>Actors</Title>

      <InputDebounce
        label='Search Actor'
        id='search'
        name='search'
        placeholder='Actor Name'
        className='max-w-xs !py-2'
        wrapperClassName='mt-6'
        debounce={500}
        value={query}
        onChange={(value) => setQuery(value)}
      />

      <div className='mt-8 grid grid-cols-2 gap-8 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8'>
        {data
          ? filtered.map((item, index) => (
              <ActorGridItem
                key={index}
                href={`/dashboard/actor/detail/${item.id}`}
                imageSrc={item.image_url}
                name={item.name}
              />
            ))
          : [...Array(14).keys()].map((item) => <Shimer key={item} className='!h-52 w-full' />)}
      </div>
    </Layout>
  );
}
