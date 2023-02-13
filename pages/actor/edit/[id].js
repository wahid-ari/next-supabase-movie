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

export default function Actor({ id }) {
  const { data, error } = useSWR(
    `${process.env.API_ROUTE}/api/actor?id=${id}`,
    fetcher
  );
  const { data: country, error: errorCountry } = useSWR(
    `${process.env.API_ROUTE}/api/country`,
    fetcher
  );
  const { updateToast, pushToast, dismissToast } = useToast();
  const [editItem, setEditItem] = useState({
    name: '',
    image_url: '',
    gender: 1,
    biography: '',
    birthday: null,
    instagram_url: '',
    twitter_url: '',
    country_id: null,
  });
  const [selectedCountry, setSelectedCountry] = useState();
  const [queryCountry, setQueryCountry] = useState('');
  const router = useRouter();

  const filteredCountry =
    queryCountry === ''
      ? country
      : country.filter((item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(queryCountry.toLowerCase().replace(/\s+/g, ''))
        );

  useEffect(() => {
    if (selectedCountry)
      setEditItem({ ...editItem, country_id: selectedCountry.id });
  }, [selectedCountry]);

  useEffect(() => {
    if (data) {
      setEditItem({
        name: data.name,
        image_url: data.image_url,
        gender: data.gender,
        biography: data.biography,
        birthday: data.birthday,
        instagram_url: data.instagram_url,
        twitter_url: data.twitter_url,
        country_id: data.countries?.id,
      });
      setSelectedCountry({
        id: data.countries?.id,
        name: data.countries?.name,
      });
    }
  }, [data]);

  async function handleEdit() {
    const toastId = pushToast({
      message: 'Saving Actor...',
      isLoading: true,
    });
    try {
      const res = await axios.put(
        `${process.env.API_ROUTE}/api/actor?id=${id}`,
        editItem
      );
      if (res.status == 201) {
        setEditItem({
          name: '',
          image_url: '',
          gender: 1,
          biography: '',
          birthday: null,
          instagram_url: '',
          twitter_url: '',
          country_id: null,
        });
        updateToast({ toastId, message: res.data.message, isError: false });
        router.push('/actor');
      }
    } catch (error) {
      console.error(error);
      updateToast({
        toastId,
        message: error.response.data.error,
        isError: true,
      });
    } finally {
      mutate(`${process.env.API_ROUTE}/api/actor`);
    }
  }

  if (error || errorCountry) {
    return (
      <Layout title='Edit Actor - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>
          Failed to load
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`Edit ${
        data ? data?.name + ' - MyMovie' : 'Edit Actor - MyMovie'
      }`}
    >
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        {data ? <Title>Edit {data?.name}</Title> : <Title>Edit Actor</Title>}
      </div>

      {data ? (
        <div className='max-w-lg rounded'>
          <LabeledInput
            label='Name'
            type='text'
            name='name'
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
            placeholder='Actor Name'
          />

          <LabeledInput
            label='Image URL (Optional)'
            type='text'
            name='image'
            value={editItem.image_url}
            onChange={(e) =>
              setEditItem({ ...editItem, image_url: e.target.value })
            }
            placeholder='https://www.themoviedb.org/t/p/w220_and_h330_face/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg'
          />

          <div className='mb-2'>
            <Label htmlFor='gender' className='mb-3'>
              Gender
            </Label>
            <div className='flex gap-4'>
              <Radio
                value={1}
                checked={editItem.gender == 1}
                name='gender'
                label='Male'
                className='!mb-2'
                onChange={(e) =>
                  setEditItem({ ...editItem, gender: Number(e.target.value) })
                }
              />
              <Radio
                value={2}
                checked={editItem.gender == 2}
                name='gender'
                label='Female'
                className='!mb-2'
                onChange={(e) =>
                  setEditItem({ ...editItem, gender: Number(e.target.value) })
                }
              />
            </div>
          </div>

          <TextArea
            label='Biography (Optional)'
            type='text'
            name='biography'
            value={editItem.biography}
            onChange={(e) =>
              setEditItem({ ...editItem, biography: e.target.value })
            }
            placeholder='Director Biography'
          />

          <LabeledInput
            label='Birthday (Optional)'
            type='date'
            name='birthday'
            value={editItem.birthday}
            onChange={(e) =>
              setEditItem({ ...editItem, birthday: e.target.value })
            }
            placeholder='dd-mm-yyyy'
            min='1950-01-01'
            max='2022-12-31'
          />

          {filteredCountry ? (
            <SearchBox
              label='Country Name (Optional)'
              value={selectedCountry}
              placeholder='Search or Select'
              onChange={setSelectedCountry}
              onChangeQuery={(e) => setQueryCountry(e.target.value)}
              afterLeave={() => setQueryCountry('')}
              filtered={filteredCountry}
              query={queryCountry}
            />
          ) : (
            <Shimer className='h-8' />
          )}

          <LabeledInput
            label='Instagram URL (Optional)'
            type='text'
            name='instagram'
            value={editItem.instagram_url}
            onChange={(e) =>
              setEditItem({ ...editItem, instagram_url: e.target.value })
            }
            placeholder='https://www.instagram.com/tomcruise'
          />

          <LabeledInput
            label='Twitter URL (Optional)'
            type='text'
            name='twitter'
            value={editItem.twitter_url}
            onChange={(e) =>
              setEditItem({ ...editItem, twitter_url: e.target.value })
            }
            placeholder='https://twitter.com/TomCruise'
          />

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
