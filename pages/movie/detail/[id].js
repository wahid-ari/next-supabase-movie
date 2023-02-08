import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";
import nookies from "nookies";
import Text from "@components/systems/Text";
import Heading from "@components/systems/Heading";
import { PhotographIcon } from "@heroicons/react/outline";

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

export default function Movie({ id }) {
  const { data, error } = useSWR(`${process.env.API_ROUTE}/api/movie?id=${id}`, fetcher)
  const [isLoading, setLoading] = useState(true)

  // data.video_url maybe "https://youtu.be/qSqVVswa420" or "https://www.youtube.com/watch?v=2m1drlOZSDw" 
  // if data.video_url includes "watch" word, then url maybe like "https://www.youtube.com/watch?v=2m1drlOZSDw" 
  const youtube_url = data?.video_url?.includes("watch") ? data?.video_url?.split("=")[1] : data?.video_url?.split("/")[3]

  if (error) {
    return (
      <Layout title="Movie Detail - MyMovie">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title={`${data ? data?.name + " - MyMovie" : 'Movie Detail - MyMovie'}`}>
      <div className="flex flex-wrap justify-between items-center gap-y-3">
        {data ?
          <Title>{data?.name}</Title>
          :
          <Title>Movie Detail</Title>
        }
      </div>

      {data ?
        <div>
          <div className="flex flex-wrap sm:flex-nowrap mt-4 gap-5">
            {data?.image_url.startsWith("http") ?
              <div className="overflow-hidden relative h-80 sm:h-96 w-60 mx-auto sm:w-2/4 md:w-2/5 xl:w-1/4">
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
                <PhotographIcon className="w-32 h-32" />
              </div>
            }
            <div className="sm:w-2/3 md:w-3/4 xl:w-3/4">
              <Heading className="-mt-1 mb-2">Overview</Heading>
              <Text className="!text-[15px]">{data.description || "-"}</Text>
              <Heading className="mt-4 mb-2">Categories</Heading>
              {data.categories.length > 0 ?
                <div className="flex flex-wrap gap-2">
                  {data.categories?.map((category, index) =>
                    <Link key={category.id}
                      href={`/category/detail/${category.id}`}
                      className="truncate text-[15px] text-emerald-500 hover:text-emerald-600 transition-all duration-300"
                    >
                      {category.name}{index != data.categories.length - 1 ? "," : ""}
                    </Link>
                  )}
                </div>
                :
                <span>-</span>
              }

              {/* <Heading className="mt-4 mb-2">Actors</Heading>
              {data.actors.length > 0 ?
                <div className="flex flex-wrap gap-2">
                  {data.actors?.map((actor, index) =>
                    <Link key={actor.id}
                      href={`/actor/detail/${actor.id}`}
                      className="truncate text-[15px] text-emerald-500 hover:text-emerald-600 transition-all duration-300"
                    >
                      {actor.name}{index != data.actors.length - 1 ? "," : ""}
                    </Link>
                  )}
                </div>
                :
                <span>-</span>
              } */}

              {/* <Heading className="mt-4 mb-2">Director</Heading>
              {data.directors?.id ?
                <Link
                  href={`/director/detail/${data.directors?.id}`}
                  className="text-[15px] text-emerald-500 hover:text-emerald-600 transition-all duration-300"
                >
                  {data.directors?.name}
                </Link>
                :
                <span>-</span>
              } */}

              <div className="flex flex-wrap gap-x-12">
                <div>
                  <Heading className="mt-4 mb-2">Release Date</Heading>
                  <Text className="!text-[15px]">{data.release_date || "-"}</Text>
                  <Heading className="mt-4 mb-2">Studio</Heading>
                  {data.studios ?
                    <Link href={`/studio/detail/${data.studios?.id}`} className="text-emerald-500 hover:text-emerald-600 text-[15px] font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 rounded">
                      {data.studios?.name || "-"}
                    </Link>
                    :
                    "-"
                  }
                </div>
                <div>
                  <Heading className="mt-4 mb-2">Language</Heading>
                  <Text className="!text-[15px]">{data.language || "-"}</Text>
                  <Heading className="mt-4 mb-2">Status</Heading>
                  <Text className="!text-[15px]">{data.status == 1 ? "Production" : "Released"}</Text>
                </div>
              </div>

            </div>
          </div>
        </div>
        :
        <Shimer className="mt-4 h-72 xl:h-96 !w-72" />
      }

      {data ?
        <>
          <Heading className="mt-4 mb-3">Actors</Heading>
          <div className="flex gap-3 overflow-auto pb-4 px-0.5 scrollbar scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-800">
            {data.actors.length > 0 ?
              data.actors?.map((actor, index) =>
                <Link href={`/actor/detail/${actor.id}`} key={index} className="w-32 shadow rounded group border border-transparent dark:border-neutral-800">
                  <div className="relative overflow-hidden h-[180px] w-32">
                    <Image alt={actor.name} src={actor.image_url} fill className="rounded-t group-hover:cursor-pointer brightness-90 group-hover:brightness-100 transition-all duration-300" />
                  </div>
                  <div className="p-2">
                    <p className="group-hover:text-emerald-500 transition-all duration-300 text-ellipsis overflow-hidden">
                      {actor.name}
                    </p>
                  </div>
                </Link>
              )
              :
              <span>-</span>
            }
          </div>
        </>
        :
        null
      }

      {data ?
        <>
          <Heading className="mb-3">Director</Heading>
          <div className="w-32 py-0.5 shadow rounded border border-transparent dark:border-neutral-800">
            <Link href={`/director/detail/${data.directors?.id}`} className="shadow rounded group ">
              <div className="relative overflow-hidden h-[180px]">
                <Image alt={data.directors?.name} src={data.directors?.image_url} fill className="rounded-t group-hover:cursor-pointer brightness-90 group-hover:brightness-100 transition-all duration-300" />
              </div>
              <div className="p-2">
                <p className="group-hover:text-emerald-500 transition-all duration-300">
                  {data.directors?.name}
                </p>
              </div>
            </Link>
          </div>
        </>
        :
        null
      }

      {data ?
        <>
          <Heading className="mt-4 mb-3">Trailer</Heading>
          {data?.video_url?.startsWith("https") ?
            <div className="rounded">
              <iframe className="rounded w-full h-64 sm:h-72 md:w-3/4 xl:w-1/2 md:h-80"
                src={`https://www.youtube.com/embed/${youtube_url}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
              </iframe>
            </div>
            :
            <span>-</span>
          }
        </>
        :
        null
      }

    </Layout>
  );
}

