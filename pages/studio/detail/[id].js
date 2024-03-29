import { useState, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStudioData } from '@libs/swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import ReactTable from '@components/systems/ReactTable';
import LabeledInput from '@components/systems/LabeledInput';
import Heading from '@components/systems/Heading';
import nookies from 'nookies';
import Text from '@components/systems/Text';
import { PhotographIcon } from '@heroicons/react/outline';

export async function getServerSideProps(context) {
  const { id } = context.params;
  const cookies = nookies.get(context);
  if (!cookies.token) {
    return {
      redirect: {
        destination: '/login',
      },
    };
  }
  return {
    props: {
      id: id,
    }, // will be passed to the page component as props
  };
}

export default function Studio({ id }) {
  const { data, error } = useStudioData(id);
  const [isLoading, setLoading] = useState(true);

  const column = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'movies.id',
        sortBy: true,
        width: 300,
        Cell: (row) => {
          return row.cell.row.index + 1;
        },
      },
      {
        Header: 'Name',
        accessor: 'name',
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row;
          return (
            <Link
              href={`/movie/detail/${original.id}`}
              className='rounded text-sm font-medium transition-all duration-200 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
            >
              {values.name}
            </Link>
          );
        },
      },
    ],
    []
  );

  const tableInstance = useRef(null);

  if (error) {
    return (
      <Layout title='Studio Detail - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title={`${data ? data?.name + ' - MyMovie' : 'Studio Detail - MyMovie'}`}>
      <div className='flex flex-wrap items-center justify-between gap-y-3'>
        {data ? <Title>{data?.name}</Title> : <Title>Studio Detail</Title>}
      </div>

      {data ? (
        <div className='my-4'>
          {data?.image_url ? (
            <div className='relative h-24 w-52 overflow-hidden'>
              <Image
                alt={data?.name}
                src={data?.image_url}
                fill
                className={`rounded object-contain ${isLoading ? 'blur-2xl' : 'blur-0'}`}
                onLoadingComplete={() => setLoading(false)}
              />
            </div>
          ) : (
            <div className='relative flex h-28 w-28 items-center justify-center overflow-hidden rounded bg-neutral-200 dark:bg-neutral-800'>
              <PhotographIcon className='h-16 w-16 text-neutral-500' />
            </div>
          )}
          <Text className='mt-4 !text-base'>
            {data?.city}, {data?.countries?.name}
          </Text>
        </div>
      ) : (
        <Shimer className='!h-40' />
      )}

      {data ? (
        <div className='mt-8'>
          <Heading>{data?.name} Movies</Heading>
          {data.movies.length > 0 ? (
            <>
              <LabeledInput
                label='Search Movie'
                id='searchmovie'
                name='searchmovie'
                placeholder='Movie Name'
                className='max-w-xs !py-2'
                onChange={(e) => {
                  tableInstance.current.setGlobalFilter(e.target.value);
                }}
              />

              <ReactTable columns={column} data={data.movies} ref={tableInstance} page_size={10} />
            </>
          ) : (
            <Text className='!text-red-500'>There are no movies</Text>
          )}
        </div>
      ) : (
        <Shimer className='mt-10 !h-60' />
      )}
    </Layout>
  );
}
