import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import axios from "axios";
import { UserIcon } from "@heroicons/react/outline";
import moment from "moment";
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";
import Text from "@components/systems/Text";
import Heading from "@components/systems/Heading";
import MovieGridItem from "@components/dashboard/MovieGridItem";

export async function getServerSideProps(context) {
  const { id } = context.params
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
            <div className="flex flex-wrap gap-x-12">
              <div>
                <Heading className="mt-4 mb-2">Gender</Heading>
                <Text className="!text-[15px]">{data.gender == 1 ? "Male" : "Female"}</Text>
                <Heading className="mt-4 mb-2">Country</Heading>
                {data.countries ?
                  <Link href={`/dashboard/country/detail/${data.countries?.id}`} className="text-emerald-500 hover:text-emerald-600 text-[15px] font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 rounded">
                    {data.countries?.name || "-"}
                  </Link>
                  :
                  "-"
                }
              </div>
              <div>
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
                <Heading className="mt-4 mb-2">Social Media</Heading>
                {data.instagram_url == "" && data.twitter_url == "" ?
                  <span>-</span>
                  :
                  <div className="flex gap-4">
                    {data.instagram_url &&
                      <a href={data.instagram_url} target="_blank" rel="noreferrer"
                        className="font-medium text-[15px] text-emerald-500 hover:text-emerald-600 hover:underline transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 rounded">
                        Instagram
                      </a>
                    }
                    {data.twitter_url &&
                      <a href={data.twitter_url} target="_blank" rel="noreferrer"
                        className="font-medium text-[15px] text-emerald-500 hover:text-emerald-600 hover:underline transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 rounded">
                        Twitter
                      </a>
                    }
                  </div>
                }
              </div>
            </div>
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

      {data ?
        data?.movies.length > 0 ?
          <>
            <Heading className="mt-8">{data?.name} Movies</Heading>
            <div className="grid grid-cols-2 min-[560px]:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8">
              {data.movies.map((item, index) =>
                <MovieGridItem key={index} href={`/dashboard/movie/detail/${item.id}`}
                  imageSrc={item.image_url}
                  title={item.name}
                  date={item.release_date}
                />
              )}
            </div>
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

