import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import useSWR, { mutate } from "swr";
import axios from "axios";
import useToast from "@utils/useToast";
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";
import LabeledInput from "@components/systems/LabeledInput";
import Label from "@components/systems/Label";
import Button from "@components/systems/Button";
import nookies from "nookies";
import Radio from "@components/systems/Radio";
import TextArea from "@components/systems/TextArea";
import SearchBox from "@components/systems/SearchBox";
import Select from 'react-select';

export async function getServerSideProps(context) {
  const { id } = context.params
  const cookies = nookies.get(context)
  // if (!cookies.token) {
  //   return {
  //     redirect: {
  //       destination: "/login"
  //     }
  //   }
  // }
  return {
    props: {
      id: id
    }, // will be passed to the page component as props
  }
}

const fetcher = url => axios.get(url).then(res => res.data)

export default function Movie({ id }) {
  const router = useRouter()
  const { data, error } = useSWR(`${process.env.API_ROUTE}/api/movie?id=${id}`, fetcher)
  const { data: category, error: errorCategory } = useSWR(`${process.env.API_ROUTE}/api/category`, fetcher)
  const { data: director, error: errorDirector } = useSWR(`${process.env.API_ROUTE}/api/director`, fetcher)
  const { data: studio, error: errorStudio } = useSWR(`${process.env.API_ROUTE}/api/studio`, fetcher)
  const { updateToast, pushToast, dismissToast } = useToast();
  const [editItem, setEditItem] = useState({
    name: "",
    description: "",
    image_url: "",
    video_url: "",
    release_date: null,
    language: "",
    status: 1,
    director_id: null,
    studio_id: null
  })

  useEffect(() => {
    if (data) {
      setEditItem({
        name: data[0].name,
        description: data[0].description,
        image_url: data[0].image_url,
        video_url: data[0].video_url,
        release_date: data[0].release_date,
        language: data[0].language,
        status: data[0].status,
        director_id: data[0].directors?.id,
        studio_id: data[0].studios?.id
      })
      setSelectedDirector({ id: data[0].directors?.id, name: data[0].directors?.name })
      setSelectedStudio({ id: data[0].studios?.id, name: data[0].studios?.name })
    }
  }, [data])

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
    if (selectedDirector) setEditItem({ ...editItem, director_id: selectedDirector.id })
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
    if (selectedStudio) setEditItem({ ...editItem, studio_id: selectedStudio.id })
  }, [selectedStudio])

  const [selectedCategory, setSelectedCategory] = useState()
  const [listOfCategories, setListOfCategories] = useState()
  useEffect(() => {
    // list of all categories
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
    // list current movie categories 
    if (data && category) {
      let movieCurrentCategories = []
      for (const movieCategory of data[0]?.movie_categories) {
        for (const item of category) {
          if (item.id == movieCategory.category_id) {
            movieCurrentCategories.push({
              value: item.id,
              label: item.name,
            })
          }
        }
      }
      setSelectedCategory(movieCurrentCategories)
    }
  }, [category, data])

  useEffect(() => {
    if (selectedCategory) setEditItem({ ...editItem, categories: selectedCategory })
  }, [selectedCategory])

  async function handleEdit() {
    const toastId = pushToast({
      message: "Saving Movie...",
      isLoading: true,
    });
    try {
      const res = await axios.put(`${process.env.API_ROUTE}/api/movie?id=${id}`, editItem)
      if (res.status == 201) {
        setEditItem({
          name: "",
          description: "",
          image_url: "",
          video_url: "",
          release_date: null,
          language: "",
          status: 1,
          director_id: null,
          studio_id: null
        })
        updateToast({ toastId, message: res.data.message, isError: false });
        router.push("/movie")
      }
    } catch (error) {
      console.error(error)
      updateToast({ toastId, message: error.response?.data.error, isError: true });
    } finally {
      mutate(`${process.env.API_ROUTE}/api/movie`)
    }
  }

  if (error || errorCategory || errorDirector || errorStudio) {
    return (
      <Layout title="Edit Movie - MyMovie">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title={`Edit ${data ? data[0]?.name + " - MyMovie" : 'Edit Movie - MyMovie'}`}>
      <div className="flex flex-wrap justify-between items-center mb-6 gap-y-3">
        {data ?
          <Title>Edit {data[0]?.name}</Title>
          :
          <Title>Edit Movie</Title>
        }
      </div>

      {data ?
        <div className="max-w-lg rounded">

          <label htmlFor="category" className="block text-sm text-neutral-800 dark:text-gray-200 mt-4 mb-2">
            Category
          </label>
          {listOfCategories && selectedCategory ?
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

          <LabeledInput label="Name" type="text" name="name"
            value={editItem.name}
            onChange={(e) =>
              setEditItem({ ...editItem, name: e.target.value }
              )}
            placeholder="Movie Name"
          />

          <TextArea label="Description (Optional)" type="text" name="description"
            value={editItem.description}
            onChange={(e) =>
              setEditItem({ ...editItem, description: e.target.value }
              )}
            placeholder="Movie Description"
          />

          <LabeledInput label="Image URL (Optional)" type="text" name="image"
            value={editItem.image_url}
            onChange={(e) =>
              setEditItem({ ...editItem, image_url: e.target.value }
              )}
            placeholder="https://www.themoviedb.org/t/p/w220_and_h330_face/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg"
          />

          <LabeledInput label="Video URL (Optional)" type="text" name="video"
            value={editItem.video_url}
            onChange={(e) =>
              setEditItem({ ...editItem, video_url: e.target.value }
              )}
            placeholder="https://www.youtube.com/watch?v=2m1drlOZSDw"
          />

          {filteredDirector ?
            <SearchBox
              label="Director Name (Optional)"
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
              label="Studio Name (Optional)"
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

          <LabeledInput label="Release Date (Optional)" type="date" name="release"
            value={editItem.release_date}
            onChange={(e) =>
              setEditItem({ ...editItem, release_date: e.target.value }
              )}
            placeholder="dd-mm-yyyy"
            min="1950-01-01"
            max="2050-12-31"
          />

          <LabeledInput label="Language (Optional)" type="text" name="language"
            value={editItem.language}
            onChange={(e) =>
              setEditItem({ ...editItem, language: e.target.value }
              )}
            placeholder="Movie Language"
          />

          <div className="mb-2">
            <Label htmlFor="status" className="mb-3">Status</Label>
            <div className="flex gap-4">
              <Radio value={1} checked={editItem.status == 1}
                name="status" label="Production" className="!mb-2"
                onChange={(e) => setEditItem({ ...editItem, status: Number(e.target.value) })}
              />
              <Radio value={2} checked={editItem.status == 2}
                name="status" label="Released" className="!mb-2"
                onChange={(e) => setEditItem({ ...editItem, status: Number(e.target.value) })}
              />
            </div>
          </div>

          <Button onClick={handleEdit} className="w-full">Update</Button>
        </div>
        :
        <Shimer className="!h-60" />
      }

    </Layout>
  );
}

