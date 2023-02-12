import useSWR from "swr";
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";
import Link from "next/link";

const fetcher = url => fetch(url).then(result => result.json())

export default function Categories() {
  const { data, error } = useSWR(`${process.env.API_ROUTE}/api/category/total-movie`, fetcher)

  if (error) {
    return (
      <Layout title="Categories - MyMovie">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title="Categories - MyMovie">
      <Title>Categories</Title>

      <div className="mt-8 grid grid-cols-2 min-[560px]:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8">
        {data ?
          data.map((item, index) =>
            <Link key={index} href={`/dashboard/category/detail/${item.id}`}
              className="flex items-center justify-between p-4 rounded text-base border dark:border-neutral-800 text-neutral-600 dark:text-neutral-200 hover:text-white dark:hover:text-white hover:bg-gradient-to-r hover:from-emerald-500 hover:to-emerald-700 transition-all duration-300 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
              <span>{item.name}</span>  
              {item.total}
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