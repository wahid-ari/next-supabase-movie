import { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import axios from "axios";
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";
import moment from "moment";
import Text from "@components/systems/Text";
import Heading from "@components/systems/Heading";
import { PhotographIcon, UserIcon } from "@heroicons/react/outline";
import Link from "next/link";
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

export default function Studio({ id }) {
  const { data, error } = useSWR(`${process.env.API_ROUTE}/api/studio?id=${id}`, fetcher)
  const [isLoading, setLoading] = useState(true)

  if (error) {
    return (
      <Layout title="Studio Detail - MyMovie">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title={`${data ? data?.name + " - MyMovie" : 'Studio Detail - MyMovie'}`}>
      <div className="flex flex-wrap justify-between items-center gap-y-3">
        {data ?
          <Title>{data?.name}</Title>
          :
          <Title>Studio Detail</Title>
        }
      </div>

      {data ?
        <div className="my-4">
          {data?.image_url ?
            <div className="overflow-hidden relative h-24 w-52">
              <Image
                alt={data?.name}
                src={data?.image_url}
                fill
                className={`rounded object-contain ${isLoading ? 'blur-2xl' : 'blur-0'}`}
                onLoadingComplete={() => setLoading(false)}
              />
            </div>
            :
            <div className="overflow-hidden relative h-28 w-28 bg-neutral-200 dark:bg-neutral-800 rounded flex items-center justify-center">
              <PhotographIcon className="w-16 h-16 text-neutral-500" />
            </div>
          }
          <Text className="!text-base mt-4">{data?.city}, {data?.countries?.name}</Text>
        </div>
        :
        <Shimer className="!h-40" />
      }

      {data ?
        data?.movies.length > 0 ?
          <>
            <Heading className="mt-8">Movies by {data?.name} </Heading>
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
          <div className="mt-8 rounded border border-red-500 p-3">
            <p className="text-red-500">No Movies From &quot;{data?.name}&quot; </p>
          </div>
        :
        <Shimer className="mt-6 !h-60" />
      }

    </Layout>
  );
}
