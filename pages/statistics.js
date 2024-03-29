import { useState, useEffect } from 'react';
import {
  useActorByCountryData,
  useDirectorByCountryData,
  useMovieByActorData,
  useMovieByCategoryData,
  useMovieByDirectorData,
  useMovieByStudioData,
  useStudioByCountryData,
} from '@libs/swr';
import { useTheme } from 'next-themes';
import Layout from '@components/layout/Layout';
import Shimer from '@components/systems/Shimer';
import Text from '@components/systems/Text';
import Titles from '@components/systems/Title';
import nookies from 'nookies';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import { populateData, options, optionsLineChart, optionsBarChart, optionsHorizontalBarChart } from '@utils/chartSetup';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Filler,
  Legend
);

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  if (!cookies.token) {
    return {
      redirect: {
        destination: '/login',
      },
    };
  }
  return {
    props: {},
  };
}

export default function Statistics() {
  const { theme } = useTheme();
  const [dataActorByCountry, setDataActorByCountry] = useState();
  const [dataDirectorByCountry, setDataDirectorByCountry] = useState();
  const [dataStudioByCountry, setDataStudioByCountry] = useState();
  const [dataMovieByActor, setDataMovieByActor] = useState();
  const [dataMovieByCategory, setDataMovieByCategory] = useState();
  const [dataMovieByStudio, setDataMovieByStudio] = useState();
  const [dataMovieByDirector, setDataMovieByDirector] = useState();

  const { data: actorByCountry, error: errorActorByCountry } = useActorByCountryData();
  const { data: directorByCountry, error: errorDirectorByCountry } = useDirectorByCountryData();
  const { data: studioByCountry, error: errorStudioByCountry } = useStudioByCountryData();
  const { data: movieByActor, error: errorMovieByActor } = useMovieByActorData();
  const { data: movieByCategory, error: errorMovieByCategory } = useMovieByCategoryData();
  const { data: movieByStudio, error: errorMovieByStudio } = useMovieByStudioData();
  const { data: movieByDirector, error: errorMovieByDirector } = useMovieByDirectorData();

  useEffect(() => {
    if (actorByCountry !== undefined) setDataActorByCountry(populateData(actorByCountry, 'actor'));
    if (directorByCountry !== undefined) setDataDirectorByCountry(populateData(directorByCountry, 'director'));
    if (studioByCountry !== undefined) setDataStudioByCountry(populateData(studioByCountry, 'studio'));
    if (movieByActor !== undefined) setDataMovieByActor(populateData(movieByActor, 'movie'));
    if (movieByCategory !== undefined) setDataMovieByCategory(populateData(movieByCategory, 'movie'));
    if (movieByStudio !== undefined) setDataMovieByStudio(populateData(movieByStudio, 'movie'));
    if (movieByDirector !== undefined) setDataMovieByDirector(populateData(movieByDirector, 'movie'));
  }, [
    actorByCountry,
    directorByCountry,
    studioByCountry,
    movieByActor,
    movieByCategory,
    movieByStudio,
    movieByDirector,
  ]);

  const [windowWidth, setWindowWidth] = useState();
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [windowWidth]);

  if (
    errorActorByCountry ||
    errorDirectorByCountry ||
    errorStudioByCountry ||
    errorMovieByActor ||
    errorMovieByCategory ||
    errorMovieByStudio ||
    errorMovieByDirector
  ) {
    return (
      <Layout title='Statistics'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Statistics - MyMovie'>
      <Titles>Statistics</Titles>

      <div className='mt-5'>
        {dataMovieByActor ? (
          <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-[#1F1F1F]'>
            <div className='bg-neutral-100/80 p-3 dark:bg-neutral-800'>
              <Text.medium className='!text-sm'>Total Movie by Actor</Text.medium>
            </div>
            <div className='p-3'>
              <Bar
                options={optionsHorizontalBarChart(theme, windowWidth)}
                data={dataMovieByActor}
                height={windowWidth > 500 ? 100 : 250}
              />
            </div>
          </div>
        ) : (
          <Shimer className='!h-96 w-full' />
        )}
      </div>

      <div className='mt-5'>
        {dataMovieByCategory ? (
          <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-[#1F1F1F]'>
            <div className='bg-neutral-100/80 p-3 dark:bg-neutral-800'>
              <Text.medium className='!text-sm'>Total Movie by Category</Text.medium>
            </div>
            <div className='p-3'>
              {/* <Bar
                options={optionsHorizontalBarChart(theme, windowWidth)}
                data={dataMovieByCategory}
                height={100}
              /> */}

              <Line
                options={optionsLineChart(theme)}
                data={dataMovieByCategory}
                height={windowWidth > 500 ? 100 : 250}
              />
            </div>
          </div>
        ) : (
          <Shimer className='!h-96 w-full' />
        )}
      </div>

      <div className='mt-5 grid grid-cols-1 gap-5 md:grid-cols-2'>
        {dataStudioByCountry ? (
          <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-[#1F1F1F]'>
            <div className='bg-neutral-100/80 p-3 dark:bg-neutral-800'>
              <Text.medium className='!text-sm'>Total Studio by Country</Text.medium>
            </div>
            <div className='m-auto w-72 py-3'>
              <Pie options={options} data={dataStudioByCountry} />
            </div>
          </div>
        ) : (
          <Shimer className='!h-[350px] w-full' />
        )}

        {dataDirectorByCountry ? (
          <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-[#1F1F1F]'>
            <div className='bg-neutral-100/80 p-3 dark:bg-neutral-800'>
              <Text.medium className='!text-sm'>Total Director by Country</Text.medium>
            </div>
            <div className='m-auto w-72 py-3'>
              <Doughnut options={options} data={dataDirectorByCountry} />
            </div>
          </div>
        ) : (
          <Shimer className='!h-[350px] w-full' />
        )}
      </div>

      <div className='mt-5'>
        {dataActorByCountry ? (
          <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-[#1F1F1F]'>
            <div className='bg-neutral-100/80 p-3 dark:bg-neutral-800'>
              <Text.medium className='!text-sm'>Total Actor by Country</Text.medium>
            </div>
            <div className='p-3'>
              <Bar options={optionsBarChart(theme)} data={dataActorByCountry} height={windowWidth > 500 ? 100 : 250} />
            </div>
          </div>
        ) : (
          <Shimer className='!h-96 w-full' />
        )}
      </div>

      <div className='mt-5'>
        {dataMovieByStudio ? (
          <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-[#1F1F1F]'>
            <div className='bg-neutral-100/80 p-3 dark:bg-neutral-800'>
              <Text.medium className='!text-sm'>Total Movie by Studio</Text.medium>
            </div>
            <div className='p-3'>
              <Bar
                options={optionsHorizontalBarChart(theme, windowWidth)}
                data={dataMovieByStudio}
                height={windowWidth > 500 ? 100 : 250}
              />
            </div>
          </div>
        ) : (
          <Shimer className='!h-96 w-full' />
        )}
      </div>

      <div className='mt-5'>
        {dataMovieByDirector ? (
          <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-[#1F1F1F]'>
            <div className='bg-neutral-100/80 p-3 dark:bg-neutral-800'>
              <Text.medium className='!text-sm'>Total Movie by Director</Text.medium>
            </div>
            <div className='p-3'>
              {/* <Bar
                options={optionsHorizontalBarChart(theme, windowWidth)}
                data={dataMovieByDirector}
                height={100}
              /> */}

              <Line
                options={optionsLineChart(theme)}
                data={dataMovieByDirector}
                height={windowWidth > 500 ? 100 : 250}
              />
            </div>
          </div>
        ) : (
          <Shimer className='!h-96 w-full' />
        )}
      </div>
    </Layout>
  );
}
