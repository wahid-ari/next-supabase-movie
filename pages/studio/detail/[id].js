import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";
import ReactTable from "@components/systems/ReactTable";
import LabeledInput from "@components/systems/LabeledInput";
import Heading from "@components/systems/Heading";
import nookies from "nookies";
import Text from "@components/systems/Text";
import { PhotographIcon } from "@heroicons/react/outline";

export async function getServerSideProps(context) {
  const { id } = context.params
  const cookies = nookies.get(context)
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

export default function Studio({ id }) {
  const { data, error } = useSWR(`${process.env.API_ROUTE}/api/studio?id=${id}`, fetcher)
  const [isLoading, setLoading] = useState(true)

  console.log(data)

  const column = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'movies.id',
        sortBy: true,
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
            <Link href={`/movie/detail/${original.id}`} className="text-emerald-500 hover:text-emerald-600 text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 rounded">
              {values.name}
            </Link>
          )
        }
      },
    ],
    []
  );

  const tableInstance = useRef(null);

  if (error) {
    return (
      <Layout title="Studio Detail - MyMovie">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title={`${data ? data?.name + " - MyMovie" : 'Studio Detail - MyMovie'}`}>
      <div className="flex flex-wrap justify-between items-center mb-6 gap-y-3">
        {data ?
          <Title>{data?.name}</Title>
          :
          <Title>Studio Detail</Title>
        }
      </div>

      {data ?
        <div className="">
          {data?.image_url ?
            <div className="overflow-hidden relative h-24">
              <Image
                alt={data?.name}
                src={data?.image_url}
                fill
                className={`rounded object-contain ${isLoading ? 'blur-2xl' : 'blur-0'}`}
                onLoadingComplete={() => setLoading(false)}
              />
            </div>
            :
            <div className="mx-auto overflow-hidden relative h-28 w-28 bg-neutral-200 dark:bg-neutral-800 rounded flex items-center justify-center">
              <PhotographIcon className="w-16 h-16 text-neutral-500" />
            </div>
          }
          <Text className="!text-base mt-4">{data?.city}, {data?.countries?.name}</Text>
        </div>
        :
        <Shimer className="!h-72 !w-72" />
      }

      {data ?
        <div className="mt-8">
          <Heading>{data?.name} Movies</Heading>
          {data.movies.length > 0 ?
            <>
              <LabeledInput
                label="Search Movie"
                id="searchmovie"
                name="searchmovie"
                placeholder="Movie Name"
                className="max-w-xs !py-2"
                onChange={(e) => {
                  tableInstance.current.setGlobalFilter(e.target.value);
                }}
              />

              <ReactTable columns={column} data={data.movies} ref={tableInstance} page_size={10} />
            </>
            :
            <Text className="!text-red-500">There are no movies</Text>
          }
        </div>
        :
        <Shimer className="!h-60 mt-10" />
      }

    </Layout>
  );
}

