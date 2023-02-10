import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";
import Heading from "@components/systems/Heading";
import GenreItem from "@components/dashboard/GenreItem";
import ArtistItem from "@components/dashboard/DirectorGridItem";
import AlbumItem from "@components/dashboard/AlbumItem";
import PlaylistItem from "@components/dashboard/StudioGridItem";
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { ArrowRightIcon } from "@heroicons/react/outline";
import SongListItem from "@components/dashboard/SongListItem";
import MovieGridItem from "@components/dashboard/MovieGridItem";

const fetcher = url => fetch(url).then(result => result.json())

export default function Home() {
  const router = useRouter()
  const { query } = router
  const { data: movies, error: errorMovies } = useSWR(`${process.env.API_ROUTE}/api/movie`, fetcher)
  const { data: songs, error: errorSongs } = useSWR(`${process.env.API_ROUTE}/api/song`, fetcher)
  const { data: albums, error: errorAlbums } = useSWR(`${process.env.API_ROUTE}/api/album`, fetcher)
  const { data: artists, error: errorArtists } = useSWR(`${process.env.API_ROUTE}/api/artist`, fetcher)
  const { data: playlists, error: errorPlaylists } = useSWR(`${process.env.API_ROUTE}/api/playlist`, fetcher)
  const { data: artistByGenre, error: errorArtistByGenre } = useSWR(`${process.env.API_ROUTE}/api/genre?id=${query.genre}`, fetcher)

  if (errorMovies) {
    return (
      <Layout title="Dashboard - MyMovie">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title="Dashboard - MyMovie">
      <Title>Dashboard</Title>

      <div className="mt-10 flex items-center justify-between">
        <Heading className="">Movies</Heading>
        <Link href={`dashboard/album`} className="text-emerald-500 hover:text-emerald-600 text-[15px] font-medium focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500 rounded">
          View All
        </Link>
      </div>
      {movies ?
        movies.length >= 10 ?
          <Splide aria-label="Movies" className="hidden xl:block"
            options={{
              perPage: 1,
              gap: '1rem',
              pagination: false,
              speed: 1500
            }}
            hasTrack={false}
          >
            <div>
              <SplideTrack>
                <SplideSlide>
                  <div className="grid xl:grid-cols-5 gap-4 p-1">
                    {movies?.slice(0, 5).map((item, index) =>
                      <MovieGridItem key={index} href={`dashboard/album/detail/${item.id}`}
                        imageSrc={item.image_url}
                        title={item.name}
                        date={item.release_date}
                      />
                    )}
                  </div>
                </SplideSlide>
                <SplideSlide>
                  <div className="grid xl:grid-cols-5 gap-4 p-1">
                    {movies?.slice(5, 10).map((item, index) =>
                      <MovieGridItem key={index} href={`dashboard/album/detail/${item.id}`}
                        imageSrc={item.image_url}
                        title={item.name}
                        date={item.release_date}
                      />
                    )}
                  </div>
                </SplideSlide>
              </SplideTrack>
              <div className="splide__arrows">
                <button title="Prev" className="splide__arrow splide__arrow--prev !-mt-8 focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500">
                  <ArrowRightIcon />
                </button>
                <button title="Next" className="splide__arrow splide__arrow--next !-mt-8 focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500">
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
          </Splide>
          : 
          <div className="grid xl:grid-cols-5 gap-4 p-1">
            {movies?.slice(0, 5).map((item, index) =>
              <MovieGridItem key={index} href={`dashboard/album/detail/${item.id}`}
                imageSrc={item.image_url}
                title={item.name}
                date={item.release_date}
              />
            )}
          </div>
        :
        <div className="grid xl:grid-cols-5 gap-6">
          <Shimer className="w-full !h-72 mx-auto" />
          <Shimer className="w-full !h-72 mx-auto" />
          <Shimer className="w-full !h-72 mx-auto" />
          <Shimer className="w-full !h-72 mx-auto" />
          <Shimer className="w-full !h-72 mx-auto" />
        </div>
      }
      <div className="xl:hidden mt-2 grid grid-cols-2 min-[560px]:grid-cols-3 md:grid-cols-4 gap-4">
        {movies ?
          movies.slice(0, 6).map((item, index) =>
            <MovieGridItem key={index} href={`dashboard/album/detail/${item.id}`}
              imageSrc={item.image_url}
              title={item.name}
              date={item.release_date}
            />
          )
          :
          <>
            <Shimer className="w-full !h-60" />
            <Shimer className="w-full !h-60" />
            <Shimer className="w-full !h-60" />
            <Shimer className="w-full !h-60" />
            <Shimer className="w-full !h-60" />
          </>
        }
      </div>

      <div className="mt-10 flex items-center justify-between">
        <Heading className="">Songs</Heading>
        <Link href={`dashboard/song`} className="text-emerald-500 hover:text-emerald-600 text-[15px] font-medium focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500 rounded">
          View All
        </Link>
      </div>
      {songs ?
        songs.length >= 10 ?
          <Splide aria-label="Songs" className="hidden xl:block"
            options={{
              perPage: 1,
              gap: '1rem',
              pagination: false,
              speed: 1500
            }}
            hasTrack={false}
          >
            <div>
              <SplideTrack>
                <SplideSlide>
                  <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 gap-4 p-1">
                    {songs?.slice(0, 9).map((item, index) =>
                      <SongListItem key={index} href={`/dashboard/song/detail/${item.id}`}
                        imageSrc={item.cover_url}
                        title={item.name}
                        artist={item.artists.name}
                        onPlay={() => handlePlay(item.name, item.preview_url)}
                      />
                    )}
                  </div>
                </SplideSlide>
                <SplideSlide>
                  <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 gap-4 p-1">
                    {songs?.slice(9, 18).map((item, index) =>
                      <SongListItem key={index} href={`/dashboard/song/detail/${item.id}`}
                        imageSrc={item.cover_url}
                        title={item.name}
                        artist={item.artists.name}
                        onPlay={() => handlePlay(item.name, item.preview_url)}
                      />
                    )}
                  </div>
                </SplideSlide>
              </SplideTrack>
              <div className="splide__arrows">
                <button title="Prev" className="splide__arrow splide__arrow--prev focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500">
                  <ArrowRightIcon />
                </button>
                <button title="Next" className="splide__arrow splide__arrow--next focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500">
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
          </Splide>
          : null
        :
        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 gap-4">
          <Shimer className="w-full !h-16" />
          <Shimer className="w-full !h-16" />
          <Shimer className="w-full !h-16" />
          <Shimer className="w-full !h-16" />
          <Shimer className="w-full !h-16" />
          <Shimer className="w-full !h-16" />
        </div>
      }

      <div className="xl:hidden mt-2 grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 gap-4">
        {songs ?
          songs.slice(0, 12).map((item, index) =>
            <SongListItem key={index} href={`/dashboard/song/detail/${item.id}`}
              imageSrc={item.cover_url}
              title={item.name}
              artist={item.artists.name}
              onPlay={() => handlePlay(item.name, item.preview_url)}
            />
          )
          :
          <>
            <Shimer className="w-full !h-16" />
            <Shimer className="w-full !h-16" />
            <Shimer className="w-full !h-16" />
          </>
        }
      </div>

      <div className="mt-10 flex items-center justify-between">
        <Heading className="">Albums</Heading>
        <Link href={`dashboard/album`} className="text-emerald-500 hover:text-emerald-600 text-[15px] font-medium focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500 rounded">
          View All
        </Link>
      </div>
      {albums ?
        albums.length >= 10 ?
          <Splide aria-label="Albums" className="hidden xl:block"
            options={{
              perPage: 1,
              gap: '1rem',
              pagination: false,
              speed: 1500
            }}
            hasTrack={false}
          >
            <div>
              <SplideTrack>
                <SplideSlide>
                  <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 p-1">
                    {albums?.slice(0, 5).map((item, index) =>
                      <AlbumItem key={index} href={`dashboard/album/detail/${item.id}`}
                        imageSrc={item.cover}
                        title={item.name}
                        artist={item.artists.name}
                      />
                    )}
                  </div>
                </SplideSlide>
                <SplideSlide>
                  <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                    {albums?.slice(5, 10).map((item, index) =>
                      <AlbumItem key={index} href={`dashboard/album/detail/${item.id}`}
                        imageSrc={item.cover}
                        title={item.name}
                        artist={item.artists.name}
                      />
                    )}
                  </div>
                </SplideSlide>
              </SplideTrack>
              <div className="splide__arrows">
                <button title="Prev" className="splide__arrow splide__arrow--prev !-mt-8 focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500">
                  <ArrowRightIcon />
                </button>
                <button title="Next" className="splide__arrow splide__arrow--next !-mt-8 focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500">
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
          </Splide>
          : null
        :
        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          <Shimer className="w-full !h-60" />
          <Shimer className="w-full !h-60" />
          <Shimer className="w-full !h-60" />
          <Shimer className="w-full !h-60" />
          <Shimer className="w-full !h-60" />
        </div>
      }
      <div className="xl:hidden mt-2 grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {albums ?
          albums.slice(0, 6).map((item, index) =>
            <AlbumItem key={index} href={`dashboard/album/detail/${item.id}`}
              imageSrc={item.cover}
              title={item.name}
              artist={item.artists.name}
            />
          )
          :
          <>
            <Shimer className="w-full !h-60" />
            <Shimer className="w-full !h-60" />
            <Shimer className="w-full !h-60" />
            <Shimer className="w-full !h-60" />
            <Shimer className="w-full !h-60" />
          </>
        }
      </div>

      <div className="mt-10 flex items-center justify-between">
        <Heading className="">Artists</Heading>
        <Link href={`dashboard/artist`} className="text-emerald-500 hover:text-emerald-600 text-[15px] font-medium focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500 rounded">
          View All
        </Link>
      </div>
      <div className="mt-2 grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {artists ?
          artists.slice(0, 4).map((item, index) =>
            <ArtistItem
              key={index}
              href={`dashboard/artist/detail/${item.id}`}
              imageSrc={item.cover_url}
              title={item.name}
            />
          )
          :
          <>
            <div className="flex items-center justify-center">
              <Shimer className="!mx-8 !w-44 !h-44 !rounded-full" />
            </div>
            <div className="flex items-center justify-center">
              <Shimer className="!mx-8 !w-44 !h-44 !rounded-full" />
            </div>
            <div className="flex items-center justify-center">
              <Shimer className="!mx-8 !w-44 !h-44 !rounded-full" />
            </div>
            <div className="flex items-center justify-center">
              <Shimer className="!mx-8 !w-44 !h-44 !rounded-full" />
            </div>
          </>
        }
      </div>

      <div className="mt-10 flex items-center justify-between">
        <Heading className="">Playlists</Heading>
        <Link href={`dashboard/playlist`} className="text-emerald-500 hover:text-emerald-600 text-[15px] font-medium focus-visible:outline-none focus-visible:ring focus-visible:ring-emerald-500 rounded">
          View All
        </Link>
      </div>
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {playlists ?
          playlists.slice(0, 4).map((item, index) =>
            <PlaylistItem
              key={index}
              index={index}
              href={`/dashboard/playlist/detail/${item.id}`}
              title={item.name}
            />
          )
          :
          <>
            <Shimer className="w-full !h-36" />
            <Shimer className="w-full !h-36" />
            <Shimer className="w-full !h-36" />
            <Shimer className="w-full !h-36" />
          </>
        }
      </div>

    </Layout>
  );
}