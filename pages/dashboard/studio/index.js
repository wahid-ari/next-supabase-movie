import { useState } from 'react';
import { useStudioData } from '@libs/swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import StudioGridItem from '@components/dashboard/StudioGridItem';
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

export default function Studios() {
  const { data, error } = useStudioData();
  const [query, setQuery] = useState('');

  const filtered =
    query === ''
      ? data
      : data.filter((item) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  if (error) {
    return (
      <Layout title='Studios - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Studios - MyMovie' description='Browse Studios - MyMovie'>
      <Title>Studios</Title>

      <InputDebounce
        label='Search Studio'
        id='search'
        name='search'
        placeholder='Studio Name'
        className='max-w-xs !py-2'
        wrapperClassName='mt-6'
        debounce={500}
        value={query}
        onChange={(value) => setQuery(value)}
      />

      <div className='mt-8 grid grid-cols-2 gap-4 md:grid-cols-4'>
        {data ? (
          filtered.map((item, index) => (
            <StudioGridItem key={index} index={index} href={`/dashboard/studio/detail/${item.id}`} name={item.name} />
          ))
        ) : (
          <>
            <Shimer className='!h-24 w-full' />
            <Shimer className='!h-24 w-full' />
            <Shimer className='!h-24 w-full' />
            <Shimer className='!h-24 w-full' />
          </>
        )}
      </div>
    </Layout>
  );
}
