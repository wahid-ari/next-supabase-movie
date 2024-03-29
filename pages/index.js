import { useMemo } from 'react';
import Link from 'next/link';
import { useMoviesData, useStudiosData, useCategoryTotalData, useCountryData } from '@libs/swr';
import clsx from 'clsx';
import Layout from '@components/front/Layout';
import MovieHeaderItem from '@components/front/MovieHeaderItem';
import Shimer from '@components/systems/Shimer';
import { ArrowRightIcon, ArrowSmRightIcon } from '@heroicons/react/outline';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import TrailerSection from '@components/front/home/TrailerSection';
import MovieSection from '@components/front/home/MovieSection';
import ActorSection from '@components/front/home/ActorSection';
import DirectorSection from '@components/front/home/DirectorSection';
import StudioImageGridItem from '@components/front/StudioImageGridItem';

export default function Home() {
  const { data, error, isLoading } = useMoviesData();
  const { data: studios, error: errorStudios } = useStudiosData();
  const { data: categories, error: errorCategories } = useCategoryTotalData();
  const { data: countries, error: errorCountries } = useCountryData();
  const movieWithBackdrop = useMemo(
    () => data?.filter((item) => item.backdrop_url != null && item.backdrop_url != ''),
    [data]
  );
  // const fiveMovieWithBackdrop = movieWithBackdrop?.slice(0, 5);
  const shuffledMovie = useMemo(() => movieWithBackdrop?.sort(() => 0.5 - Math.random()), [movieWithBackdrop]);
  const fiveMovieWithBackdrop = useMemo(() => shuffledMovie?.slice(0, 5), [shuffledMovie]);

  if (error || errorStudios || errorCategories || errorCountries) {
    return (
      <Layout
        title='Home - MyMovie'
        description="With MyMovie, it's easy to find Information and statistics about movies, TV shows as well as actors,
            directors and other film industry professionals."
      >
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout
      title='Home - MyMovie'
      description="With MyMovie, it's easy to find Information and statistics about movies, TV shows as well as actors,
            directors and other film industry professionals."
    >
      {/* Movie Header Slider Start */}
      {!isLoading && fiveMovieWithBackdrop ? (
        <Splide
          aria-label='Movies'
          options={{
            perPage: 1,
            gap: '1rem',
            pagination: true,
            speed: 1500,
            type: 'loop',
          }}
          hasTrack={false}
        >
          <div className='group'>
            <SplideTrack>
              {fiveMovieWithBackdrop.map((item, index) => (
                <SplideSlide key={item.id} className='p-1'>
                  <MovieHeaderItem
                    href={`/movies/${item.id}`}
                    name={item.name}
                    description={item.description}
                    date={item.release_date}
                    imageSrc={item.backdrop_url}
                    language={item.language}
                    priority={index}
                  />
                </SplideSlide>
              ))}
            </SplideTrack>
            <div className='splide__arrows'>
              <button
                title='Prev'
                className={clsx(
                  'splide__arrow splide__arrow--prev -ml-8',
                  'transform-cpu transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-5',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                )}
              >
                <ArrowRightIcon />
              </button>
              <button
                title='Next'
                className={clsx(
                  'splide__arrow splide__arrow--next -mr-8',
                  'transform-cpu transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-5',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
                )}
              >
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </Splide>
      ) : (
        <Shimer className='!mx-1 h-64 rounded-md sm:h-80 md:h-[420px] lg:h-[500px]' />
      )}
      {/* Movie Header Slider End */}

      <MovieSection />

      <TrailerSection />

      <ActorSection />

      <DirectorSection />

      {/* Studios Start*/}
      <div className='mt-16 flex items-center justify-between p-1'>
        <Link
          href={`/studios`}
          className={clsx(
            'group flex items-center rounded text-xl font-medium',
            'text-neutral-700 hover:text-sky-500 dark:text-neutral-200 dark:hover:text-sky-500',
            'transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
          )}
        >
          Studios
          <ArrowSmRightIcon
            className={clsx(
              'ml-1 h-6 w-6 text-neutral-600 transition-all duration-100',
              'group-hover:h-7 group-hover:w-7 group-hover:translate-x-0.5 group-hover:text-sky-500 dark:text-neutral-300'
            )}
          />
        </Link>
      </div>
      {studios ? (
        <div
          className={clsx(
            'mt-5 flex gap-4 overflow-auto px-0.5 pb-2.5 pt-1',
            'scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded',
            'scrollbar-thumb-gray-200 scrollbar-track-neutral-100',
            'dark:scrollbar-thumb-neutral-800 dark:scrollbar-track-custom-dark'
          )}
        >
          {studios.slice(0, 12).map((item, index) => (
            <StudioImageGridItem key={index} href={`/studios/${item.id}`} imageSrc={item.image_url} name={item.name} />
          ))}
        </div>
      ) : (
        <div className='mt-5 flex gap-4 overflow-hidden'>
          {[...Array(6).keys()].map((item) => (
            <Shimer key={item} className='!h-36 !w-52' />
          ))}
        </div>
      )}
      {/* Studios End */}

      {/* Categories Start */}
      <div className='mt-16 flex items-center justify-between p-1'>
        <Link
          href={`/categories`}
          className={clsx(
            'group flex items-center rounded text-xl font-medium',
            'text-neutral-700 hover:text-sky-500 dark:text-neutral-200 dark:hover:text-sky-500',
            'transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
          )}
        >
          Categories
          <ArrowSmRightIcon
            className={clsx(
              'ml-1 h-6 w-6 text-neutral-600 transition-all duration-100',
              'group-hover:h-7 group-hover:w-7 group-hover:translate-x-0.5 group-hover:text-sky-500 dark:text-neutral-300'
            )}
          />
        </Link>
      </div>
      {categories ? (
        <div className='mt-5 grid grid-cols-2 gap-4 min-[560px]:grid-cols-3 sm:gap-6 md:grid-cols-4 xl:grid-cols-6'>
          {categories.slice(0, 12).map((item, index) => (
            <Link
              key={index}
              href={`/categories/${item.id}`}
              className={clsx(
                'flex flex-wrap items-center justify-between rounded border p-4 text-[15px] font-medium',
                'transition-all duration-300 hover:bg-gradient-to-r hover:from-sky-500 hover:to-sky-700',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-neutral-800',
                'text-neutral-600 hover:text-white dark:text-neutral-200 dark:hover:text-white'
              )}
            >
              <span>{item.name}</span>
              {item.total}
            </Link>
          ))}
        </div>
      ) : (
        <div className='mt-5 grid grid-cols-2 gap-x-4 gap-y-1 min-[560px]:grid-cols-3 sm:gap-x-6 sm:gap-y-4 md:grid-cols-4 xl:grid-cols-6'>
          {[...Array(12).keys()].map((item) => (
            <Shimer key={item} className='!h-14 w-full' />
          ))}
        </div>
      )}
      {/* Categories End */}

      {/* Countries Start */}
      <div className='mt-16 flex items-center justify-between p-1'>
        <Link
          href={`/countries`}
          className={clsx(
            'group flex items-center rounded text-xl font-medium',
            'text-neutral-700 hover:text-sky-500 dark:text-neutral-200 dark:hover:text-sky-500',
            'transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
          )}
        >
          Countries
          <ArrowSmRightIcon
            className={clsx(
              'ml-1 h-6 w-6 text-neutral-600 transition-all duration-100',
              'group-hover:h-7 group-hover:w-7 group-hover:translate-x-0.5 group-hover:text-sky-500 dark:text-neutral-300'
            )}
          />
        </Link>
      </div>
      {countries ? (
        <div className='mt-5 grid grid-cols-2 gap-4 min-[560px]:grid-cols-3 sm:gap-6 md:grid-cols-4 xl:grid-cols-5'>
          {countries.slice(0, 10).map((item, index) => (
            <Link
              key={index}
              href={`/countries/${item.id}`}
              className={clsx(
                'flex items-center justify-between rounded border p-3 text-[15px] font-medium',
                'text-neutral-600 shadow transition-all duration-300 hover:text-sky-500',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
                'dark:border-neutral-800 dark:bg-[#1a1919] dark:text-neutral-200 dark:hover:text-sky-500'
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      ) : (
        <div className='mt-5 grid grid-cols-2 gap-x-4 gap-y-2 min-[560px]:grid-cols-3 sm:gap-x-6 sm:gap-y-3 md:grid-cols-4 xl:grid-cols-5'>
          {[...Array(10).keys()].map((item) => (
            <Shimer key={item} className='!h-12 w-full' />
          ))}
        </div>
      )}
      {/* Countries End */}

      <div className='py-8' />
    </Layout>
  );
}
