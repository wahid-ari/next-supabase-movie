import useSWR from "swr";
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";
import StudioGridItem from "@components/dashboard/StudioGridItem";

const fetcher = url => fetch(url).then(result => result.json())

export default function Studios() {
  const { data, error } = useSWR(`${process.env.API_ROUTE}/api/studio`, fetcher)

  if (error) {
    return (
      <Layout title="Studios - MyMovie">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title="Studios - MyMovie">
      <Title>Studios</Title>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {data ?
          data.map((item, index) =>
            <StudioGridItem
              key={index}
              index={index}
              href={`/dashboard/studio/detail/${item.id}`}
              name={item.name}
            />
          )
          :
          <>
            <Shimer className="w-full !h-24" />
            <Shimer className="w-full !h-24" />
            <Shimer className="w-full !h-24" />
            <Shimer className="w-full !h-24" />
          </>
        }
      </div>

    </Layout>
  );
}