import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import useToast from '@utils/useToast';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import LabeledInput from '@components/systems/LabeledInput';
import Label from '@components/systems/Label';
import Button from '@components/systems/Button';
import nookies from 'nookies';
import Radio from '@components/systems/Radio';
import TextArea from '@components/systems/TextArea';
import SearchBox from '@components/systems/SearchBox';
import Select from 'react-select';

export async function getServerSideProps(context) {
  const { id } = context.params;
  const cookies = nookies.get(context);
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

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Movie({ id }) {
  const router = useRouter();
  const { data, error } = useSWR(`${process.env.API_ROUTE}/api/movie?id=${id}`, fetcher);
  const { data: category, error: errorCategory } = useSWR(`${process.env.API_ROUTE}/api/category`, fetcher);
  const { data: actor, error: errorActor } = useSWR(`${process.env.API_ROUTE}/api/actor`, fetcher);
  const { data: director, error: errorDirector } = useSWR(`${process.env.API_ROUTE}/api/director`, fetcher);
  const { data: studio, error: errorStudio } = useSWR(`${process.env.API_ROUTE}/api/studio`, fetcher);
  const { updateToast, pushToast, dismissToast } = useToast();
  const [editItem, setEditItem] = useState({
    name: '',
    description: '',
    image_url: '',
    video_url: '',
    release_date: null,
    language: '',
    status: 1,
    director_id: null,
    studio_id: null,
  });

  useEffect(() => {
    if (data) {
      setEditItem({
        name: data.name,
        description: data.description,
        image_url: data.image_url,
        video_url: data.video_url,
        release_date: data.release_date,
        language: data.language,
        status: data.status,
        director_id: data.directors?.id,
        studio_id: data.studios?.id,
      });
      setSelectedDirector({
        id: data.directors?.id,
        name: data.directors?.name,
      });
      setSelectedStudio({ id: data.studios?.id, name: data.studios?.name });
    }
  }, [data]);

  const [selectedDirector, setSelectedDirector] = useState();
  const [queryDirector, setQueryDirector] = useState('');
  const filteredDirector =
    queryDirector === ''
      ? director
      : director.filter((item) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(queryDirector.toLowerCase().replace(/\s+/g, ''))
        );

  useEffect(() => {
    if (selectedDirector) setEditItem({ ...editItem, director_id: selectedDirector.id });
  }, [selectedDirector]);

  const [selectedStudio, setSelectedStudio] = useState();
  const [queryStudio, setQueryStudio] = useState('');
  const filteredStudio =
    queryStudio === ''
      ? studio
      : studio.filter((item) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(queryStudio.toLowerCase().replace(/\s+/g, ''))
        );

  useEffect(() => {
    if (selectedStudio) setEditItem({ ...editItem, studio_id: selectedStudio.id });
  }, [selectedStudio]);

  const [selectedCategory, setSelectedCategory] = useState();
  const [listOfCategories, setListOfCategories] = useState();
  useEffect(() => {
    // list of all categories
    if (category) {
      let listCategories = [];
      category?.forEach((item) => {
        listCategories.push({
          value: item.id,
          label: item.name,
        });
      });
      setListOfCategories(listCategories);
    }
    // list current movie categories
    if (data && category) {
      let movieCurrentCategories = [];
      for (const movieCategory of data?.movie_categories) {
        for (const item of category) {
          if (item.id == movieCategory.category_id) {
            movieCurrentCategories.push({
              value: item.id,
              label: item.name,
            });
          }
        }
      }
      setSelectedCategory(movieCurrentCategories);
    }
  }, [category, data]);

  const [selectedActor, setSelectedActor] = useState();
  const [listOfActors, setListOfActors] = useState();
  useEffect(() => {
    // list of all actors
    if (actor) {
      let listActors = [];
      actor?.forEach((item) => {
        listActors.push({
          value: item.id,
          label: item.name,
        });
      });
      setListOfActors(listActors);
    }
    // list current movie actors
    if (data && actor) {
      let movieCurrentActors = [];
      for (const movieActor of data?.movie_actors) {
        for (const item of actor) {
          if (item.id == movieActor.actor_id) {
            movieCurrentActors.push({
              value: item.id,
              label: item.name,
            });
          }
        }
      }
      setSelectedActor(movieCurrentActors);
    }
  }, [actor, data]);

  useEffect(() => {
    if (selectedActor || selectedCategory) {
      setEditItem({
        ...editItem,
        actors: selectedActor,
        categories: selectedCategory,
      });
    }
  }, [selectedActor, selectedCategory]);

  async function handleEdit() {
    const toastId = pushToast({
      message: 'Saving Movie...',
      isLoading: true,
    });
    try {
      const res = await axios.put(`${process.env.API_ROUTE}/api/movie?id=${id}`, editItem);
      if (res.status == 201) {
        setEditItem({
          name: '',
          description: '',
          image_url: '',
          video_url: '',
          release_date: null,
          language: '',
          status: 1,
          director_id: null,
          studio_id: null,
        });
        updateToast({ toastId, message: res.data.message, isError: false });
        router.push('/movie');
      }
    } catch (error) {
      console.error(error);
      updateToast({
        toastId,
        message: error.response?.data.error,
        isError: true,
      });
    } finally {
      mutate(`${process.env.API_ROUTE}/api/movie`);
    }
  }

  if (error || errorCategory || errorActor || errorDirector || errorStudio) {
    return (
      <Layout title='Edit Movie - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title={`Edit ${data ? data?.name + ' - MyMovie' : 'Edit Movie - MyMovie'}`}>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        {data ? <Title>Edit {data?.name}</Title> : <Title>Edit Movie</Title>}
      </div>

      {data ? (
        <div className='max-w-lg rounded'>
          <LabeledInput
            label='Name'
            type='text'
            name='name'
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
            placeholder='Movie Name'
          />

          <TextArea
            label='Description'
            type='text'
            name='description'
            value={editItem.description}
            onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
            placeholder='Movie Description'
            height={5}
          />

          <LabeledInput
            label='Image URL'
            type='text'
            name='image'
            value={editItem.image_url}
            onChange={(e) => setEditItem({ ...editItem, image_url: e.target.value })}
            placeholder='https://www.themoviedb.org/t/p/w220_and_h330_face/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg'
          />

          <LabeledInput
            label='Video URL'
            type='text'
            name='video'
            value={editItem.video_url}
            onChange={(e) => setEditItem({ ...editItem, video_url: e.target.value })}
            placeholder='https://youtu.be/qSqVVswa420'
          />

          <label htmlFor='actor' className='mt-4 mb-2 block text-sm text-neutral-800 dark:text-gray-200'>
            Actors
          </label>
          {listOfActors && selectedActor ? (
            <Select
              options={listOfActors}
              isMulti
              noOptionsMessage={() => 'Not Found'}
              value={selectedActor}
              onChange={setSelectedActor}
              placeholder='Search or Select'
              name='actor'
              className='mb-4 rounded'
              classNamePrefix='react-select'
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
          ) : (
            <Shimer className='h-8' />
          )}

          <label htmlFor='category' className='mt-4 mb-2 block text-sm text-neutral-800 dark:text-gray-200'>
            Categories
          </label>
          {listOfCategories && selectedCategory ? (
            <Select
              options={listOfCategories}
              isMulti
              noOptionsMessage={() => 'Not Found'}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder='Search or Select'
              name='category'
              className='mb-4 rounded'
              classNamePrefix='react-select'
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
          ) : (
            <Shimer className='h-8' />
          )}

          {filteredDirector ? (
            <SearchBox
              label='Director Name'
              value={selectedDirector}
              placeholder='Search or Select'
              onChange={setSelectedDirector}
              onChangeQuery={(e) => setQueryDirector(e.target.value)}
              afterLeave={() => setQueryDirector('')}
              filtered={filteredDirector}
              query={queryDirector}
            />
          ) : (
            <Shimer className='h-8' />
          )}

          {filteredStudio ? (
            <SearchBox
              label='Studio Name'
              value={selectedStudio}
              placeholder='Search or Select'
              onChange={setSelectedStudio}
              onChangeQuery={(e) => setQueryStudio(e.target.value)}
              afterLeave={() => setQueryStudio('')}
              filtered={filteredStudio}
              query={queryStudio}
            />
          ) : (
            <Shimer className='h-8' />
          )}

          <LabeledInput
            label='Release Date'
            type='date'
            name='release'
            value={editItem.release_date}
            onChange={(e) => setEditItem({ ...editItem, release_date: e.target.value })}
            placeholder='dd-mm-yyyy'
            min='1950-01-01'
            max='2050-12-31'
          />

          <LabeledInput
            label='Language'
            type='text'
            name='language'
            value={editItem.language}
            onChange={(e) => setEditItem({ ...editItem, language: e.target.value })}
            placeholder='Movie Language'
          />

          <div className='mb-2'>
            <Label htmlFor='status' className='mb-3'>
              Status
            </Label>
            <div className='flex gap-4'>
              <Radio
                value={1}
                checked={editItem.status == 1}
                name='status'
                label='Production'
                className='!mb-2'
                onChange={(e) => setEditItem({ ...editItem, status: Number(e.target.value) })}
              />
              <Radio
                value={2}
                checked={editItem.status == 2}
                name='status'
                label='Released'
                className='!mb-2'
                onChange={(e) => setEditItem({ ...editItem, status: Number(e.target.value) })}
              />
            </div>
          </div>

          <Button onClick={handleEdit} className='w-full'>
            Update
          </Button>
        </div>
      ) : (
        <Shimer className='!h-60' />
      )}
    </Layout>
  );
}
