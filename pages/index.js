import { useMovieData } from '@libs/swr';
import Layout from '@components/front/Layout';
import MovieHeaderItem from '@components/front/MovieHeaderItem';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { ArrowRightIcon } from '@heroicons/react/outline';

export default function Movies() {
  const { data, error } = useMovieData();
  const movieWithBackdrop = data?.filter((item) => item.backdrop_url != null && item.backdrop_url != '');
  const fiveMovieWithBackdrop = movieWithBackdrop?.slice(0, 5);
  // const shuffledMovie = movieWithBackdrop.sort(() => 0.5 - Math.random());
  // const fiveMovieWithBackdrop = shuffledMovie?.slice(0, 5)

  console.log(fiveMovieWithBackdrop);

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
                <SplideSlide key={item.id} className='py-1 px-2'>
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
                className='splide__arrow splide__arrow--prev -ml-7 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-500'
              >
                <ArrowRightIcon />
              </button>
              <button
                title='Next'
                className='splide__arrow splide__arrow--next -mr-7 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-500'
              >
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </Splide>
      )}
    </Layout>
  );
}
