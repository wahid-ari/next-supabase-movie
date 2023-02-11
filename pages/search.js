import { useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "@components/layout/Layout";
import LabeledInput from "@components/systems/LabeledInput";
import Title from "@components/systems/Title";
import Text from "@components/systems/Text";
import Button from "@components/systems/Button";
import Heading from "@components/systems/Heading";
import DirectorGridItem from "@components/dashboard/DirectorGridItem";
import StudioGridItem from "@components/dashboard/StudioGridItem";
import MovieListItem from "@components/dashboard/MovieListItem";
import ActorGridItem from "@components/dashboard/ActorGridItem";
import { FilmIcon, LibraryIcon, UserGroupIcon, UsersIcon } from "@heroicons/react/outline";
import { useSearchHistoryStore } from '@store/useStore';

const fetcher = url => fetch(url).then(result => result.json())

export default function Search() {
  const router = useRouter()
  const search = router.query.q
  const query = useRef(search)
  const { data, error } = useSWR(`${process.env.API_ROUTE}/api/search?q=${search}`, fetcher)

  const moviesHistory = useSearchHistoryStore(state => state.movies)
  const setMoviesHistory = useSearchHistoryStore(state => state.setMovies)
  const resetMoviesHistory = useSearchHistoryStore(state => state.resetMovies)

  const actorsHistory = useSearchHistoryStore(state => state.actors)
  const setActorsHistory = useSearchHistoryStore(state => state.setActors)
  const resetActorsHistory = useSearchHistoryStore(state => state.resetActors)

  const directorsHistory = useSearchHistoryStore(state => state.directors)
  const setDirectorsHistory = useSearchHistoryStore(state => state.setDirectors)
  const resetDirectorsHistory = useSearchHistoryStore(state => state.resetDirectors)

  const studiosHistory = useSearchHistoryStore(state => state.studios)
  const setStudiosHistory = useSearchHistoryStore(state => state.setStudios)
  const resetStudiosHistory = useSearchHistoryStore(state => state.resetStudios)

  const resetAllSearchHistory = useSearchHistoryStore(state => state.resetAllSearchHistory)

  function compareSearchResult(history, newResults) {
    let newHistory = history
    // iterate each search result
    for (const newResult of newResults) {
      // check if new result already in the history
      const exists = history.findIndex(item => item.id == newResult.id) > -1;
      if (!exists) {
        newHistory.push(newResult)
      }
    }
    return newHistory
  }

  useEffect(() => {
    if (data?.movies?.length > 0) {
      // if already searching
      if (moviesHistory.length > 0) {
        // compare history with new search result
        let newMovies = compareSearchResult(moviesHistory, data?.movies)
        if (newMovies != moviesHistory) {
          setMoviesHistory(newMovies)
        }
      } else { // first time searching, set search result to search history directly
        setMoviesHistory(data?.movies)
      }
    }
    // Actors
    if (data?.actors?.length > 0) {
      if (actorsHistory.length > 0) {
        let newActors = compareSearchResult(actorsHistory, data?.actors)
        if (newActors != actorsHistory) {
          setActorsHistory(newActors)
        }
      } else {
        setActorsHistory(data?.actors)
      }
    }
    // Directors
    if (data?.directors?.length > 0) {
      if (directorsHistory.length > 0) {
        let newDirectors = compareSearchResult(directorsHistory, data?.directors)
        if (newDirectors != directorsHistory) {
          setDirectorsHistory(newDirectors)
        }
      } else {
        setDirectorsHistory(data?.directors)
      }
    }
    // Studio
    if (data?.studios?.length > 0) {
      if (studiosHistory.length > 0) {
        let newStudios = compareSearchResult(studiosHistory, data?.studios)
        if (newStudios != studiosHistory) {
          setStudiosHistory(newStudios)
        }
      } else {
        setStudiosHistory(data?.studios)
      }
    }
  }, [data])

  function handleSubmit(e) {
    e.preventDefault()
    if (query !== "") {
      router.push(`?q=${query.current}`)
    } else {
      router.push(`/search`)
    }
  }

  if (error) {
    return (
      <Layout title="Search - MyMovie">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title="Search - MyMovie">
      <Title>Search</Title>

      <form className="mt-2" onSubmit={handleSubmit}>
        <div className="flex items-end gap-2">
          <LabeledInput
            wrapperClassName="w-full sm:max-w-sm"
            name="search"
            placeholder="Search movie, actor, director or studio"
            type="text"
            onChange={(e) => query.current = e.target.value}
          />
          <Button.success type="submit" value="Submit" className="mb-4 !py-2.5 px-5">Search</Button.success>
        </div>
      </form>

      {search ?
        <>
          {!data && <Text>Searching...</Text>}

          {data?.movies?.length < 1 && data?.actors?.length < 1 && data?.directors?.length < 1 && data?.studios?.length < 1 ?
            <div className="rounded border border-red-500 p-3">
              <p className="text-red-500">{`No results for "${query.current || search}"`}</p>
            </div>
            :
            null
          }

          {data?.movies.length > 0 ?
            <>
              <Heading h3 className="mt-6">Movies</Heading>
              <div className="mt-2 pb-4 flex flex-col gap-4">
                {data?.movies?.map((item, index) =>
                  <MovieListItem key={index} href={`dashboard/movie/detail/${item.id}`}
                    imageSrc={item.image_url}
                    name={item.name}
                    description={item.description}
                    date={item.release_date}
                  />
                )}
              </div>
            </>
            :
            null
          }

          {data?.actors.length > 0 ?
            <>
              <Heading h3 className="mt-6">Actors</Heading>
              <div className="mt-2 pb-4 grid grid-cols-2 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-4 gap-y-8">
                {data?.actors?.map((item, index) =>
                  <ActorGridItem key={index} href={`dashboard/album/detail/${item.id}`}
                    imageSrc={item.image_url}
                    name={item.name}
                  />
                )}
              </div>
            </>
            :
            null
          }

          {data?.directors.length > 0 ?
            <>
              <Heading h3 className="mt-6">Directors</Heading>
              <div className="mt-2 pb-4 grid grid-cols-2 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-8">
                {data?.directors?.map((item, index) =>
                  <DirectorGridItem
                    key={index}
                    href={`dashboard/artist/detail/${item.id}`}
                    imageSrc={item.image_url}
                    name={item.name}
                  />
                )}
              </div>
            </>
            :
            null
          }

          {data?.studios.length > 0 ?
            <>
              <Heading h3 className="mt-6">Studios</Heading>
              <div className="mt-2 pb-4 grid grid-cols-1 min-[450px]:grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-4">
                {data?.studios?.map((item, index) =>
                  <StudioGridItem
                    key={index}
                    index={index}
                    href={`/dashboard/playlist/detail/${item.id}`}
                    name={item.name}
                  />
                )}
              </div>
            </>
            :
            null
          }
        </>
        :
        <>
          {moviesHistory?.length > 0 || actorsHistory?.length > 0 || directorsHistory?.length > 0 || studiosHistory?.length > 0 ?
            <>
              <div className="mt-6 flex items-center justify-between">
                <Heading h3 >Recent Search</Heading>
                <button onClick={resetAllSearchHistory} className="text-red-500 hover:text-red-600 text-[15px] font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500 rounded">
                  Clear All
                </button>
              </div>

              {moviesHistory?.length > 0 ?
                <>
                  <div className="mt-6 flex items-center justify-between">
                    <Heading>Movies</Heading>
                    <button onClick={resetMoviesHistory} className="text-red-500 hover:text-red-600 text-[15px] font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500 rounded">
                      Clear
                    </button>
                  </div>
                  <div className="mt-2 pb-4 flex flex-col gap-4">
                    {moviesHistory?.map((item, index) =>
                      <MovieListItem key={index} href={`dashboard/movie/detail/${item.id}`}
                        imageSrc={item.image_url}
                        name={item.name}
                        description={item.description}
                        date={item.release_date}
                      />
                    )}
                  </div>
                </>
                : null
              }

              {actorsHistory?.length > 0 ?
                <>
                  <div className="mt-6 flex items-center justify-between">
                    <Heading>Actors</Heading>
                    <button onClick={resetActorsHistory} className="text-red-500 hover:text-red-600 text-[15px] font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500 rounded">
                      Clear
                    </button>
                  </div>
                  <div className="mt-2 pb-4 grid grid-cols-2 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-4 gap-y-8">
                    {actorsHistory?.map((item, index) =>
                      <ActorGridItem key={index} href={`dashboard/album/detail/${item.id}`}
                        imageSrc={item.image_url}
                        name={item.name}
                      />
                    )}
                  </div>
                </>
                : null
              }

              {directorsHistory?.length > 0 ?
                <>
                  <div className="mt-6 flex items-center justify-between">
                    <Heading>Directors</Heading>
                    <button onClick={resetDirectorsHistory} className="text-red-500 hover:text-red-600 text-[15px] font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500 rounded">
                      Clear
                    </button>
                  </div>
                  <div className="mt-2 pb-4 grid grid-cols-2 min-[450px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-8">
                    {directorsHistory?.map((item, index) =>
                      <DirectorGridItem
                        key={index}
                        href={`dashboard/artist/detail/${item.id}`}
                        imageSrc={item.image_url}
                        name={item.name}
                      />
                    )}
                  </div>
                </>
                : null
              }

              {studiosHistory?.length > 0 ?
                <>
                  <div className="mt-6 flex items-center justify-between">
                    <Heading>Studios</Heading>
                    <button onClick={resetStudiosHistory} className="text-red-500 hover:text-red-600 text-[15px] font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500 rounded">
                      Clear
                    </button>
                  </div>
                  <div className="mt-2 pb-4 grid grid-cols-1 min-[450px]:grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-4">
                    {studiosHistory?.map((item, index) =>
                      <StudioGridItem
                        key={index}
                        index={index}
                        href={`/dashboard/playlist/detail/${item.id}`}
                        name={item.name}
                      />
                    )}
                  </div>
                </>
                : null
              }
            </>
            :
            null
          }
        </>
      }

      <Heading className="mt-6">Browse</Heading>
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Link href="/dashboard/movie" className="h-20 p-0.5 rounded-lg group bg-gradient-to-br from-red-500 to-yellow-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500">
          <div className="flex items-center gap-2 px-4 py-2 transition-all ease-in duration-300 bg-white dark:bg-neutral-900 rounded-md group-hover:bg-opacity-0 w-full h-full">
            <FilmIcon className="w-8 h-8 text-red-500 group-hover:text-white transition-all ease-in duration-300" />
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500 group-hover:text-white transition-all ease-in duration-300">
              Movie
            </h2>
          </div>
        </Link>
        <Link href="/dashboard/actor" className="h-20 p-0.5 rounded-lg group bg-gradient-to-br from-cyan-500 to-purple-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500">
          <div className="flex items-center gap-2 px-4 py-2 transition-all ease-in duration-300 bg-white dark:bg-neutral-900 rounded-md group-hover:bg-opacity-0 w-full h-full">
            <UserGroupIcon className="w-8 h-8 text-cyan-500 group-hover:text-white transition-all ease-in duration-300" />
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:text-white transition-all ease-in duration-300">
              Actor
            </h2>
          </div>
        </Link>
        <Link href="/dashboard/director" className="h-20 p-0.5 rounded-lg group bg-gradient-to-br from-violet-500 to-pink-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-500">
          <div className="flex items-center gap-2 px-4 py-2 transition-all ease-in duration-300 bg-white dark:bg-neutral-900 rounded-md group-hover:bg-opacity-0 w-full h-full">
            <UsersIcon className="w-8 h-8 text-violet-500 group-hover:text-white transition-all ease-in duration-300" />
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-pink-500 group-hover:text-white transition-all ease-in duration-300">
              Director
            </h2>
          </div>
        </Link>
        <Link href="/dashboard/studio" className="h-20 p-0.5 rounded-lg group bg-gradient-to-br from-emerald-500 to-blue-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500">
          <div className="flex items-center gap-2 px-4 py-2 transition-all ease-in duration-300 bg-white dark:bg-neutral-900 rounded-md group-hover:bg-opacity-0 w-full h-full">
            <LibraryIcon className="w-8 h-8 text-emerald-500 group-hover:text-white transition-all ease-in duration-300" />
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-blue-500 group-hover:text-white transition-all ease-in duration-300">
              Studio
            </h2>
          </div>
        </Link>
      </div>
    </Layout>
  )
}