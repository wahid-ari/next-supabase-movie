import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import useSWR, { mutate } from "swr";
import axios from "axios";
import useToast from "@utils/useToast";
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import LabeledInput from "@components/systems/LabeledInput";
import Button from "@components/systems/Button";
import Shimer from "@components/systems/Shimer";
import Label from "@components/systems/Label";
import nookies from "nookies";
import SearchBox from "@components/systems/SearchBox";
import TextArea from "@components/systems/TextArea";
import Radio from "@components/systems/Radio";
import Select from 'react-select';

// export async function getServerSideProps(context) {
//   const cookies = nookies.get(context)
//   if (!cookies.token) {
//     return {
//       redirect: {
//         destination: "/login"
//       }
//     }
//   }
//   return {
//     props: {}
//   }
// }

const fetcher = url => axios.get(url).then(res => res.data)

export default function Movie() {
  const router = useRouter()
  const { data: category, error: errorCategory } = useSWR(`${process.env.API_ROUTE}/api/category`, fetcher)
  const { data: actor, error: errorActor } = useSWR(`${process.env.API_ROUTE}/api/actor`, fetcher)
  const { data: director, error: errorDirector } = useSWR(`${process.env.API_ROUTE}/api/director`, fetcher)
  const { data: studio, error: errorStudio } = useSWR(`${process.env.API_ROUTE}/api/studio`, fetcher)
  const { updateToast, pushToast, dismissToast } = useToast();
  const [createItem, setCreateItem] = useState({
    name: "",
    description: "",
    image_url: "",
    video_url: "",
    release_date: null,
    language: "English",
    status: 2,
    director_id: null,
    studio_id: null
  })
  const [selectedDirector, setSelectedDirector] = useState()
  const [queryDirector, setQueryDirector] = useState('')
  const filteredDirector =
    queryDirector === ''
      ? director
      : director.filter((item) =>
        item.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(queryDirector.toLowerCase().replace(/\s+/g, ''))
      )

  useEffect(() => {
    if (selectedDirector) setCreateItem({ ...createItem, director_id: selectedDirector.id })
  }, [selectedDirector])

  const [selectedStudio, setSelectedStudio] = useState()
  const [queryStudio, setQueryStudio] = useState('')
  const filteredStudio =
    queryStudio === ''
      ? studio
      : studio.filter((item) =>
        item.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(queryStudio.toLowerCase().replace(/\s+/g, ''))
      )

  useEffect(() => {
    if (selectedStudio) setCreateItem({ ...createItem, studio_id: selectedStudio.id })
  }, [selectedStudio])

  const [selectedCategory, setSelectedCategory] = useState()
  const [listOfCategories, setListOfCategories] = useState()
  useEffect(() => {
    if (category) {
      let listCategories = []
      category?.forEach(item => {
        listCategories.push({
          value: item.id,
          label: item.name
        })
      });
      setListOfCategories(listCategories)
    }
  }, [category])

  useEffect(() => {
    setCreateItem({ ...createItem, categories: selectedCategory })
  }, [selectedCategory])
  
  const [selectedActor, setSelectedActor] = useState()
  const [listOfActors, setListOfActors] = useState()
  useEffect(() => {
    if (actor) {
      let listActors = []
      actor?.forEach(item => {
        listActors.push({
          value: item.id,
          label: item.name
        })
      });
      setListOfActors(listActors)
    }
  }, [actor])

  useEffect(() => {
    setCreateItem({ ...createItem, actors: selectedActor })
  }, [selectedActor])

  async function handleCreate() {
    const toastId = pushToast({
      message: "Saving Movie...",
      isLoading: true,
    });
    try {
      const res = await axios.post(`${process.env.API_ROUTE}/api/movie`, createItem)
      if (res.status == 200) {
        setCreateItem({
          name: "",
          description: "",
          image_url: "",
          video_url: "",
          release_date: null,
          language: "English",
          status: 2,
          director_id: null,
          studio_id: null
        })
        updateToast({ toastId, message: res.data.message, isError: false });
        router.push("/movie")
      }
    } catch (error) {
      console.error(error)
      updateToast({ toastId, message: error.response.data.error, isError: true });
    } finally {
      mutate(`${process.env.API_ROUTE}/api/movie`)
    }
  }

  if (errorActor || errorCategory || errorDirector || errorStudio) {
    return (
      <Layout title="Add Movie - MyMovie">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title="Add Movie - MyMovie">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-y-3">
        <Title>Add Movie</Title>
      </div>

      <div className="max-w-lg shadow rounded">

        <LabeledInput label="Name" type="text" name="name"
          value={createItem.name}
          onChange={(e) =>
            setCreateItem({ ...createItem, name: e.target.value }
            )}
          placeholder="Movie Name"
        />

        <TextArea label="Description" type="text" name="description"
          value={createItem.description}
          onChange={(e) =>
            setCreateItem({ ...createItem, description: e.target.value }
            )}
          placeholder="Movie Description"
          height={5}
        />

        <LabeledInput label="Image URL" type="text" name="image"
          value={createItem.image_url}
          onChange={(e) =>
            setCreateItem({ ...createItem, image_url: e.target.value }
            )}
          placeholder="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/5BHuvQ6p9kfc091Z8RiFNhCwL4b.jpg"
        />

        <LabeledInput label="Video URL" type="text" name="video"
          value={createItem.video_url}
          onChange={(e) =>
            setCreateItem({ ...createItem, video_url: e.target.value }
            )}
          placeholder="https://youtu.be/qSqVVswa420"
        />

        <label htmlFor="actor" className="block text-sm text-neutral-800 dark:text-gray-200 mt-4 mb-2">
          Actors
        </label>
        {listOfActors ?
          <Select
            options={listOfActors}
            isMulti
            noOptionsMessage={() => "Not Found"}
            value={selectedActor}
            onChange={setSelectedActor}
            placeholder="Search or Select"
            name="category"
            className="rounded mb-4"
            classNamePrefix="react-select"
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: `#059669`,
                primary25: `#059669`,
                primary50: `#059669`,
                neutral40: `#EF4444`,
              },
            })}
          />
          :
          <Shimer className="h-8" />
        }

        <label htmlFor="category" className="block text-sm text-neutral-800 dark:text-gray-200 mt-4 mb-2">
          Categories
        </label>
        {listOfCategories ?
          <Select
            options={listOfCategories}
            isMulti
            noOptionsMessage={() => "Not Found"}
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder="Search or Select"
            name="category"
            className="rounded mb-4"
            classNamePrefix="react-select"
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: `#059669`,
                primary25: `#059669`,
                primary50: `#059669`,
                neutral40: `#EF4444`,
              },
            })}
          />
          :
          <Shimer className="h-8" />
        }

        {filteredDirector ?
          <SearchBox
            label="Director Name"
            value={selectedDirector}
            placeholder="Search or Select"
            onChange={setSelectedDirector}
            onChangeQuery={(e) => setQueryDirector(e.target.value)}
            afterLeave={() => setQueryDirector('')}
            filtered={filteredDirector}
            query={queryDirector}
          />
          :
          <Shimer className="h-8" />
        }

        {filteredStudio ?
          <SearchBox
            label="Studio Name"
            value={selectedStudio}
            placeholder="Search or Select"
            onChange={setSelectedStudio}
            onChangeQuery={(e) => setQueryStudio(e.target.value)}
            afterLeave={() => setQueryStudio('')}
            filtered={filteredStudio}
            query={queryStudio}
          />
          :
          <Shimer className="h-8" />
        }

        <LabeledInput label="Release Date" type="date" name="release"
          value={createItem.release_date}
          onChange={(e) =>
            setCreateItem({ ...createItem, release_date: e.target.value }
            )}
          placeholder="dd-mm-yyyy"
          min="1950-01-01"
          max="2050-12-31"
        />

        <LabeledInput label="Language" type="text" name="language"
          value={createItem.language}
          onChange={(e) =>
            setCreateItem({ ...createItem, language: e.target.value }
            )}
          placeholder="Movie Language"
        />

        <div className="mb-2">
          <Label htmlFor="status" className="mb-3">Status</Label>
          <div className="flex gap-4">
            <Radio value={1} checked={createItem.status == 1}
              name="status" label="Production" className="!mb-2"
              onChange={(e) => setCreateItem({ ...createItem, status: Number(e.target.value) })}
            />
            <Radio value={2} checked={createItem.status == 2}
              name="status" label="Released" className="!mb-2"
              onChange={(e) => setCreateItem({ ...createItem, status: Number(e.target.value) })}
            />
          </div>
        </div>

        <Button.success onClick={handleCreate} className="w-full">Save</Button.success>
      </div>

    </Layout>
  );
}