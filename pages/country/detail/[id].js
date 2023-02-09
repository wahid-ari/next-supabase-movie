import { useRef, useMemo } from "react";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";
import nookies from "nookies";
import LabeledInput from "@components/systems/LabeledInput";
import ReactTable from "@components/systems/ReactTable";
import Heading from "@components/systems/Heading";

export async function getServerSideProps(context) {
  const { id } = context.params
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
      id: id
    }, // will be passed to the page component as props
  }
}

const fetcher = url => axios.get(url).then(res => res.data)

export default function Country({ id }) {
  const { data, error } = useSWR(`${process.env.API_ROUTE}/api/country?id=${id}`, fetcher)

  const columnActors = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'actors.id',
        width: 300,
        Cell: (row) => {
          return (
            row.cell.row.index + 1
          )
        }
      },
      {
        Header: 'Name',
        accessor: 'name',
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row;
          return (
            <Link href={`/actor/detail/${original.id}`} className="text-emerald-500 hover:text-emerald-600 text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 rounded">
              {values.name}
            </Link>
          )
        }
      }
    ],
    []
  );
  
  const columnDirectors = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'directors.id',
        width: 300,
        Cell: (row) => {
          return (
            row.cell.row.index + 1
          )
        }
      },
      {
        Header: 'Name',
        accessor: 'name',
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row;
          return (
            <Link href={`/director/detail/${original.id}`} className="text-emerald-500 hover:text-emerald-600 text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 rounded">
              {values.name}
            </Link>
          )
        }
      }
    ],
    []
  );
  
  const columnStudios = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'studios.id',
        width: 300,
        Cell: (row) => {
          return (
            row.cell.row.index + 1
          )
        }
      },
      {
        Header: 'Name',
        accessor: 'name',
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row;
          return (
            <Link href={`/studio/detail/${original.id}`} className="text-emerald-500 hover:text-emerald-600 text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 rounded">
              {values.name}
            </Link>
          )
        }
      }
    ],
    []
  );

  const tableActors = useRef(null);
  const tableDirectors = useRef(null);
  const tableStudios = useRef(null);

  if (error) {
    return (
      <Layout title="Country Detail - MyMovie">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title={`${data ? data?.name + " - MyMovie" : 'Country Detail - MyMovie'}`}>
      <div className="flex flex-wrap justify-between items-center mb-6 gap-y-3">
        {data ?
          <Title>{data?.name}</Title>
          :
          <Title>Country Detail</Title>
        }
      </div>

      {data ?
        <div className="mt-8">
          {data?.actors?.length > 0 ?
            <>
              <Heading>{data?.name} Actors</Heading>
              <LabeledInput
                label="Search Actors"
                id="searchactors"
                name="searchactors"
                placeholder="Keyword"
                className="max-w-xs !py-2"
                onChange={(e) => {
                  tableActors.current.setGlobalFilter(e.target.value);
                }}
              />

              <ReactTable columns={columnActors} data={data.actors} ref={tableActors} page_size={10} itemPerPage={[5, 10, 20, 50, 100]} />
            </>
            :
            null
          }
        </div>
        :
        <Shimer className="mt-4 !h-60" />
      }
      
      {data ?
        <div className="mt-8">
          {data?.directors?.length > 0 ?
            <>
              <Heading>{data?.name} Directors</Heading>
              <LabeledInput
                label="Search Directors"
                id="searchdirectors"
                name="searchdirectors"
                placeholder="Keyword"
                className="max-w-xs !py-2"
                onChange={(e) => {
                  tableDirectors.current.setGlobalFilter(e.target.value);
                }}
              />

              <ReactTable columns={columnDirectors} data={data.directors} ref={tableDirectors} page_size={10} itemPerPage={[5, 10, 20, 50, 100]} />
            </>
            :
            null
          }
        </div>
        :
        <Shimer className="mt-4 !h-60" />
      }
      
      {data ?
        <div className="mt-8">
          {data?.studios?.length > 0 ?
            <>
              <Heading>{data?.name} Studios</Heading>
              <LabeledInput
                label="Search Studios"
                id="searchstudios"
                name="searchstudios"
                placeholder="Keyword"
                className="max-w-xs !py-2"
                onChange={(e) => {
                  tableStudios.current.setGlobalFilter(e.target.value);
                }}
              />

              <ReactTable columns={columnStudios} data={data.studios} ref={tableStudios} page_size={10} itemPerPage={[5, 10, 20, 50, 100]} />
            </>
            :
            null
          }
        </div>
        :
        <Shimer className="mt-4 !h-60" />
      }

    </Layout>
  );
}

