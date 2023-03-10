import { useMovieData, useStudioData } from '@libs/swr';
import Link from 'next/link';
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
import clsx from 'clsx';
import StudioImageGridItem from '@components/front/StudioImageGridItem';

export default function Home() {
  const { data, error, isLoading } = useMovieData();
  const { data: studios, error: errorStudios } = useStudioData();
  const movieWithBackdrop = data?.filter((item) => item.backdrop_url != null && item.backdrop_url != '');
  const fiveMovieWithBackdrop = movieWithBackdrop?.slice(0, 5);
  // const shuffledMovie = movieWithBackdrop.sort(() => 0.5 - Math.random());
  // const fiveMovieWithBackdrop = shuffledMovie?.slice(0, 5);

  if (error || errorStudios) {
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
          <div>
            <SplideTrack>
              {fiveMovieWithBackdrop.map((item) => (
                <SplideSlide key={item.id} className='p-1'>
                  <MovieHeaderItem
                    href={`/movies/${item.id}`}
                    name={item.name}
                    description={item.description}
                    date={item.release_date}
                    imageSrc={item.backdrop_url}
                    language={item.language}
                  />
                </SplideSlide>
              ))}
            </SplideTrack>
            <div className='splide__arrows'>
              <button
                title='Prev'
                className='splide__arrow splide__arrow--prev -ml-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
              >
                <ArrowRightIcon />
              </button>
              <button
                title='Next'
                className='splide__arrow splide__arrow--next -mr-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
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
      <div className='mt-10 flex items-center justify-between p-1'>
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
      {data ? (
        <div className='mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {studios.slice(0, 5).map((item, index) => (
            <StudioImageGridItem key={index} href={`/studios/${item.id}`} imageSrc={item.image_url} name={item.name} />
          ))}
        </div>
      ) : (
        <div className='mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {[...Array(5).keys()].map((item) => (
            <Shimer key={item} className='!h-36 w-full' />
          ))}
        </div>
      )}
      {/* Studios End */}
    </Layout>
  );
}
