import { useRef } from 'react';
import { useMoviesData } from '@libs/swr';
import Heading from '@components/systems/Heading';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import Text from '@components/systems/Text';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import { ArrowRightIcon } from '@heroicons/react/solid';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Shimer from '@components/systems/Shimer';

SwiperCore.use([Navigation, Pagination]);

export default function TrailerSection({}) {
  const { data } = useMoviesData();
  const movieWithVideo = data?.filter(
    (item) => item.video_url != null && item.video_url != '' && item.video_url.startsWith('https')
  );

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const breakpoints = {
    550: {
      slidesPerView: 1.5,
    },
    720: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 2.5,
    },
  };

  return (
    <>
      {/* Movies Video Start*/}
      <div className='mt-16 flex items-center justify-between p-1'>
        <Heading h3 className='mb-0'>
          Trailers
        </Heading>
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
      <div className='mt-5 cursor-move'>
        {movieWithVideo ? (
          <Swiper
            initialSlide={0}
            spaceBetween={12}
            slidesPerView='auto'
            // slidesPerView={6.5}
            speed={500}
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
            {movieWithVideo?.slice(0, 9).map((item) => {
              // data.video_url maybe "https://youtu.be/qSqVVswa420" or "https://www.youtube.com/watch?v=2m1drlOZSDw"
              // if data.video_url includes "watch" word, then url maybe like "https://www.youtube.com/watch?v=2m1drlOZSDw"
              let youtube_url = item.video_url?.includes('watch')
                ? item?.video_url?.split('=')[1]
                : item?.video_url?.split('/')[3];
              return (
                <SwiperSlide key={item.id}>
                  <LiteYouTubeEmbed id={youtube_url} title='Youtube Video' wrapperClass='yt-lite rounded mx-1' />
                  <Text.medium className='mt-2 text-center !text-base'>{item.name}</Text.medium>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <div className='flex gap-5 overflow-hidden px-1'>
            <Shimer className='!h-64 !w-[480px]' />
            <Shimer className='!h-64 !w-[480px]' />
            <Shimer className='!h-64 !w-[480px]' />
          </div>
        )}
      </div>
      {/* Movies Video End */}
    </>
  );
}
