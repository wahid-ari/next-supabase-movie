import { useState } from "react";
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
    <Layout title={`${data ? data[0]?.name + " - MyMovie" : 'Actor Detail - MyMovie'}`}>
      <div className="flex flex-wrap justify-between items-center gap-y-3">
        {data ?
          <Title>{data[0]?.name}</Title>
          :
          <Title>Actor Detail</Title>
        }
      </div>

      {data ?
        <div>
          <p className="text-lg">{data[0].gender == 1 ? "Male" : "Female"}</p>
          <div className="flex flex-wrap sm:flex-nowrap mt-4 gap-5">
            {data[0]?.image_url ?
              <div className="overflow-hidden relative h-72 xl:h-96 w-52 mx-auto sm:w-1/3 md:w-1/4">
                <Image
                  alt={data[0]?.name}
                  src={data[0]?.image_url}
                  fill
                  className={`rounded ${isLoading ? 'blur-2xl' : 'blur-0'}`}
                  onLoadingComplete={() => setLoading(false)}
                />
              </div>
              :
              <div className="overflow-hidden relative h-72 xl:h-96 w-52 mx-auto sm:w-1/3 md:w-1/4 bg-neutral-200 dark:bg-neutral-800 rounded flex items-center justify-center">
                <UserIcon className="w-32 h-32" />
              </div>
            }
            <div className="sm:w-2/3 md:w-3/4">
              <Heading className="-mt-1 mb-2">Biography</Heading>
              <Text className="!text-[15px]">{data[0].biography || "-"}</Text>
              <Heading className="mt-4 mb-2">Birthday</Heading>
              <Text className="!text-[15px]">
                {data[0].birthday ?
                  <>
                    {data[0].birthday} {" "}
                    ({moment().diff(data[0].birthday, 'years', false)} years old)
                  </>
                  :
                  <span>-</span>
                }
              </Text>
              <Heading className="mt-4 mb-2">Country</Heading>
              <Text className="!text-[15px]">{data[0].countries?.name || "-"}</Text>
              <Heading className="mt-4 mb-2">Social Media</Heading>
              {data[0].instagram_url == "" && data[0].twitter_url == "" ?
                <span>-</span>
                :
                <div className="flex gap-4">
                  {data[0].instagram_url &&
                    <a href={data[0].instagram_url} target="_blank" rel="noreferrer"
                      className="text-[15px] text-emerald-500 hover:text-emerald-600 hover:underline transition-all duration-300">
                      Instagram
                    </a>
                  }
                  {data[0].twitter_url &&
                    <a href={data[0].twitter_url} target="_blank" rel="noreferrer"
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
        <Shimer className="!h-72 !w-72" />
      }

    </Layout>
  );
}

