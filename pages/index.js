import { useRef } from 'react';
import Link from 'next/link';
import { useMovieData } from '@libs/swr';
import Layout from '@components/front/Layout';
import MovieHeaderItem from '@components/front/MovieHeaderItem';
import MovieSliderItem from '@components/front/MovieSliderItem';
import { ArrowLeftIcon, ArrowRightIcon, ArrowSmRightIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { Autoplay } from 'swiper';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

export default function Movies() {
  const { data, error } = useMovieData();
  const movieWithBackdrop = data?.filter((item) => item.backdrop_url != null && item.backdrop_url != '');
  const fiveMovieWithBackdrop = movieWithBackdrop?.slice(0, 5);
  // const shuffledMovie = movieWithBackdrop.sort(() => 0.5 - Math.random());
  // const fiveMovieWithBackdrop = shuffledMovie?.slice(0, 5)

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const breakpointsMovie = {
    320: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    550: {
      slidesPerView: 3,
    },
    850: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 5,
    },
    1208: {
      slidesPerView: 6,
    },
  };

  return (
    <Layout
      title='Home - MyMovies'
      description="With MyMovie, it's easy to find Information and statistics about movies, TV shows as well as actors,
            directors and other film industry professionals."
    >
      {fiveMovieWithBackdrop && (
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
      )}

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
          <ArrowSmRightIcon className='ml-1 h-6 w-6 transition-all duration-100 group-hover:h-7 group-hover:w-7 group-hover:translate-x-1' />
        </Link>
        <div className='flex gap-2'>
          <button
            ref={prevRef}
            className='cursor-pointer rounded-full p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
          >
            <ArrowLeftIcon className='h-5 w-5 dark:text-white' />
          </button>
          <button
            ref={nextRef}
            className='cursor-pointer rounded-full p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
          >
            <ArrowRightIcon className='h-5 w-5 dark:text-white' />
          </button>
        </div>
      </div>
      <div className='mt-4 cursor-move'>
        <Swiper
          initialSlide={0}
          spaceBetween={20}
          slidesPerView='auto'
          speed={500}
          loop={true}
          slidesPerGroup={2}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          breakpoints={breakpointsMovie}
        >
          {data?.slice(0, 18).map((item) => (
            <SwiperSlide key={item.id}>
              <MovieSliderItem
                href={`/movies/detail/${item.id}`}
                imageSrc={item.image_url}
                title={item.name}
                date={item.release_date}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Movies End */}
    </Layout>
  );
}
