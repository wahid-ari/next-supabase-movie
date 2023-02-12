import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";
import Heading from "@components/systems/Heading";
import ActorGridItem from "@components/dashboard/ActorGridItem";
import MovieGridItem from "@components/dashboard/MovieGridItem";
import DirectorGridItem from "@components/dashboard/DirectorGridItem";
import StudioGridItem from "@components/dashboard/StudioGridItem";
import { ArrowRightIcon } from "@heroicons/react/outline";
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const fetcher = url => fetch(url).then(result => result.json())

export default function Home() {
  const router = useRouter()
  const { query } = router
  const { data: movies, error: errorMovies } = useSWR(`${process.env.API_ROUTE}/api/movie`, fetcher)
  const { data: actors, error: errorActors } = useSWR(`${process.env.API_ROUTE}/api/actor`, fetcher)
  const { data: directors, error: errorDirectors } = useSWR(`${process.env.API_ROUTE}/api/director`, fetcher)
  const { data: studios, error: errorStudios } = useSWR(`${process.env.API_ROUTE}/api/studio`, fetcher)
  const { data: categories, error: errorCategories } = useSWR(`${process.env.API_ROUTE}/api/category/total-movie`, fetcher)
  const { data: countries, error: errorCountries } = useSWR(`${process.env.API_ROUTE}/api/country`, fetcher)

  if (errorMovies || errorActors || errorDirectors || errorStudios || errorCategories || errorCountries) {
    return (
      <Layout title="Dashboard - MyMovie">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title="Dashboard - MyMovie">
      <Title>Dashboard</Title>

      {/* Movies Start*/}
      <div className="mt-10 flex items-center justify-between">
        <Heading className="">Movies</Heading>
        <Link href={`dashboard/movie`} className="text-emerald-500 hover:text-emerald-600 text-[15px] font-medium focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500 rounded">
          View All
        </Link>
      </div>
      {movies ?
        movies.length >= 10 ?
          <Splide aria-label="Movies" className="hidden xl:block"
            options={{
              perPage: 1,
              gap: '1rem',
              pagination: false,
              speed: 1500
            }}
            hasTrack={false}
          >
            <div>
              <SplideTrack>
                <SplideSlide>
                  <div className="grid xl:grid-cols-5 gap-4 p-1">
                    {movies?.slice(0, 5).map((item, index) =>
                      <MovieGridItem key={index} href={`dashboard/movie/detail/${item.id}`}
                        imageSrc={item.image_url}
                        title={item.name}
                        date={item.release_date}
                      />
                    )}
                  </div>
                </SplideSlide>
                <SplideSlide>
                  <div className="grid xl:grid-cols-5 gap-4 p-1">
                    {movies?.slice(5, 10).map((item, index) =>
                      <MovieGridItem key={index} href={`dashboard/movie/detail/${item.id}`}
                        imageSrc={item.image_url}
                        title={item.name}
                        date={item.release_date}
                      />
                    )}
                  </div>
                </SplideSlide>
              </SplideTrack>
              <div className="splide__arrows">
                <button title="Prev" className="splide__arrow splide__arrow--prev !-mt-8 focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500">
                  <ArrowRightIcon />
                </button>
                <button title="Next" className="splide__arrow splide__arrow--next !-mt-8 focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500">
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
          </Splide>
          :
          <div className="grid xl:grid-cols-5 gap-4 p-1">
            {movies?.slice(0, 5).map((item, index) =>
              <MovieGridItem key={index} href={`dashboard/movie/detail/${item.id}`}
                imageSrc={item.image_url}
                title={item.name}
                date={item.release_date}
              />
            )}
          </div>
        :
        <div className="p-2 grid grid-cols-2 min-[560px]:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
          <Shimer className="w-full !h-64" />
          <Shimer className="w-full !h-64" />
          <Shimer className="w-full !h-64" />
          <Shimer className="w-full !h-64" />
          <Shimer className="w-full !h-64" />
        </div>
      }
      <div className="xl:hidden mt-2 grid grid-cols-2 min-[560px]:grid-cols-3 md:grid-cols-4 gap-4">
        {movies ?
          movies.slice(0, 12).map((item, index) =>
            <MovieGridItem key={index} href={`dashboard/movie/detail/${item.id}`}
              imageSrc={item.image_url}
              title={item.name}
              date={item.release_date}
            />
          )
          : null
        }
      </div>
      {/* Movies End*/}

      {/* Actors Start */}
      <div className="mt-10 flex items-center justify-between">
        <Heading className="">Actors</Heading>
        <Link href={`dashboard/actor`} className="text-emerald-500 hover:text-emerald-600 text-[15px] font-medium focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500 rounded">
          View All
        </Link>
      </div>
      {actors ?
        actors.length >= 14 ?
          <Splide aria-label="Actors" className="hidden xl:block"
            options={{
              perPage: 1,
              gap: '1rem',
              pagination: false,
              speed: 1500
            }}
            hasTrack={false}
          >
            <div>
              <SplideTrack>
                <SplideSlide>
                  <div className="grid xl:grid-cols-7 2xl:grid-cols-8 gap-4 gap-y-8 p-1">
                    {actors?.slice(0, 7).map((item, index) =>
                      <ActorGridItem key={index} href={`/dashboard/actor/detail/${item.id}`}
                        imageSrc={item.image_url}
                        name={item.name}
                      />
                    )}
                  </div>
                </SplideSlide>
                <SplideSlide>
                  <div className="grid xl:grid-cols-7 2xl:grid-cols-8 gap-4 gap-y-8 p-1">
                    {actors?.slice(7, 14).map((item, index) =>
                      <ActorGridItem key={index} href={`/dashboard/actor/detail/${item.id}`}
                        imageSrc={item.image_url}
                        name={item.name}
                      />
                    )}
                  </div>
                </SplideSlide>
              </SplideTrack>
              <div className="splide__arrows">
                <button title="Prev" className="splide__arrow splide__arrow--prev focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500">
                  <ArrowRightIcon />
                </button>
                <button title="Next" className="splide__arrow splide__arrow--next focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500">
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
          </Splide>
          :
          <div className="grid grid-cols-2 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-4 gap-y-8 p-1">
            {actors?.slice(0, 7).map((item, index) =>
              <ActorGridItem key={index} href={`/dashboard/actor/detail/${item.id}`}
                imageSrc={item.image_url}
                name={item.name}
              />
            )}
          </div>
        :
        <div className="grid grid-cols-2 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-6 gap-y-8 p-1">
          <Shimer className="w-full !h-52" />
          <Shimer className="w-full !h-52" />
          <Shimer className="w-full !h-52" />
          <Shimer className="w-full !h-52" />
          <Shimer className="w-full !h-52" />
          <Shimer className="w-full !h-52" />
          <Shimer className="w-full !h-52" />
        </div>
      }
      <div className="xl:hidden mt-2 grid grid-cols-2 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 p-1">
        {actors ?
          actors.slice(0, 12).map((item, index) =>
            <ActorGridItem key={index} href={`/dashboard/actor/detail/${item.id}`}
              imageSrc={item.image_url}
              name={item.name}
            />
          )
          : null
        }
      </div>
      {/* Actors End */}

      {/* Directors Start */}
      <div className="mt-10 flex items-center justify-between">
        <Heading className="">Directors</Heading>
        <Link href={`dashboard/director`} className="text-emerald-500 hover:text-emerald-600 text-[15px] font-medium focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500 rounded">
          View All
        </Link>
      </div>
      {directors ?
        directors.length >= 14 ?
          <Splide aria-label="Directors" className="hidden xl:block"
            options={{
              perPage: 1,
              gap: '1rem',
              pagination: false,
              speed: 1500
            }}
            hasTrack={false}
          >
            <div>
              <SplideTrack>
                <SplideSlide>
                  <div className="grid xl:grid-cols-6 gap-4 gap-y-8 p-1">
                    {directors?.slice(0, 6).map((item, index) =>
                      <DirectorGridItem key={index} href={`/dashboard/director/detail/${item.id}`}
                        imageSrc={item.image_url}
                        name={item.name}
                      />
                    )}
                  </div>
                </SplideSlide>
                <SplideSlide>
                  <div className="grid xl:grid-cols-6 gap-4 gap-y-8 p-1">
                    {directors?.slice(6, 12).map((item, index) =>
                      <DirectorGridItem key={index} href={`/dashboard/director/detail/${item.id}`}
                        imageSrc={item.image_url}
                        name={item.name}
                      />
                    )}
                  </div>
                </SplideSlide>
              </SplideTrack>
              <div className="splide__arrows">
                <button title="Prev" className="splide__arrow splide__arrow--prev focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500">
                  <ArrowRightIcon />
                </button>
                <button title="Next" className="splide__arrow splide__arrow--next focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500">
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
          </Splide>
          :
          <div className="grid grid-cols-2 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-4 gap-y-8 p-1">
            {directors?.slice(0, 7).map((item, index) =>
              <DirectorGridItem key={index} href={`/dashboard/director/detail/${item.id}`}
                imageSrc={item.image_url}
                name={item.name}
              />
            )}
          </div>
        :
        <div className="grid grid-cols-2 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-6 gap-6 gap-y-8 p-1">
          <div className="flex items-center justify-center">
            <Shimer className="!mx-8 !w-32 !h-32 !rounded-full" />
          </div>
          <div className="flex items-center justify-center">
            <Shimer className="!mx-8 !w-32 !h-32 !rounded-full" />
          </div>
          <div className="flex items-center justify-center">
            <Shimer className="!mx-8 !w-32 !h-32 !rounded-full" />
          </div>
          <div className="flex items-center justify-center">
            <Shimer className="!mx-8 !w-32 !h-32 !rounded-full" />
          </div>
          <div className="flex items-center justify-center">
            <Shimer className="!mx-8 !w-32 !h-32 !rounded-full" />
          </div>
          <div className="flex items-center justify-center">
            <Shimer className="!mx-8 !w-32 !h-32 !rounded-full" />
          </div>
        </div>
      }
      <div className="xl:hidden mt-2 grid grid-cols-2 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 p-1">
        {directors ?
          directors.slice(0, 6).map((item, index) =>
            <DirectorGridItem key={index} href={`/dashboard/director/detail/${item.id}`}
              imageSrc={item.image_url}
              name={item.name}
            />
          )
          : null
        }
      </div>
      {/* Directors End */}

      {/* Studio Start */}
      <div className="mt-10 flex items-center justify-between">
        <Heading className="">Studios</Heading>
        <Link href={`dashboard/studio`} className="text-emerald-500 hover:text-emerald-600 text-[15px] font-medium focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500 rounded">
          View All
        </Link>
      </div>
      <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
        {studios ?
          studios.slice(0, 8).map((item, index) =>
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
      {/* Studio End */}

      {/* Category Start */}
      <div className="mt-10 flex items-center justify-between">
        <Heading className="">Categories</Heading>
        <Link href={`dashboard/category`} className="text-emerald-500 hover:text-emerald-600 text-[15px] font-medium focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500 rounded">
          View All
        </Link>
      </div>
      <div className="mt-2 grid grid-cols-2 min-[560px]:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {categories ?
          categories.slice(0, 10).map((item, index) =>
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
      {/* Category End */}

      {/* Country Start */}
      <div className="mt-10 flex items-center justify-between">
        <Heading className="">Countries</Heading>
        <Link href={`dashboard/country`} className="text-emerald-500 hover:text-emerald-600 text-[15px] font-medium focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500 rounded">
          View All
        </Link>
      </div>
      <div className="mt-2 grid grid-cols-2 min-[560px]:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {countries ?
          countries.slice(0, 20).map((item, index) =>
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
      {/* Country End */}

    </Layout>
  );
}