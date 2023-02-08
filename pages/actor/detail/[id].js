import { useState, useRef, useMemo } from "react";
import Image from "next/image";
import useSWR from "swr";
import axios from "axios";
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";
import nookies from "nookies";
import moment from "moment";
import Text from "@components/systems/Text";
import Heading from "@components/systems/Heading";
import { UserIcon } from "@heroicons/react/outline";
import LabeledInput from "@components/systems/LabeledInput";
import ReactTable from "@components/systems/ReactTable";
import Link from "next/link";
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

export default function Actor({ id }) {
  const { data, error } = useSWR(`${process.env.API_ROUTE}/api/actor?id=${id}`, fetcher)
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
      <Layout title="Actor Detail - MyMovie">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title={`${data ? data?.name + " - MyMovie" : 'Actor Detail - MyMovie'}`}>
      <div className="flex flex-wrap justify-between items-center gap-y-3">
        {data ?
          <Title>{data?.name}</Title>
          :
          <Title>Actor Detail</Title>
        }
      </div>

      {data ?
        <div>
          <p className="text-lg">{data.gender == 1 ? "Male" : "Female"}</p>
          <div className="flex flex-wrap sm:flex-nowrap mt-4 gap-5">
            {data?.image_url.startsWith("http") ?
              <div className="overflow-hidden relative h-72 xl:h-96 w-52 mx-auto sm:w-1/3 md:w-1/4">
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
            <div className="sm:w-2/3 md:w-3/4">
              <Heading className="-mt-1 mb-2">Biography</Heading>
              <Text className="!text-[15px]">{data.biography || "-"}</Text>
              <Heading className="mt-4 mb-2">Birthday</Heading>
              <Text className="!text-[15px]">
                {data.birthday ?
                  <>
                    {data.birthday} {" "}
                    ({moment().diff(data.birthday, 'years', false)} years old)
                  </>
                  :
                  <span>-</span>
                }
              </Text>
              <Heading className="mt-4 mb-2">Country</Heading>
              <Text className="!text-[15px]">{data.countries?.name || "-"}</Text>
              <Heading className="mt-4 mb-2">Social Media</Heading>
              {data.instagram_url == "" && data.twitter_url == "" ?
                <span>-</span>
                :
                <div className="flex gap-4">
                  {data.instagram_url &&
                    <a href={data.instagram_url} target="_blank" rel="noreferrer"
                      className="text-[15px] text-emerald-500 hover:text-emerald-600 hover:underline transition-all duration-300">
                      Instagram
                    </a>
                  }
                  {data.twitter_url &&
                    <a href={data.twitter_url} target="_blank" rel="noreferrer"
                      className="text-[15px] text-emerald-500 hover:text-emerald-600 hover:underline transition-all duration-300">
                      Twitter
                    </a>
                  }
                </div>
              }
            </div>
          </div>
        </div>
        :
        <Shimer className="mt-4 h-72 xl:h-96 !w-72" />
      }

      {data ?
        data?.movies.length > 0 ?
          <>
            <Heading className="mt-6">{data?.name} Movies</Heading>
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
          <div className="rounded border border-red-500 p-3">
            <p className="text-red-500">No Movies From &quot;{data?.name}&quot; </p>
          </div>
        :
        <Shimer className="mt-6 !h-60" />
      }

    </Layout>
  );
}

