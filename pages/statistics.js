import { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import { useTheme } from 'next-themes';
import Layout from "@components/layout/Layout";
import Shimer from "@components/systems/Shimer";
import Text from "@components/systems/Text";
import Titles from "@components/systems/Title";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, ArcElement, Tooltip, Filler, Legend } from 'chart.js';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import { populateData, options, optionsLineChart, optionsBarChart, optionsHorizontalBarChart } from '@utils/chartSetup'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, ArcElement, Tooltip, Filler, Legend);

const fetcher = url => axios.get(url).then(res => res.data)

export default function Home() {
  const { theme } = useTheme()
  const { data: actorByCountry, error: errorActorByCountry } = useSWR(`${process.env.API_ROUTE}/api/statistics/actor-by-country`, fetcher)
  const { data: directorByCountry, error: errorDirectorByCountry } = useSWR(`${process.env.API_ROUTE}/api/statistics/director-by-country`, fetcher)
  const { data: studioByCountry, error: errorStudioByCountry } = useSWR(`${process.env.API_ROUTE}/api/statistics/studio-by-country`, fetcher)
  const { data: movieByActor, error: errorMovieByActor } = useSWR(`${process.env.API_ROUTE}/api/statistics/movie-by-actor`, fetcher)
  const { data: movieByCategory, error: errorMovieByCategory } = useSWR(`${process.env.API_ROUTE}/api/statistics/movie-by-category`, fetcher)
  const { data: movieByStudio, error: errorMovieByStudio } = useSWR(`${process.env.API_ROUTE}/api/statistics/movie-by-studio`, fetcher)
  const { data: movieByDirector, error: errorMovieByDirector } = useSWR(`${process.env.API_ROUTE}/api/statistics/movie-by-director`, fetcher)

  const [dataActorByCountry, setDataActorByCountry] = useState()
  const [dataDirectorByCountry, setDataDirectorByCountry] = useState()
  const [dataStudioByCountry, setDataStudioByCountry] = useState()
  const [dataMovieByActor, setDataMovieByActor] = useState()
  const [dataMovieByCategory, setDataMovieByCategory] = useState()
  const [dataMovieByStudio, setDataMovieByStudio] = useState()
  const [dataMovieByDirector, setDataMovieByDirector] = useState()

  const [windowWidth, setWindowWidth] = useState()
  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [windowWidth])

  useEffect(() => {
    if (actorByCountry !== undefined) setDataActorByCountry(populateData(actorByCountry, "actor"))
    if (directorByCountry !== undefined) setDataDirectorByCountry(populateData(directorByCountry, "director"))
    if (studioByCountry !== undefined) setDataStudioByCountry(populateData(studioByCountry, "studio"))
    if (movieByActor !== undefined) setDataMovieByActor(populateData(movieByActor, "movie"))
    if (movieByCategory !== undefined) setDataMovieByCategory(populateData(movieByCategory, "movie"))
    if (movieByStudio !== undefined) setDataMovieByStudio(populateData(movieByStudio, "movie"))
    if (movieByDirector !== undefined) setDataMovieByDirector(populateData(movieByDirector, "movie"))
  }, [actorByCountry, directorByCountry, studioByCountry, movieByActor, movieByCategory, movieByStudio, movieByDirector])

  if (errorActorByCountry || errorDirectorByCountry || errorStudioByCountry || errorMovieByActor || errorMovieByCategory || errorMovieByStudio || errorMovieByDirector) {
    return (
      <Layout title="Statistics">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title="Statistics - MyMovie">
      <Titles>Statistics</Titles>

      <div className="mt-5">
        {dataMovieByActor ?
          <div className="rounded-md border dark:border-neutral-800 bg-white dark:bg-[#1F1F1F]">
            <div className="p-3 bg-neutral-100/80 dark:bg-neutral-800">
              <Text.medium className="!text-sm">Total Movie by Actor</Text.medium>
            </div>
            <div className="p-3">
              <Bar
                options={optionsHorizontalBarChart(theme, windowWidth)}
                data={dataMovieByActor}
                height={windowWidth > 500 ? 100 : 250}
              />
            </div>
          </div>
          :
          <Shimer className="w-full !h-96" />
        }
      </div>

      <div className="mt-5">
        {dataMovieByCategory ?
          <div className="rounded-md border dark:border-neutral-800 bg-white dark:bg-[#1F1F1F]">
            <div className="p-3 bg-neutral-100/80 dark:bg-neutral-800">
              <Text.medium className="!text-sm">Total Movie by Category</Text.medium>
            </div>
            <div className="p-3">
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
          :
          <Shimer className="w-full !h-96" />
        }
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        {dataStudioByCountry ?
          <div className="rounded-md border dark:border-neutral-800 bg-white dark:bg-[#1F1F1F]">
            <div className="p-3 bg-neutral-100/80 dark:bg-neutral-800">
              <Text.medium className="!text-sm">Total Studio by Country</Text.medium>
            </div>
            <div className="py-3 m-auto w-72">
              <Pie
                options={options}
                data={dataStudioByCountry}
              />
            </div>
          </div>
          :
          <Shimer className="w-full !h-[350px]" />
        }

        {dataDirectorByCountry ?
          <div className="rounded-md border dark:border-neutral-800 bg-white dark:bg-[#1F1F1F]">
            <div className="p-3 bg-neutral-100/80 dark:bg-neutral-800">
              <Text.medium className="!text-sm">Total Director by Country</Text.medium>
            </div>
            <div className="py-3 m-auto w-72">
              <Doughnut
                options={options}
                data={dataDirectorByCountry}
              />
            </div>
          </div>
          :
          <Shimer className="w-full !h-[350px]" />
        }
      </div>

      <div className="mt-5">
        {dataActorByCountry ?
          <div className="rounded-md border dark:border-neutral-800 bg-white dark:bg-[#1F1F1F]">
            <div className="p-3 bg-neutral-100/80 dark:bg-neutral-800">
              <Text.medium className="!text-sm">Total Actor by Country</Text.medium>
            </div>
            <div className="p-3">
              <Bar
                options={optionsBarChart(theme)}
                data={dataActorByCountry}
                height={windowWidth > 500 ? 100 : 250}
              />
            </div>
          </div>
          :
          <Shimer className="w-full !h-96" />
        }
      </div>
      
      <div className="mt-5">
        {dataMovieByStudio ?
          <div className="rounded-md border dark:border-neutral-800 bg-white dark:bg-[#1F1F1F]">
            <div className="p-3 bg-neutral-100/80 dark:bg-neutral-800">
              <Text.medium className="!text-sm">Total Movie by Studio</Text.medium>
            </div>
            <div className="p-3">
              <Bar
                options={optionsHorizontalBarChart(theme, windowWidth)}
                data={dataMovieByStudio}
                height={windowWidth > 500 ? 100 : 250}
              />
            </div>
          </div>
          :
          <Shimer className="w-full !h-96" />
        }
      </div>

      <div className="mt-5">
        {dataMovieByDirector ?
          <div className="rounded-md border dark:border-neutral-800 bg-white dark:bg-[#1F1F1F]">
            <div className="p-3 bg-neutral-100/80 dark:bg-neutral-800">
              <Text.medium className="!text-sm">Total Movie by Director</Text.medium>
            </div>
            <div className="p-3">
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
          :
          <Shimer className="w-full !h-96" />
        }
      </div>
    </Layout>
  );
}