import { useRef } from 'react';
import { useMovieData } from '@libs/swr';
import clsx from 'clsx';
import { ArrowLeftIcon, ArrowSmRightIcon } from '@heroicons/react/outline';
import { ArrowRightIcon } from '@heroicons/react/solid';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Shimer from '@components/systems/Shimer';
import Link from 'next/link';
import MovieSliderItem from '@components/front/MovieSliderItem';

SwiperCore.use([Navigation, Pagination]);

export default function MovieSection({}) {
  const { data } = useMovieData();

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const breakpoints = {
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

  return (
    <>
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
          <ArrowSmRightIcon
            className={clsx(
              'ml-1 h-6 w-6 text-neutral-600 transition-all duration-100',
              'group-hover:h-7 group-hover:w-7 group-hover:translate-x-0.5 group-hover:text-sky-500 dark:text-neutral-300'
            )}
          />
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
            breakpoints={breakpoints}
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
    </>
  );
}
