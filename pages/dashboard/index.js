import Link from 'next/link';
import {
  useActorData,
  useCategoryTotalData,
  useCountryData,
  useDirectorData,
  useMovieData,
  useStudioData,
} from '@libs/swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import Heading from '@components/systems/Heading';
import ActorGridItem from '@components/dashboard/ActorGridItem';
import MovieGridItem from '@components/dashboard/MovieGridItem';
import DirectorGridItem from '@components/dashboard/DirectorGridItem';
import StudioGridItem from '@components/dashboard/StudioGridItem';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import nookies from 'nookies';

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  if (!cookies.token) {
    return {
      redirect: {
        destination: '/login',
      },
    };
  }
  return {
    props: {},
  };
}

export default function Dashboard() {
  const { data: movies, error: errorMovies } = useMovieData();
  const { data: actors, error: errorActors } = useActorData();
  const { data: directors, error: errorDirectors } = useDirectorData();
  const { data: studios, error: errorStudios } = useStudioData();
  const { data: categories, error: errorCategories } = useCategoryTotalData();
  const { data: countries, error: errorCountries } = useCountryData();

  if (errorMovies || errorActors || errorDirectors || errorStudios || errorCategories || errorCountries) {
    return (
      <Layout title='Dashboard - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Dashboard - MyMovie'>
      <Title>Dashboard</Title>

      {/* Movies Start*/}
      <div className='mt-10 flex items-center justify-between'>
        <Heading className=''>Movies</Heading>
        <Link
          href={`dashboard/movie`}
          className='rounded text-[15px] font-medium text-sky-500 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
        >
          View All
        </Link>
      </div>
      {movies ? (
        movies.length >= 10 ? (
          <Splide
            aria-label='Movies'
            className='hidden xl:block'
            options={{
              perPage: 1,
              gap: '1rem',
              pagination: false,
              speed: 1500,
            }}
            hasTrack={false}
          >
            <div>
              <SplideTrack>
                <SplideSlide>
                  <div className='grid gap-4 p-1 xl:grid-cols-5'>
                    {movies?.slice(0, 5).map((item, index) => (
                      <MovieGridItem
                        key={index}
                        href={`dashboard/movie/detail/${item.id}`}
                        imageSrc={item.image_url}
                        title={item.name}
                        date={item.release_date}
                      />
                    ))}
                  </div>
                </SplideSlide>
                <SplideSlide>
                  <div className='grid gap-4 p-1 xl:grid-cols-5'>
                    {movies?.slice(5, 10).map((item, index) => (
                      <MovieGridItem
                        key={index}
                        href={`dashboard/movie/detail/${item.id}`}
                        imageSrc={item.image_url}
                        title={item.name}
                        date={item.release_date}
                      />
                    ))}
                  </div>
                </SplideSlide>
              </SplideTrack>
              <div className='splide__arrows'>
                <button
                  title='Prev'
                  className='splide__arrow splide__arrow--prev !-mt-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                >
                  <ArrowRightIcon />
                </button>
                <button
                  title='Next'
                  className='splide__arrow splide__arrow--next !-mt-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                >
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
          </Splide>
        ) : (
          <div className='grid gap-4 p-1 xl:grid-cols-5'>
            {movies?.slice(0, 5).map((item, index) => (
              <MovieGridItem
                key={index}
                href={`dashboard/movie/detail/${item.id}`}
                imageSrc={item.image_url}
                title={item.name}
                date={item.release_date}
              />
            ))}
          </div>
        )
      ) : (
        <div className='grid grid-cols-2 gap-6 p-2 min-[560px]:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'>
          <Shimer className='!h-64 w-full' />
          <Shimer className='!h-64 w-full' />
          <Shimer className='!h-64 w-full' />
          <Shimer className='!h-64 w-full' />
          <Shimer className='!h-64 w-full' />
        </div>
      )}
      <div className='mt-2 grid grid-cols-2 gap-4 min-[560px]:grid-cols-3 md:grid-cols-4 xl:hidden'>
        {movies
          ? movies
              .slice(0, 12)
              .map((item, index) => (
                <MovieGridItem
                  key={index}
                  href={`dashboard/movie/detail/${item.id}`}
                  imageSrc={item.image_url}
                  title={item.name}
                  date={item.release_date}
                />
              ))
          : null}
      </div>
      {/* Movies End*/}

      {/* Actors Start */}
      <div className='mt-10 flex items-center justify-between'>
        <Heading className=''>Actors</Heading>
        <Link
          href={`dashboard/actor`}
          className='rounded text-[15px] font-medium text-sky-500 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
        >
          View All
        </Link>
      </div>
      {actors ? (
        actors.length >= 14 ? (
          <Splide
            aria-label='Actors'
            className='hidden xl:block'
            options={{
              perPage: 1,
              gap: '1rem',
              pagination: false,
              speed: 1500,
            }}
            hasTrack={false}
          >
            <div>
              <SplideTrack>
                <SplideSlide>
                  <div className='grid gap-4 gap-y-8 p-1 xl:grid-cols-7 2xl:grid-cols-8'>
                    {actors?.slice(0, 7).map((item, index) => (
                      <ActorGridItem
                        key={index}
                        href={`/dashboard/actor/detail/${item.id}`}
                        imageSrc={item.image_url}
                        name={item.name}
                      />
                    ))}
                  </div>
                </SplideSlide>
                <SplideSlide>
                  <div className='grid gap-4 gap-y-8 p-1 xl:grid-cols-7 2xl:grid-cols-8'>
                    {actors?.slice(7, 14).map((item, index) => (
                      <ActorGridItem
                        key={index}
                        href={`/dashboard/actor/detail/${item.id}`}
                        imageSrc={item.image_url}
                        name={item.name}
                      />
                    ))}
                  </div>
                </SplideSlide>
              </SplideTrack>
              <div className='splide__arrows'>
                <button
                  title='Prev'
                  className='splide__arrow splide__arrow--prev focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                >
                  <ArrowRightIcon />
                </button>
                <button
                  title='Next'
                  className='splide__arrow splide__arrow--next focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                >
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
          </Splide>
        ) : (
          <div className='grid grid-cols-2 gap-4 gap-y-8 p-1 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8'>
            {actors?.slice(0, 7).map((item, index) => (
              <ActorGridItem
                key={index}
                href={`/dashboard/actor/detail/${item.id}`}
                imageSrc={item.image_url}
                name={item.name}
              />
            ))}
          </div>
        )
      ) : (
        <div className='grid grid-cols-2 gap-6 gap-y-8 p-1 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8'>
          <Shimer className='!h-52 w-full' />
          <Shimer className='!h-52 w-full' />
          <Shimer className='!h-52 w-full' />
          <Shimer className='!h-52 w-full' />
          <Shimer className='!h-52 w-full' />
          <Shimer className='!h-52 w-full' />
          <Shimer className='!h-52 w-full' />
        </div>
      )}
      <div className='mt-2 grid grid-cols-2 gap-6 p-1 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:hidden'>
        {actors
          ? actors
              .slice(0, 12)
              .map((item, index) => (
                <ActorGridItem
                  key={index}
                  href={`/dashboard/actor/detail/${item.id}`}
                  imageSrc={item.image_url}
                  name={item.name}
                />
              ))
          : null}
      </div>
      {/* Actors End */}

      {/* Directors Start */}
      <div className='mt-10 flex items-center justify-between'>
        <Heading className=''>Directors</Heading>
        <Link
          href={`dashboard/director`}
          className='rounded text-[15px] font-medium text-sky-500 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
        >
          View All
        </Link>
      </div>
      {directors ? (
        directors.length >= 14 ? (
          <Splide
            aria-label='Directors'
            className='hidden xl:block'
            options={{
              perPage: 1,
              gap: '1rem',
              pagination: false,
              speed: 1500,
            }}
            hasTrack={false}
          >
            <div>
              <SplideTrack>
                <SplideSlide>
                  <div className='grid gap-4 gap-y-8 p-1 xl:grid-cols-6'>
                    {directors?.slice(0, 6).map((item, index) => (
                      <DirectorGridItem
                        key={index}
                        href={`/dashboard/director/detail/${item.id}`}
                        imageSrc={item.image_url}
                        name={item.name}
                      />
                    ))}
                  </div>
                </SplideSlide>
                <SplideSlide>
                  <div className='grid gap-4 gap-y-8 p-1 xl:grid-cols-6'>
                    {directors?.slice(6, 12).map((item, index) => (
                      <DirectorGridItem
                        key={index}
                        href={`/dashboard/director/detail/${item.id}`}
                        imageSrc={item.image_url}
                        name={item.name}
                      />
                    ))}
                  </div>
                </SplideSlide>
              </SplideTrack>
              <div className='splide__arrows'>
                <button
                  title='Prev'
                  className='splide__arrow splide__arrow--prev focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                >
                  <ArrowRightIcon />
                </button>
                <button
                  title='Next'
                  className='splide__arrow splide__arrow--next focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                >
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
          </Splide>
        ) : (
          <div className='grid grid-cols-2 gap-4 gap-y-8 p-1 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8'>
            {directors?.slice(0, 7).map((item, index) => (
              <DirectorGridItem
                key={index}
                href={`/dashboard/director/detail/${item.id}`}
                imageSrc={item.image_url}
                name={item.name}
              />
            ))}
          </div>
        )
      ) : (
        <div className='grid grid-cols-2 gap-6 gap-y-8 p-1 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-6'>
          <div className='flex items-center justify-center'>
            <Shimer className='!mx-8 !h-32 !w-32 !rounded-full' />
          </div>
          <div className='flex items-center justify-center'>
            <Shimer className='!mx-8 !h-32 !w-32 !rounded-full' />
          </div>
          <div className='flex items-center justify-center'>
            <Shimer className='!mx-8 !h-32 !w-32 !rounded-full' />
          </div>
          <div className='flex items-center justify-center'>
            <Shimer className='!mx-8 !h-32 !w-32 !rounded-full' />
          </div>
          <div className='flex items-center justify-center'>
            <Shimer className='!mx-8 !h-32 !w-32 !rounded-full' />
          </div>
          <div className='flex items-center justify-center'>
            <Shimer className='!mx-8 !h-32 !w-32 !rounded-full' />
          </div>
        </div>
      )}
      <div className='mt-2 grid grid-cols-2 gap-6 p-1 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:hidden'>
        {directors
          ? directors
              .slice(0, 6)
              .map((item, index) => (
                <DirectorGridItem
                  key={index}
                  href={`/dashboard/director/detail/${item.id}`}
                  imageSrc={item.image_url}
                  name={item.name}
                />
              ))
          : null}
      </div>
      {/* Directors End */}

      {/* Studio Start */}
      <div className='mt-10 flex items-center justify-between'>
        <Heading className=''>Studios</Heading>
        <Link
          href={`dashboard/studio`}
          className='rounded text-[15px] font-medium text-sky-500 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
        >
          View All
        </Link>
      </div>
      <div className='mt-2 grid grid-cols-2 gap-4 md:grid-cols-4'>
        {studios ? (
          studios
            .slice(0, 8)
            .map((item, index) => (
              <StudioGridItem key={index} index={index} href={`/dashboard/studio/detail/${item.id}`} name={item.name} />
            ))
        ) : (
          <>
            <Shimer className='!h-24 w-full' />
            <Shimer className='!h-24 w-full' />
            <Shimer className='!h-24 w-full' />
            <Shimer className='!h-24 w-full' />
          </>
        )}
      </div>
      {/* Studio End */}

      {/* Category Start */}
      <div className='mt-10 flex items-center justify-between'>
        <Heading className=''>Categories</Heading>
        <Link
          href={`dashboard/category`}
          className='rounded text-[15px] font-medium text-sky-500 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
        >
          View All
        </Link>
      </div>
      <div className='mt-2 grid grid-cols-2 gap-4 min-[560px]:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'>
        {categories
          ? categories.slice(0, 10).map((item, index) => (
              <Link
                key={index}
                href={`/dashboard/category/detail/${item.id}`}
                className='flex items-center justify-between rounded border p-4 text-[15px] font-medium text-neutral-600 transition-all duration-300 hover:bg-gradient-to-r hover:from-sky-500 hover:to-sky-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-neutral-800 dark:text-neutral-200 dark:hover:text-white'
              >
                <span>{item.name}</span>
                {item.total}
              </Link>
            ))
          : [...Array(5).keys()].map((item) => <Shimer key={item} className='!h-16 w-full' />)}
      </div>
      {/* Category End */}

      {/* Country Start */}
      <div className='mt-10 flex items-center justify-between'>
        <Heading className=''>Countries</Heading>
        <Link
          href={`dashboard/country`}
          className='rounded text-[15px] font-medium text-sky-500 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
        >
          View All
        </Link>
      </div>
      <div className='mt-2 grid grid-cols-2 gap-4 min-[560px]:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'>
        {countries
          ? countries.slice(0, 20).map((item, index) => (
              <Link
                key={index}
                href={`/dashboard/country/detail/${item.id}`}
                className='flex items-center justify-between rounded border p-3 text-[15px] font-medium text-neutral-600 shadow transition-all duration-300 hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-neutral-800 dark:bg-[#1a1919] dark:text-neutral-200 dark:hover:text-sky-500'
              >
                {item.name}
              </Link>
            ))
          : [...Array(5).keys()].map((item) => <Shimer key={item} className='!h-16 w-full' />)}
      </div>
      {/* Country End */}
    </Layout>
  );
}
