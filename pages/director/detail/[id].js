import { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDirectorData } from '@libs/swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import ReactTable from '@components/systems/ReactTable';
import nookies from 'nookies';
import Text from '@components/systems/Text';
import Heading from '@components/systems/Heading';
import { UserIcon } from '@heroicons/react/outline';
import LabeledInput from '@components/systems/LabeledInput';
import Badge from '@components/systems/Badge';

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

export default function Director({ id }) {
  const { data, error } = useDirectorData(id);
  const [isLoading, setLoading] = useState(true);

  const column = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'movies.id',
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
      {
        Header: 'Status',
        accessor: 'status',
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row;
          return values.status == 1 ? <Badge.red>Production</Badge.red> : <Badge.green>Released</Badge.green>;
        },
      },
      {
        Header: 'Year',
        accessor: 'release_date',
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row;
          const year = original.release_date?.split('-')[0];
          return year;
        },
      },
    ],
    []
  );

  const table = useRef(null);

  if (error) {
    return (
      <Layout title='Director Detail - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title={`${data ? data?.name + ' - MyMovie' : 'Director Detail - MyMovie'}`}>
      <div className='flex flex-wrap items-center justify-between gap-y-3'>
        {data ? <Title>{data?.name}</Title> : <Title>Director Detail</Title>}
      </div>

      {data ? (
        <div className='mt-4 flex flex-wrap gap-5 sm:flex-nowrap'>
          {data?.image_url.startsWith('http') ? (
            <div className='relative mx-auto h-80 w-60 overflow-hidden sm:h-96 sm:w-2/4 md:w-2/5 xl:w-1/4 2xl:w-1/5'>
              <Image
                alt={data?.name}
                src={data?.image_url}
                fill
                className={`rounded ${isLoading ? 'blur-2xl' : 'blur-0'}`}
                onLoadingComplete={() => setLoading(false)}
              />
            </div>
          ) : (
            <div className='relative mx-auto flex h-72 w-52 items-center justify-center overflow-hidden rounded bg-neutral-200 dark:bg-neutral-800 sm:w-1/3 md:w-1/4 xl:h-96'>
              <UserIcon className='h-32 w-32 text-neutral-500' />
            </div>
          )}
          <div className='sm:w-2/3 md:w-3/4 xl:w-3/4 2xl:w-4/5'>
            <Heading className='-mt-1 mb-1.5'>Biography</Heading>
            <Text className='!text-[15px]'>{data.biography || '-'}</Text>
            <Heading className='mt-4 mb-1.5'>Gender</Heading>
            <Text className='!text-[15px]'>{data.gender == 1 ? 'Male' : 'Female'}</Text>
            <Heading className='mt-4 mb-1.5'>Country</Heading>
            {data.countries ? (
              <Link
                href={`/country/detail/${data.countries?.id}`}
                className='rounded text-[15px] font-medium text-sky-500 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
              >
                {data.countries?.name || '-'}
              </Link>
            ) : (
              '-'
            )}
          </div>
        </div>
      ) : (
        <div className='mt-4 flex flex-wrap gap-5 sm:flex-nowrap'>
          <div className='mx-auto w-60 sm:w-2/4 md:w-2/5 xl:w-1/4 2xl:w-1/5'>
            <Shimer className='h-80 sm:h-96' />
          </div>
          <div className='sm:w-2/3 md:w-3/4 xl:w-3/4 2xl:w-4/5'>
            <Shimer className='h-80 sm:h-96' />
          </div>
        </div>
      )}

      {data?.movies.length > 0 ? (
        <>
          <Heading className='mt-8'>Movies by {data?.name}</Heading>
          <LabeledInput
            label='Search Movies'
            id='searchmovies'
            name='searchmovies'
            placeholder='Keyword'
            className='max-w-xs !py-2'
            onChange={(e) => {
              table.current.setGlobalFilter(e.target.value);
            }}
          />

          <ReactTable
            columns={column}
            data={data.movies}
            ref={table}
            page_size={10}
            itemPerPage={[5, 10, 20, 50, 100]}
          />
        </>
      ) : null}
    </Layout>
  );
}
