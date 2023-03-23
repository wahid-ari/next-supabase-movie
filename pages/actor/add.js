import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { mutate } from 'swr';
import { useCountryData } from '@libs/swr';
import axios from 'axios';
import useToast from '@utils/useToast';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import LabeledInput from '@components/systems/LabeledInput';
import Button from '@components/systems/Button';
import Shimer from '@components/systems/Shimer';
import Label from '@components/systems/Label';
import nookies from 'nookies';
import SearchBox from '@components/systems/SearchBox';
import TextArea from '@components/systems/TextArea';
import Radio from '@components/systems/Radio';

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

export default function Actor() {
  const { data: country, error: errorCountry } = useCountryData();
  const { updateToast, pushToast, dismissToast } = useToast();
  const [createItem, setCreateItem] = useState({
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
          item.name.toLowerCase().replace(/\s+/g, '').includes(queryCountry.toLowerCase().replace(/\s+/g, ''))
        );

  useEffect(() => {
    if (selectedCountry) setCreateItem({ ...createItem, country_id: selectedCountry.id });
  }, [selectedCountry]);

  async function handleCreate() {
    const toastId = pushToast({
      message: 'Saving Actor...',
      isLoading: true,
    });
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/actor`, createItem);
      if (res.status == 200) {
        setCreateItem({
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
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/actor`);
    }
  }

  if (errorCountry) {
    return (
      <Layout title='Add Actor - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Add Actor - MyMovie'>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Add Actor</Title>
      </div>

      <div className='max-w-lg rounded shadow'>
        <LabeledInput
          label='Name'
          type='text'
          name='name'
          value={createItem.name}
          onChange={(e) => setCreateItem({ ...createItem, name: e.target.value })}
          placeholder='Actor Name'
        />

        <LabeledInput
          label='Image URL (Optional)'
          type='text'
          name='image'
          value={createItem.image_url}
          onChange={(e) => setCreateItem({ ...createItem, image_url: e.target.value })}
          placeholder='https://www.themoviedb.org/t/p/w220_and_h330_face/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg'
        />

        <div className='mb-2'>
          <Label htmlFor='gender' className='mb-3'>
            Gender
          </Label>
          <div className='flex gap-4'>
            <Radio
              value={1}
              checked={createItem.gender == 1}
              name='gender'
              label='Male'
              className='!mb-2'
              onChange={(e) => setCreateItem({ ...createItem, gender: Number(e.target.value) })}
            />
            <Radio
              value={2}
              checked={createItem.gender == 2}
              name='gender'
              label='Female'
              className='!mb-2'
              onChange={(e) => setCreateItem({ ...createItem, gender: Number(e.target.value) })}
            />
          </div>
        </div>

        <TextArea
          label='Biography (Optional)'
          type='text'
          name='biography'
          value={createItem.biography}
          onChange={(e) => setCreateItem({ ...createItem, biography: e.target.value })}
          placeholder='Actor Biography'
        />

        <LabeledInput
          label='Birthday (Optional)'
          type='date'
          name='birthday'
          value={createItem.birthday}
          onChange={(e) => setCreateItem({ ...createItem, birthday: e.target.value })}
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
          value={createItem.instagram_url}
          onChange={(e) => setCreateItem({ ...createItem, instagram_url: e.target.value })}
          placeholder='https://www.instagram.com/tomcruise'
        />

        <LabeledInput
          label='Twitter URL (Optional)'
          type='text'
          name='twitter'
          value={createItem.twitter_url}
          onChange={(e) => setCreateItem({ ...createItem, twitter_url: e.target.value })}
          placeholder='https://twitter.com/TomCruise'
        />

        <Button.success onClick={handleCreate} className='w-full'>
          Save
        </Button.success>
      </div>
    </Layout>
  );
}
