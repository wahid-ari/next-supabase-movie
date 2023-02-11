import useSWR from "swr";
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";
import Link from "next/link";

const fetcher = url => fetch(url).then(result => result.json())

export default function Category() {
  const { data: categories, error: errorCategories } = useSWR(`${process.env.API_ROUTE}/api/category/count-movie`, fetcher)

  if (errorCategories) {
    return (
      <Layout title="Dashboard - MyMovie">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title="Category - MyMovie">
      <Title>Category</Title>

      <div className="mt-8 grid grid-cols-2 min-[560px]:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8">
        {categories ?
          categories.map((item, index) =>
            <Link key={index} href={`/dashboard/category/detail/${item.id}`}
              className="flex items-center justify-between p-4 rounded text-base border dark:border-neutral-800 text-neutral-600 dark:text-neutral-200 hover:text-white dark:hover:text-white hover:bg-emerald-500 transition-all duration-300 font-medium">
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