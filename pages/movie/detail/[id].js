import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMovieData } from '@libs/swr';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import nookies from 'nookies';
import Text from '@components/systems/Text';
import Heading from '@components/systems/Heading';
import { PhotographIcon } from '@heroicons/react/outline';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

export async function getServerSideProps(context) {
  const { id } = context.params;
  // const cookies = nookies.get(context)
  // if (!cookies.token) {
  //   return {
  //     redirect: {
  //       destination: "/login"
  //     }
  //   }
  // }
  return {
    props: {
      id: id,
    }, // will be passed to the page component as props
  };
}

export default function Movie({ id }) {
  const { data, error } = useMovieData(id);
  const [isLoading, setLoading] = useState(true);

  // data.video_url maybe "https://youtu.be/qSqVVswa420" or "https://www.youtube.com/watch?v=2m1drlOZSDw"
  // if data.video_url includes "watch" word, then url maybe like "https://www.youtube.com/watch?v=2m1drlOZSDw"
  const youtube_url = data?.video_url?.includes('watch')
    ? data?.video_url?.split('=')[1]
    : data?.video_url?.split('/')[3];

  if (error) {
    return (
      <Layout title='Movie Detail - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title={`${data ? data?.name + ' - MyMovie' : 'Movie Detail - MyMovie'}`} className='max-w-[70rem]'>
      <div className='flex flex-wrap items-center justify-between gap-y-3'>
        {data ? <Title>{data?.name}</Title> : <Title>Movie Detail</Title>}
      </div>

      {data ? (
        <div>
          <div className='mt-4 flex flex-wrap gap-5 sm:flex-nowrap'>
            {data?.image_url.startsWith('http') ? (
              <div className='relative mx-auto h-80 w-60 overflow-hidden sm:h-96 sm:w-2/4 md:w-2/5 xl:w-1/4 2xl:w-1/5'>
                <Image
                  alt={data?.name}
                  src={data?.image_url}
                  fill
                  className={`rounded ${isLoading ? 'blur-2xl' : 'blur-0'}`}
                  onLoadingComplete={() => setLoading(false)}
                />
              </div>
            ) : (
              <div className='relative mx-auto flex h-72 w-52 items-center justify-center overflow-hidden rounded bg-neutral-200 dark:bg-neutral-800 sm:w-1/3 md:w-1/4 xl:h-96'>
                <PhotographIcon className='h-32 w-32' />
              </div>
            )}
            <div className='sm:w-2/3 md:w-3/4 xl:w-3/4 2xl:w-4/5'>
              <Heading className='-mt-1 mb-2'>Overview</Heading>
              <Text className='!text-[15px]'>{data.description || '-'}</Text>
              <Heading className='mt-4 mb-2'>Categories</Heading>
              {data.categories.length > 0 ? (
                <div className='flex flex-wrap gap-2'>
                  {data.categories?.map((category, index) => (
                    <Link
                      key={category.id}
                      href={`/category/detail/${category.id}`}
                      className='truncate rounded text-[15px] font-medium text-sky-500 transition-all duration-300 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-500'
                    >
                      {category.name}
                      {index != data.categories.length - 1 ? ',' : ''}
                    </Link>
                  ))}
                </div>
              ) : (
                <span>-</span>
              )}

              {/* <Heading className="mt-4 mb-2">Actors</Heading>
              {data.actors.length > 0 ?
                <div className="flex flex-wrap gap-2">
                  {data.actors?.map((actor, index) =>
                    <Link key={actor.id}
                      href={`/actor/detail/${actor.id}`}
                      className="truncate text-[15px] text-sky-500 hover:text-sky-600 transition-all duration-300"
                    >
                      {actor.name}{index != data.actors.length - 1 ? "," : ""}
                    </Link>
                  )}
                </div>
                :
                <span>-</span>
              } */}

              {/* <Heading className="mt-4 mb-2">Director</Heading>
              {data.directors?.id ?
                <Link
                  href={`/director/detail/${data.directors?.id}`}
                  className="text-[15px] text-sky-500 hover:text-sky-600 transition-all duration-300"
                >
                  {data.directors?.name}
                </Link>
                :
                <span>-</span>
              } */}

              <div className='flex flex-wrap gap-x-12'>
                <div>
                  <Heading className='mt-4 mb-2'>Release Date</Heading>
                  <Text className='!text-[15px]'>{data.release_date || '-'}</Text>
                  <Heading className='mt-4 mb-2'>Studio</Heading>
                  {data.studios ? (
                    <Link
                      href={`/studio/detail/${data.studios?.id}`}
                      className='rounded text-[15px] font-medium text-sky-500 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-500'
                    >
                      {data.studios?.name || '-'}
                    </Link>
                  ) : (
                    '-'
                  )}
                </div>
                <div>
                  <Heading className='mt-4 mb-2'>Language</Heading>
                  <Text className='!text-[15px]'>{data.language || '-'}</Text>
                  <Heading className='mt-4 mb-2'>Status</Heading>
                  <Text className='!text-[15px]'>{data.status == 1 ? 'Production' : 'Released'}</Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='mt-4 flex flex-wrap gap-5 sm:flex-nowrap'>
          <div className='mx-auto w-60 sm:w-2/4 md:w-2/5 xl:w-1/4 2xl:w-1/5'>
            <Shimer className='h-80 sm:h-96' />
          </div>
          <div className='sm:w-2/3 md:w-3/4 xl:w-3/4 2xl:w-4/5'>
            <Shimer className='h-80 sm:h-96' />
          </div>
        </div>
      )}

      {data ? (
        <>
          <Heading className='mt-6 mb-3'>Actors</Heading>
          <div
            className={`${
              data.actors.length > 8 && 'mb-4'
            } flex gap-3 overflow-auto px-0.5 pb-4 scrollbar scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-800`}
          >
            {data.actors.length > 0 ? (
              data.actors?.map((actor, index) => (
                <Link
                  href={`/actor/detail/${actor.id}`}
                  key={index}
                  className='group mt-1 rounded border border-transparent shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-neutral-800'
                >
                  <div className='relative h-[180px] w-32 overflow-hidden'>
                    <Image
                      alt={actor.name}
                      src={actor.image_url}
                      fill
                      className='rounded-t brightness-90 transition-all duration-300 group-hover:cursor-pointer group-hover:brightness-100'
                    />
                  </div>
                  <div className='p-2'>
                    <p className='overflow-hidden text-ellipsis transition-all duration-300 group-hover:text-sky-500'>
                      {actor.name}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <span>-</span>
            )}
          </div>
        </>
      ) : (
        <div className='mt-6 hidden gap-3 sm:flex'>
          <Shimer className='!h-[180px] !w-32' />
          <Shimer className='!h-[180px] !w-32' />
        </div>
      )}

      {data ? (
        <>
          <Heading className='mt-3 mb-3'>Director</Heading>
          <div className='flex px-0.5 pb-4'>
            <Link
              href={`/director/detail/${data.directors?.id}`}
              className='group mt-1 w-32 rounded border border-transparent shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-neutral-800'
            >
              <div className='relative h-[180px] overflow-hidden'>
                <Image
                  alt={data.directors?.name}
                  src={data.directors?.image_url}
                  fill
                  className='rounded-t brightness-90 transition-all duration-300 group-hover:cursor-pointer group-hover:brightness-100'
                />
              </div>
              <div className='p-2'>
                <p className='overflow-hidden text-ellipsis transition-all duration-300 group-hover:text-sky-500'>
                  {data.directors?.name}
                </p>
              </div>
            </Link>
          </div>
        </>
      ) : (
        <div className='mt-6 hidden gap-3 sm:flex'>
          <Shimer className='!h-[180px] !w-32' />
        </div>
      )}

      {data ? (
        <>
          <Heading className='mt-3 mb-3'>Trailer</Heading>
          {data?.video_url?.startsWith('https') ? (
            <div className='aspect-video w-full sm:w-2/3 md:w-1/2'>
              {/* <iframe
                className='h-64 w-full rounded sm:h-72 md:h-80 md:w-3/4 xl:w-1/2'
                src={`https://www.youtube.com/embed/${youtube_url}`}
                title='YouTube video player'
                frameborder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowfullscreen
              ></iframe> */}
              <LiteYouTubeEmbed id={youtube_url} title='Youtube Video' wrapperClass='yt-lite rounded my-5' />
            </div>
          ) : (
            <span>-</span>
          )}
        </>
      ) : null}
    </Layout>
  );
}
