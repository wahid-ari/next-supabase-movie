import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router"
import useSWR, { mutate } from "swr";
import axios from "axios";
import useToast from "@utils/useToast";
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import LabeledInput from "@components/systems/LabeledInput";
import Button from "@components/systems/Button";
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/outline";
import Shimer from "@components/systems/Shimer";
import Label from "@components/systems/Label";
import nookies from "nookies";

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  if (!cookies.token) {
    return {
      redirect: {
        destination: "/login"
      }
    }
  }
  return {
    props: {}
  }
}

const fetcher = url => axios.get(url).then(res => res.data)

export default function AddSong() {
  const { data: artist, error: errorArtist } = useSWR(`${process.env.API_ROUTE}/api/artist`, fetcher)
  const { data: album, error: errorAlbum } = useSWR(`${process.env.API_ROUTE}/api/album`, fetcher)
  const { updateToast, pushToast, dismissToast } = useToast();
  const [createItem, setCreateItem] = useState({ name: "", cover_url: "", preview_url: "", youtube_url: "", artist_id: null, album_id: null })
  const [selectedArtist, setSelectedArtist] = useState()
  const [selectedAlbum, setSelectedAlbum] = useState()
  const [queryArtist, setQueryArtist] = useState('')
  const [queryAlbum, setQueryAlbum] = useState('')
  const router = useRouter()

  const filteredArtist =
    queryArtist === ''
      ? artist
      : artist.filter((item) =>
        item.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(queryArtist.toLowerCase().replace(/\s+/g, ''))
      )

  const filteredAlbum =
    queryAlbum === ''
      ? album
      : album.filter((item) =>
        item.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(queryAlbum.toLowerCase().replace(/\s+/g, ''))
      )

  async function handleCreate() {
    const toastId = pushToast({
      message: "Saving Song...",
      isLoading: true,
    });
    try {
      const res = await axios.post(`${process.env.API_ROUTE}/api/song`, createItem)
      if (res.status == 200) {
        setCreateItem({ name: "", cover_url: "", preview_url: "", youtube_url: "", artist_id: null, album_id: null })
        updateToast({ toastId, message: res.data.message, isError: false });
        router.push("/song")
      }
    } catch (error) {
      console.error(error)
      updateToast({ toastId, message: error.response.data.error, isError: true });
    } finally {
      mutate(`${process.env.API_ROUTE}/api/song`)
    }
  }

  useEffect(() => {
    if (selectedArtist) setCreateItem({ ...createItem, artist_id: selectedArtist.id })
  }, [selectedArtist])

  useEffect(() => {
    if (selectedAlbum) setCreateItem({ ...createItem, album_id: selectedAlbum.id })
  }, [selectedAlbum])

  if (errorAlbum || errorArtist) {
    return (
      <Layout title="Add Song - MyMovie">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title="Add Song - MyMovie">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-y-3">
        <Title>Add Song</Title>
      </div>

      <div className="max-w-lg shadow rounded">
        <LabeledInput label="Name" type="text" name="name"
          value={createItem.name}
          onChange={(e) =>
            setCreateItem({ ...createItem, name: e.target.value }
            )}
          placeholder="Song Name"
        />

        {filteredArtist ?
          <Combobox value={selectedArtist} onChange={setSelectedArtist}>
            <div className="relative mt-1 pb-1">
              <Label>Artist</Label>
              <div className="relative my-2 w-full cursor-default overflow-hidden rounded-md text-left border border-neutral-300 dark:border-neutral-600 text-sm">
                <Combobox.Input
                  className="w-full py-2 pl-3 pr-10 text-sm font-medium text-neutral-900 dark:text-white dark:bg-neutral-900 rounded-md border border-transparent focus:border-emerald-500"
                  displayValue={(artist) => artist?.name}
                  placeholder="Search Artist"
                  onChange={(e) => setQueryArtist(e.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQueryArtist('')}
              >
                <Combobox.Options className="absolute z-10 max-h-40 w-full overflow-auto rounded-md bg-white dark:bg-neutral-800 py-1 text-sm shadow-lg">
                  {filteredArtist.length === 0 && queryArtist !== '' ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700 dark:text-white">
                      Nothing found.
                    </div>
                  ) : (
                    filteredArtist.map((item) => (
                      <Combobox.Option
                        key={item.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-emerald-600 text-white' : 'text-gray-900 dark:text-white'
                          }`
                        }
                        value={item}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                }`}
                            >
                              {item.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                  }`}
                              >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
          :
          <Shimer className="h-8" />
        }

        {filteredAlbum ?
          <Combobox value={selectedAlbum} onChange={setSelectedAlbum}>
            <div className="relative mt-1 pb-3">
              <Label>Album (Optional)</Label>
              <div className="relative my-2 w-full cursor-default overflow-hidden rounded-md text-left border border-neutral-300 dark:border-neutral-600 text-sm">
                <Combobox.Input
                  className="w-full py-2 pl-3 pr-10 text-sm font-medium text-neutral-900 dark:text-white dark:bg-neutral-900 rounded-md border border-transparent focus:border-emerald-500"
                  displayValue={(album) => album?.name}
                  placeholder="Search Album"
                  onChange={(e) => setQueryAlbum(e.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQueryAlbum('')}
              >
                <Combobox.Options className="absolute z-10 max-h-40 w-full overflow-auto rounded-md bg-white dark:bg-neutral-800 py-1 text-sm shadow-lg">
                  {filteredAlbum.length === 0 && queryAlbum !== '' ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700 dark:text-white">
                      Nothing found.
                    </div>
                  ) : (
                    filteredAlbum.map((item) => (
                      <Combobox.Option
                        key={item.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-emerald-600 text-white' : 'text-gray-900 dark:text-white'
                          }`
                        }
                        value={item}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                }`}
                            >
                              {item.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                  }`}
                              >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
          :
          <Shimer className="h-8" />
        }

        <LabeledInput label="Cover URL (Optional)" type="text" name="cover"
          value={createItem.cover_url}
          onChange={(e) =>
            setCreateItem({ ...createItem, cover_url: e.target.value }
            )}
          placeholder="https://www.themoviedb.org/t/p/w220_and_h330_face/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg"
        />

        <LabeledInput label="Preview URL (Optional)" type="text" name="preview"
          value={createItem.preview_url}
          onChange={(e) =>
            setCreateItem({ ...createItem, preview_url: e.target.value }
            )}
          placeholder="https://p.scdn.co/mp3-preview/09474fc657c15038cb699afa4a52b4fac9383d62"
        />

        <LabeledInput label="Youtube URL (Optional)" type="text" name="youtube"
          value={createItem.youtube_url}
          onChange={(e) =>
            setCreateItem({ ...createItem, youtube_url: e.target.value }
            )}
          placeholder="1G4isv_Fylg"
        />

        <Button.success onClick={handleCreate} className="w-full">Save</Button.success>
      </div>

    </Layout>
  );
}