import { useRef } from 'react';
import Link from 'next/link';
import { useMovieData } from '@libs/swr';
import Layout from '@components/front/Layout';
import MovieHeaderItem from '@components/front/MovieHeaderItem';
import MovieSliderItem from '@components/front/MovieSliderItem';
import Shimer from '@components/systems/Shimer';
import { ArrowLeftIcon, ArrowRightIcon, ArrowSmRightIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

SwiperCore.use([Navigation, Pagination]);

export default function Movies() {
  const { data, error, isLoading } = useMovieData();
  const movieWithBackdrop = data?.filter((item) => item.backdrop_url != null && item.backdrop_url != '');
  const fiveMovieWithBackdrop = movieWithBackdrop?.slice(0, 5);
  // const shuffledMovie = movieWithBackdrop.sort(() => 0.5 - Math.random());
  // const fiveMovieWithBackdrop = shuffledMovie?.slice(0, 5)

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const breakpointsMovie = {
    320: {
      slidesPerView: 1.5,
    },
    400: {
      slidesPerView: 2,
    },
    450: {
      slidesPerView: 2.3,
    },
    550: {
      slidesPerView: 3.3,
    },
    850: {
      slidesPerView: 4.3,
    },
    1024: {
      slidesPerView: 5.3,
    },
    1208: {
      slidesPerView: 6.3,
    },
  };

  if (error) {
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

      {/* Movies Start*/}
      <div className='mt-10 flex items-center justify-between p-1'>
        <Link
          href={`/movies`}
          className={clsx(
            'group flex items-center rounded text-xl font-medium',
            'text-neutral-700 hover:text-sky-500 dark:text-neutral-200 dark:hover:text-sky-500',
            'transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
          )}
        >
          Movies
          <ArrowSmRightIcon className='ml-1 h-6 w-6 text-neutral-600 transition-all duration-100 group-hover:h-7 group-hover:w-7 group-hover:translate-x-0.5 group-hover:text-sky-500 dark:text-neutral-300' />
        </Link>
        <div className='flex gap-2'>
          <button
            aria-label='Prev'
            ref={prevRef}
            className='group cursor-pointer rounded-full p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
          >
            <ArrowLeftIcon className='h-5 w-5 text-neutral-600 transition-all group-hover:text-sky-500 dark:text-neutral-300' />
          </button>
          <button
            aria-label='Next'
            ref={nextRef}
            className='group cursor-pointer rounded-full p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
          >
            <ArrowRightIcon className='h-5 w-5 text-neutral-600 transition-all group-hover:text-sky-500 dark:text-neutral-300' />
          </button>
        </div>
      </div>
      <div className='mt-4 cursor-move'>
        {data ? (
          <Swiper
            initialSlide={0}
            spaceBetween={12}
            slidesPerView='auto'
            // slidesPerView={6.5}
            speed={300}
            loop={true}
            // slidesPerGroup={2}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            breakpoints={breakpointsMovie}
          >
            {data?.slice(0, 18).map((item) => (
              <SwiperSlide key={item.id}>
                <MovieSliderItem
                  href={`/movies/${item.id}`}
                  imageSrc={item.image_url}
                  title={item.name}
                  date={item.release_date}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className='flex gap-5 overflow-hidden px-1'>
            <Shimer className='!h-64 !w-[180px]' />
            <Shimer className='!h-64 !w-[180px]' />
            <Shimer className='!h-64 !w-[180px]' />
            <Shimer className='!h-64 !w-[180px]' />
            <Shimer className='!h-64 !w-[180px]' />
            <Shimer className='!h-64 !w-[180px]' />
            <Shimer className='!h-64 !w-[180px]' />
          </div>
        )}
      </div>
      {/* Movies End */}
    </Layout>
  );
}
