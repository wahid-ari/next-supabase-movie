import { useRef, useMemo } from 'react';
import Link from 'next/link';
import { useCategoryData } from '@libs/swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import nookies from 'nookies';
import ReactTable from '@components/systems/ReactTable';
import Heading from '@components/systems/Heading';
import LabeledInput from '@components/systems/LabeledInput';
import Badge from '@components/systems/Badge';
import Shimer from '@components/systems/Shimer';

export async function getServerSideProps(context) {
  const { id } = context.params;
  // const cookies = nookies.get(context)
  // if (!cookies.token) {
  //   return {
  //     redirect: {
  //       destination: "/login"
  //     }
  //   }
  // }
  return {
    props: {
      id: id,
    }, // will be passed to the page component as props
  };
}

export default function Category({ id }) {
  const { data, error } = useCategoryData(id);

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
      <Layout title='Category Detail - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title={`${data ? data?.name + ' - MyMovie' : 'Category Detail - MyMovie'}`}>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        {data ? <Title>{data?.name}</Title> : <Title>Category Detail</Title>}
      </div>

      {data ? (
        data?.movies.length > 0 ? (
          <>
            <Heading className='mt-6'>{data?.name} Movies</Heading>
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
        ) : (
          <div className='rounded border border-red-500 p-3'>
            <p className='text-red-500'>No Movies With Category &quot;{data?.name}&quot; </p>
          </div>
        )
      ) : (
        <Shimer className='!h-60' />
      )}
    </Layout>
  );
}
