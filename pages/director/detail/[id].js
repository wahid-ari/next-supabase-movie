import { useState, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";
import ReactTable from "@components/systems/ReactTable";
import nookies from "nookies";
import Text from "@components/systems/Text";
import Heading from "@components/systems/Heading";
import { UserIcon } from "@heroicons/react/outline";
import LabeledInput from "@components/systems/LabeledInput";
import Badge from "@components/systems/Badge";

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

export default function Director({ id }) {
  const { data, error } = useSWR(`${process.env.API_ROUTE}/api/director?id=${id}`, fetcher)
  const [isLoading, setLoading] = useState(true)

  const column = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'movies.id',
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
      {
        Header: 'Status',
        accessor: 'status',
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row;
          return (
            values.status == 1 ?
              <Badge.red>Production</Badge.red>
              :
              <Badge.green>Released</Badge.green>
          )
        }
      },
      {
        Header: 'Year',
        accessor: 'release_date',
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row;
          const year = original.release_date?.split("-")[0]
          return (year)
        }
      },
    ],
    []
  );

  const table = useRef(null);

  if (error) {
    return (
      <Layout title="Director Detail - MyMovie">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title={`${data ? data?.name + " - MyMovie" : 'Director Detail - MyMovie'}`}>
      <div className="flex flex-wrap justify-between items-center gap-y-3">
        {data ?
          <Title>{data?.name}</Title>
          :
          <Title>Director Detail</Title>
        }
      </div>

      {data ?
        <div className="flex flex-wrap sm:flex-nowrap mt-4 gap-5">
          {data?.image_url.startsWith("http") ?
            <div className="overflow-hidden relative h-80 sm:h-96 w-60 mx-auto sm:w-2/4 md:w-2/5 xl:w-1/4 2xl:w-1/5">
              <Image
                alt={data?.name}
                src={data?.image_url}
                fill
                className={`rounded ${isLoading ? 'blur-2xl' : 'blur-0'}`}
                onLoadingComplete={() => setLoading(false)}
              />
            </div>
            :
            <div className="overflow-hidden relative h-72 xl:h-96 w-52 mx-auto sm:w-1/3 md:w-1/4 bg-neutral-200 dark:bg-neutral-800 rounded flex items-center justify-center">
              <UserIcon className="w-32 h-32 text-neutral-500" />
            </div>
          }
          <div className="sm:w-2/3 md:w-3/4 xl:w-3/4 2xl:w-4/5">
            <Heading className="-mt-1 mb-2">Biography</Heading>
            <Text className="!text-[15px]">{data.biography || "-"}</Text>
            <Heading className="mt-4 mb-2">Gender</Heading>
            <Text className="!text-[15px]">{data.gender == 1 ? "Male" : "Female"}</Text>
            <Heading className="mt-4 mb-2">Country</Heading>
            {data.countries ?
              <Link href={`/country/detail/${data.countries?.id}`} className="text-emerald-500 hover:text-emerald-600 text-[15px] font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 rounded">
                {data.countries?.name || "-"}
              </Link>
              :
              "-"
            }
          </div>
        </div>
        :
        <div className="flex flex-wrap sm:flex-nowrap mt-4 gap-5">
          <div className="w-60 mx-auto sm:w-2/4 md:w-2/5 xl:w-1/4 2xl:w-1/5">
            <Shimer className="h-80 sm:h-96" />
          </div>
          <div className="sm:w-2/3 md:w-3/4 xl:w-3/4 2xl:w-4/5">
            <Shimer className="h-80 sm:h-96" />
          </div>
        </div>
      }

      {data?.movies.length > 0 ?
        <>
          <Heading className="mt-8">Movies by {data?.name}</Heading>
          <LabeledInput
            label="Search Movies"
            id="searchmovies"
            name="searchmovies"
            placeholder="Keyword"
            className="max-w-xs !py-2"
            onChange={(e) => {
              table.current.setGlobalFilter(e.target.value);
            }}
          />

          <ReactTable columns={column} data={data.movies} ref={table} page_size={10} itemPerPage={[5, 10, 20, 50, 100]} />
        </>
        :
        null
      }

    </Layout>
  );
}

