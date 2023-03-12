import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Layout from '@components/front/Layout';
import LabeledInput from '@components/systems/LabeledInput';
import Title from '@components/systems/Title';
import Text from '@components/systems/Text';
import Button from '@components/systems/Button';
import Heading from '@components/systems/Heading';
import DirectorGridItem from '@components/dashboard/DirectorGridItem';
import StudioGridItem from '@components/dashboard/StudioGridItem';
import MovieListItem from '@components/dashboard/MovieListItem';
import ActorGridItem from '@components/dashboard/ActorGridItem';
import { ColorSwatchIcon, FilmIcon, FlagIcon, LibraryIcon, UserGroupIcon, UsersIcon } from '@heroicons/react/outline';
import { useSearchHistoryStore } from '@store/useStore';

const fetcher = (url) => fetch(url).then((result) => result.json());

export default function Browse() {
  // https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const search = router.query.q;
  const [query, setQuery] = useState(search || '');
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/search?q=${search}`, fetcher);

  useEffect(() => {
    setQuery(search);
  }, [search]);

  const moviesHistory = useSearchHistoryStore((state) => state.movies);
  const setMoviesHistory = useSearchHistoryStore((state) => state.setMovies);
  const resetMoviesHistory = useSearchHistoryStore((state) => state.resetMovies);

  const actorsHistory = useSearchHistoryStore((state) => state.actors);
  const setActorsHistory = useSearchHistoryStore((state) => state.setActors);
  const resetActorsHistory = useSearchHistoryStore((state) => state.resetActors);

  const directorsHistory = useSearchHistoryStore((state) => state.directors);
  const setDirectorsHistory = useSearchHistoryStore((state) => state.setDirectors);
  const resetDirectorsHistory = useSearchHistoryStore((state) => state.resetDirectors);

  const studiosHistory = useSearchHistoryStore((state) => state.studios);
  const setStudiosHistory = useSearchHistoryStore((state) => state.setStudios);
  const resetStudiosHistory = useSearchHistoryStore((state) => state.resetStudios);

  const resetAllSearchHistory = useSearchHistoryStore((state) => state.resetAllSearchHistory);

  function compareSearchResult(history, newResults) {
    let newHistory = history;
    // iterate each search result
    for (const newResult of newResults) {
      // check if new result already in the history
      const exists = history.findIndex((item) => item.id == newResult.id) > -1;
      if (!exists) {
        newHistory.push(newResult);
      }
    }
    return newHistory;
  }

  useEffect(() => {
    if (data?.movies?.length > 0) {
      // if already searching
      if (moviesHistory.length > 0) {
        // compare history with new search result
        let newMovies = compareSearchResult(moviesHistory, data?.movies);
        if (newMovies != moviesHistory) {
          setMoviesHistory(newMovies);
        }
      } else {
        // first time searching, set search result to search history directly
        setMoviesHistory(data?.movies);
      }
    }
    // Actors
    if (data?.actors?.length > 0) {
      if (actorsHistory.length > 0) {
        let newActors = compareSearchResult(actorsHistory, data?.actors);
        if (newActors != actorsHistory) {
          setActorsHistory(newActors);
        }
      } else {
        setActorsHistory(data?.actors);
      }
    }
    // Directors
    if (data?.directors?.length > 0) {
      if (directorsHistory.length > 0) {
        let newDirectors = compareSearchResult(directorsHistory, data?.directors);
        if (newDirectors != directorsHistory) {
          setDirectorsHistory(newDirectors);
        }
      } else {
        setDirectorsHistory(data?.directors);
      }
    }
    // Studio
    if (data?.studios?.length > 0) {
      if (studiosHistory.length > 0) {
        let newStudios = compareSearchResult(studiosHistory, data?.studios);
        if (newStudios != studiosHistory) {
          setStudiosHistory(newStudios);
        }
      } else {
        setStudiosHistory(data?.studios);
      }
    }
  }, [data]);

  function handleSubmit(e) {
    e.preventDefault();
    if (query !== '') {
      router.push(`?q=${query}`);
    } else {
      router.push(`/browse`);
    }
  }

  // https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (error) {
    return (
      <Layout title='Browse - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Browse - MyMovie'>
      <div className='py-2'>
        <Title>Search</Title>
      </div>

      <form className='mt-2' onSubmit={handleSubmit}>
        <div className='flex items-end gap-2'>
          <LabeledInput
            wrapperClassName='w-full'
            name='search'
            placeholder='Search movie, actor, director or studio'
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type='submit' value='Submit' className='mb-4 !py-2.5 !px-8'>
            Search
          </Button>
        </div>
      </form>

      {search ? (
        <>
          {!data && <Text>Searching...</Text>}

          {data?.movies?.length < 1 &&
          data?.actors?.length < 1 &&
          data?.directors?.length < 1 &&
          data?.studios?.length < 1 ? (
            <div className='mt-8 mb-12 rounded border border-red-500 p-3'>
              <p className='text-red-500'>{`No results for "${query || search}"`}</p>
            </div>
          ) : null}

          {data?.movies?.length > 0 ? (
            <>
              <Heading h2 className='mt-6 !text-[19px]'>
                Movies
              </Heading>
              <div className='mt-2 flex flex-col gap-4 pb-4'>
                {data?.movies?.map((item, index) => (
                  <MovieListItem
                    key={index}
                    href={`/movies/${item.id}`}
                    imageSrc={item.image_url}
                    name={item.name}
                    description={item.description}
                    date={item.release_date}
                  />
                ))}
              </div>
            </>
          ) : null}

          {data?.actors?.length > 0 ? (
            <>
              <Heading h2 className='mt-6 !text-[19px]'>
                Actors
              </Heading>
              <div className='mt-2 grid grid-cols-2 gap-4 gap-y-8 pb-4 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 min-[830px]:grid-cols-6 xl:grid-cols-8'>
                {data?.actors?.map((item, index) => (
                  <ActorGridItem key={index} href={`/actors/${item.id}`} imageSrc={item.image_url} name={item.name} />
                ))}
              </div>
            </>
          ) : null}

          {data?.directors?.length > 0 ? (
            <>
              <Heading h2 className='mt-6 !text-[19px]'>
                Directors
              </Heading>
              <div className='mt-2 grid grid-cols-2 gap-8 pb-4 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8'>
                {data?.directors?.map((item, index) => (
                  <DirectorGridItem
                    key={index}
                    href={`/directors/${item.id}`}
                    imageSrc={item.image_url}
                    name={item.name}
                  />
                ))}
              </div>
            </>
          ) : null}

          {data?.studios?.length > 0 ? (
            <>
              <Heading h2 className='mt-6 !text-[19px]'>
                Studios
              </Heading>
              <div className='mt-2 grid grid-cols-1 gap-4 pb-4 min-[450px]:grid-cols-2 md:grid-cols-4'>
                {data?.studios?.map((item, index) => (
                  <StudioGridItem key={index} index={index} href={`/studios/${item.id}`} name={item.name} />
                ))}
              </div>
            </>
          ) : null}
        </>
      ) : (
        <>
          {moviesHistory?.length > 0 ||
          actorsHistory?.length > 0 ||
          directorsHistory?.length > 0 ||
          studiosHistory?.length > 0 ? (
            <>
              <div className='mt-6 flex items-center justify-between'>
                <Heading h2 className='!mb-0 !text-[20px]'>
                  Recent Search
                </Heading>
                <button
                  onClick={resetAllSearchHistory}
                  className='rounded text-[15px] font-medium text-red-500 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500'
                >
                  Clear All
                </button>
              </div>

              {moviesHistory?.length > 0 ? (
                <>
                  <div className='mt-6 flex items-center justify-between'>
                    <Heading h2 className='!text-[18px]'>
                      Movies
                    </Heading>
                    <button
                      onClick={resetMoviesHistory}
                      className='rounded text-[15px] font-medium text-red-500 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500'
                    >
                      Clear
                    </button>
                  </div>
                  <div className='mt-2 flex flex-col gap-4 pb-4'>
                    {moviesHistory?.map((item, index) => (
                      <MovieListItem
                        key={index}
                        href={`/movies/${item.id}`}
                        imageSrc={item.image_url}
                        name={item.name}
                        description={item.description}
                        date={item.release_date}
                      />
                    ))}
                  </div>
                </>
              ) : null}

              {actorsHistory?.length > 0 ? (
                <>
                  <div className='mt-6 flex items-center justify-between'>
                    <Heading h2 className='!text-[18px]'>
                      Actors
                    </Heading>
                    <button
                      onClick={resetActorsHistory}
                      className='rounded text-[15px] font-medium text-red-500 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500'
                    >
                      Clear
                    </button>
                  </div>
                  <div className='mt-2 grid grid-cols-2 gap-4 gap-y-8 pb-4 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 min-[830px]:grid-cols-6 xl:grid-cols-8'>
                    {actorsHistory?.map((item, index) => (
                      <ActorGridItem
                        key={index}
                        href={`/actors/${item.id}`}
                        imageSrc={item.image_url}
                        name={item.name}
                      />
                    ))}
                  </div>
                </>
              ) : null}

              {directorsHistory?.length > 0 ? (
                <>
                  <div className='mt-6 flex items-center justify-between'>
                    <Heading h2 className='!text-[18px]'>
                      Directors
                    </Heading>
                    <button
                      onClick={resetDirectorsHistory}
                      className='rounded text-[15px] font-medium text-red-500 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500'
                    >
                      Clear
                    </button>
                  </div>
                  <div className='mt-2 grid grid-cols-2 gap-8 pb-4 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8'>
                    {directorsHistory?.map((item, index) => (
                      <DirectorGridItem
                        key={index}
                        href={`/directors/${item.id}`}
                        imageSrc={item.image_url}
                        name={item.name}
                      />
                    ))}
                  </div>
                </>
              ) : null}

              {studiosHistory?.length > 0 ? (
                <>
                  <div className='mt-6 flex items-center justify-between'>
                    <Heading h2 className='!text-[18px]'>
                      Studios
                    </Heading>
                    <button
                      onClick={resetStudiosHistory}
                      className='rounded text-[15px] font-medium text-red-500 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500'
                    >
                      Clear
                    </button>
                  </div>
                  <div className='mt-2 grid grid-cols-1 gap-4 pb-4 min-[450px]:grid-cols-2 md:grid-cols-4'>
                    {studiosHistory?.map((item, index) => (
                      <StudioGridItem key={index} index={index} href={`/studios/${item.id}`} name={item.name} />
                    ))}
                  </div>
                </>
              ) : null}
            </>
          ) : null}
        </>
      )}

      <Heading h3 className='mt-6 !text-[19px]'>
        Browse
      </Heading>
      <div className='mt-2 grid grid-cols-1 gap-6 min-[400px]:grid-cols-2 sm:grid-cols-3'>
        <Link
          href='/movies'
          className='group h-20 rounded-lg bg-gradient-to-br from-red-500 to-yellow-500 p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500'
        >
          <div className='flex h-full w-full items-center justify-between gap-2 rounded-md bg-white px-4 py-2 transition-all duration-300 ease-in group-hover:bg-opacity-0 dark:bg-neutral-900'>
            <h2 className='bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-xl font-bold text-transparent transition-all duration-300 ease-in group-hover:text-white'>
              Movie
            </h2>
            <FilmIcon className='h-10 w-10 text-yellow-500 transition-all duration-300 ease-in group-hover:text-white' />
          </div>
        </Link>
        <Link
          href='/actors'
          className='group h-20 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500'
        >
          <div className='flex h-full w-full items-center justify-between gap-2 rounded-md bg-white px-4 py-2 transition-all duration-300 ease-in group-hover:bg-opacity-0 dark:bg-neutral-900'>
            <h2 className='bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-xl font-bold text-transparent transition-all duration-300 ease-in group-hover:text-white'>
              Actor
            </h2>
            <UserGroupIcon className='h-10 w-10 text-purple-500 transition-all duration-300 ease-in group-hover:text-white' />
          </div>
        </Link>
        <Link
          href='/directors'
          className='group h-20 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500'
        >
          <div className='flex h-full w-full items-center justify-between gap-2 rounded-md bg-white px-4 py-2 transition-all duration-300 ease-in group-hover:bg-opacity-0 dark:bg-neutral-900'>
            <h2 className='bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-xl font-bold text-transparent transition-all duration-300 ease-in group-hover:text-white'>
              Director
            </h2>
            <UsersIcon className='h-10 w-10 text-pink-500 transition-all duration-300 ease-in group-hover:text-white' />
          </div>
        </Link>
        <Link
          href='/studios'
          className='group h-20 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-500 p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500'
        >
          <div className='flex h-full w-full items-center justify-between gap-2 rounded-md bg-white px-4 py-2 transition-all duration-300 ease-in group-hover:bg-opacity-0 dark:bg-neutral-900'>
            <h2 className='bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-xl font-bold text-transparent transition-all duration-300 ease-in group-hover:text-white'>
              Studio
            </h2>
            <LibraryIcon className='h-10 w-10 text-blue-500 transition-all duration-300 ease-in group-hover:text-white' />
          </div>
        </Link>
        <Link
          href='/categories'
          className='group h-20 rounded-lg bg-gradient-to-br from-red-500 to-sky-500 p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500'
        >
          <div className='flex h-full w-full items-center justify-between gap-2 rounded-md bg-white px-4 py-2 transition-all duration-300 ease-in group-hover:bg-opacity-0 dark:bg-neutral-900'>
            <h2 className='bg-gradient-to-r from-red-500 to-sky-500 bg-clip-text text-xl font-bold text-transparent transition-all duration-300 ease-in group-hover:text-white'>
              Category
            </h2>
            <ColorSwatchIcon className='h-10 w-10 text-sky-500 transition-all duration-300 ease-in group-hover:text-white' />
          </div>
        </Link>
        <Link
          href='/countries'
          className='group h-20 rounded-lg bg-gradient-to-br from-orange-500 to-lime-500 p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500'
        >
          <div className='flex h-full w-full items-center justify-between gap-2 rounded-md bg-white px-4 py-2 transition-all duration-300 ease-in group-hover:bg-opacity-0 dark:bg-neutral-900'>
            <h2 className='bg-gradient-to-r from-orange-500 to-lime-500 bg-clip-text text-xl font-bold text-transparent transition-all duration-300 ease-in group-hover:text-white'>
              Country
            </h2>
            <FlagIcon className='h-10 w-10 text-lime-500 transition-all duration-300 ease-in group-hover:text-white' />
          </div>
        </Link>
      </div>
    </Layout>
  );
}
