import useSWR from "swr";
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";
import Link from "next/link";

const fetcher = url => fetch(url).then(result => result.json())

export default function Countries() {
  const { data, error } = useSWR(`${process.env.API_ROUTE}/api/country`, fetcher)

  if (error) {
    return (
      <Layout title="Countries - MyMovie">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title="Countries - MyMovie">
      <Title>Countries</Title>

      <div className="mt-8 grid grid-cols-2 min-[560px]:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8">
        {data ?
          data.map((item, index) =>
            <Link key={index} href={`/dashboard/country/detail/${item.id}`}
              className="flex items-center justify-between p-3 rounded text-[15px] shadow dark:bg-[#1a1919] border dark:border-neutral-800 text-neutral-600 dark:text-neutral-200 dark:hover:text-emerald-500 hover:text-emerald-500 transition-all duration-300 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
              {item.name}
            </Link>
          )
          :
          [0, 1, 2, 3, 4].map(item =>
            <Shimer key={item} className="w-full !h-16" />
          )
        }
      </div>

    </Layout>
  );
}