import { useState, useEffect } from 'react';
import Link from 'next/link';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import useToast from '@utils/useToast';
import { PhotographIcon, PlusSmIcon } from '@heroicons/react/outline';
import Layout from '@components/layout/Layout';
import TableSimple from '@components/systems/TableSimple';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import Dialog from '@components/systems/Dialog';
import Button from '@components/systems/Button';
import LabeledInput from '@components/systems/LabeledInput';
import nookies from 'nookies';
import SearchBox from '@components/systems/SearchBox';
import Image from 'next/image';

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

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Studio() {
  const { data, error } = useSWR(
    `${process.env.API_ROUTE}/api/studio`,
    fetcher
  );
  const { data: country, error: errorCountry } = useSWR(
    `${process.env.API_ROUTE}/api/country`,
    fetcher
  );
  const { updateToast, pushToast, dismissToast } = useToast();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [createItem, setCreateItem] = useState({
    name: '',
    image_url: '',
    city: '',
    country_id: null,
  });
  const [editItem, setEditItem] = useState({
    name: '',
    image_url: '',
    city: '',
    country_id: null,
  });
  const [deleteItem, setDeleteItem] = useState({
    name: '',
    image_url: '',
    city: '',
    country_id: null,
  });
  const [selectedCountry, setSelectedCountry] = useState();
  const [queryCountry, setQueryCountry] = useState('');
  const [selectedCountryEdit, setSelectedCountryEdit] = useState();
  const [queryCountryEdit, setQueryCountryEdit] = useState('');
  const [query, setQuery] = useState('');

  const filtered =
    query === ''
      ? data
      : data.filter((item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  const filteredCountry =
    queryCountry === ''
      ? country
      : country.filter((item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(queryCountry.toLowerCase().replace(/\s+/g, ''))
        );

  const filteredCountryEdit =
    queryCountryEdit === ''
      ? country
      : country.filter((item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(queryCountryEdit.toLowerCase().replace(/\s+/g, ''))
        );

  useEffect(() => {
    if (selectedCountry)
      setCreateItem({ ...createItem, country_id: selectedCountry.id });
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountryEdit)
      setEditItem({ ...editItem, country_id: selectedCountryEdit.id });
  }, [selectedCountryEdit]);

  async function handleCreate() {
    const toastId = pushToast({
      message: 'Saving Studio...',
      isLoading: true,
    });
    try {
      const res = await axios.post(
        `${process.env.API_ROUTE}/api/studio`,
        createItem
      );
      if (res.status == 200) {
        setOpenCreateDialog(false);
        setCreateItem({ name: '', image_url: '', city: '', country_id: null });
        setSelectedCountry(null);
        updateToast({ toastId, message: res.data.message, isError: false });
      }
    } catch (error) {
      console.error(error);
      updateToast({
        toastId,
        message: error.response.data.error,
        isError: true,
      });
    } finally {
      mutate(`${process.env.API_ROUTE}/api/studio`);
    }
  }

  async function handleEdit() {
    const toastId = pushToast({
      message: 'Saving Country...',
      isLoading: true,
    });
    try {
      const res = await axios.put(
        `${process.env.API_ROUTE}/api/studio?id=${editItem.id}`,
        editItem
      );
      if (res.status == 201) {
        setOpenEditDialog(false);
        setEditItem({ name: '', image_url: '', city: '', country_id: null });
        updateToast({ toastId, message: res.data.message, isError: false });
      }
    } catch (error) {
      console.error(error);
      updateToast({
        toastId,
        message: error.response.data.error,
        isError: true,
      });
    } finally {
      mutate(`${process.env.API_ROUTE}/api/studio`);
    }
  }

  async function handleDelete() {
    const toastId = pushToast({
      message: 'Deleting Studio...',
      isLoading: true,
    });
    try {
      const res = await axios.delete(
        `${process.env.API_ROUTE}/api/studio?id=${deleteItem.id}`
      );
      if (res.status == 200) {
        setOpenDeleteDialog(false);
        setDeleteItem({ name: '', image_url: '', city: '', country_id: null });
        updateToast({ toastId, message: res.data.message, isError: false });
      }
    } catch (error) {
      console.error(error);
      updateToast({
        toastId,
        message: error.response.data.error,
        isError: true,
      });
    } finally {
      mutate(`${process.env.API_ROUTE}/api/studio`);
    }
  }

  function handleShowEditModal(id, name, image_url, city, country_id) {
    setEditItem({
      id: id,
      name: name,
      image_url: image_url,
      city: city,
      country_id: country_id,
    });
    let filteredCountry = country.filter((item) => item.id == country_id);
    setSelectedCountryEdit({
      id: filteredCountry[0]?.id,
      name: filteredCountry[0]?.name,
    });
    setOpenEditDialog(true);
  }

  function handleShowDeleteModal(id, name) {
    setDeleteItem({ id: id, name: name });
    setOpenDeleteDialog(true);
  }

  if (error || errorCountry) {
    return (
      <Layout title='Studio - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>
          Failed to load
        </div>
      </Layout>
    );
  }

  return (
    <Layout title='Studio - MyMovie'>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Studio</Title>
        <Button.success
          onClick={() => setOpenCreateDialog(true)}
          className='flex items-center gap-2'
        >
          <PlusSmIcon className='h-5 w-5' />
          Add Studio
        </Button.success>
      </div>

      <Dialog
        title='Create Studio'
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        onConfirm={handleCreate}
        confirmText='Save'
      >
        <div className='mt-5'>
          <LabeledInput
            label='Name'
            type='text'
            name='name'
            value={createItem.name}
            onChange={(e) =>
              setCreateItem({ ...createItem, name: e.target.value })
            }
            placeholder='Studio Name'
          />
          <LabeledInput
            label='Image URL (Optional)'
            type='text'
            name='image'
            value={createItem.image_url}
            onChange={(e) =>
              setCreateItem({ ...createItem, image_url: e.target.value })
            }
            placeholder='https://www.themoviedb.org/t/p/w220_and_h330_face/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg'
          />
          <LabeledInput
            label='City (Optional)'
            type='text'
            name='city'
            value={createItem.city}
            onChange={(e) =>
              setCreateItem({ ...createItem, city: e.target.value })
            }
            placeholder='Los Angles'
          />
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
        </div>
      </Dialog>

      <Dialog
        title='Edit Studio'
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        onClose={() => setOpenEditDialog(false)}
        onConfirm={handleEdit}
        confirmText='Update'
        isEdit
      >
        <div className='mt-5'>
          <LabeledInput
            label='Name'
            type='text'
            name='name'
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
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
          <LabeledInput
            label='City (Optional)'
            type='text'
            name='city'
            value={editItem.city}
            onChange={(e) => setEditItem({ ...editItem, city: e.target.value })}
            placeholder='Los Angles'
          />
          <SearchBox
            label='Country Name (Optional)'
            value={selectedCountryEdit}
            placeholder='Search or Select'
            onChange={setSelectedCountryEdit}
            onChangeQuery={(e) => setQueryCountryEdit(e.target.value)}
            afterLeave={() => setQueryCountryEdit('')}
            filtered={filteredCountryEdit}
            query={queryCountryEdit}
          />
        </div>
      </Dialog>

      <Dialog
        title='Delete Studio'
        open={openDeleteDialog}
        isDanger
        setOpen={setOpenDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDelete}
      >
        <div className='mt-5 text-center sm:text-left'>
          Are you sure want to delete studio{' '}
          <span className='font-semibold'>{deleteItem.name}</span> ?
        </div>
      </Dialog>

      <LabeledInput
        label='Search Data'
        id='caridata'
        name='caridata'
        placeholder='Keyword'
        className='max-w-xs !py-2'
        onChange={(e) => setQuery(e.target.value)}
      />

      {data ? (
        <TableSimple
          head={
            <>
              <TableSimple.td small>No</TableSimple.td>
              <TableSimple.td>Logo</TableSimple.td>
              <TableSimple.td>Name</TableSimple.td>
              <TableSimple.td>City</TableSimple.td>
              <TableSimple.td>Country</TableSimple.td>
              <TableSimple.td small>Action</TableSimple.td>
            </>
          }
        >
          {filtered.map((item, index) => {
            return (
              <TableSimple.tr key={index}>
                <TableSimple.td small>{index + 1}</TableSimple.td>
                <TableSimple.td>
                  {item.image_url ? (
                    <div className='relative h-8 overflow-hidden'>
                      <Image
                        alt={item?.name}
                        src={item?.image_url}
                        fill
                        className={`rounded object-contain`}
                      />
                    </div>
                  ) : (
                    <div className='relative mx-auto flex h-10 w-10 items-center justify-center overflow-hidden rounded bg-neutral-200 dark:bg-neutral-800'>
                      <PhotographIcon className='h-8 w-8 text-neutral-500' />
                    </div>
                  )}
                </TableSimple.td>
                <TableSimple.td>
                  <Link
                    href={`studio/detail/${item.id}`}
                    className='rounded text-sm font-medium text-emerald-500 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500'
                  >
                    {item.name}
                  </Link>
                </TableSimple.td>
                <TableSimple.td>{item.city}</TableSimple.td>
                <TableSimple.td>
                  <Link
                    href={`/country/detail/${item.countries?.id}`}
                    className='rounded text-sm font-medium text-emerald-500 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500'
                  >
                    {item.countries?.name}
                  </Link>
                </TableSimple.td>
                <TableSimple.td>
                  <Button
                    className='mr-2 !py-[2px] !px-[6px]'
                    onClick={() =>
                      handleShowEditModal(
                        item.id,
                        item.name,
                        item.image_url,
                        item.city,
                        item.countries?.id
                      )
                    }
                  >
                    Edit
                  </Button>
                  <Button.danger
                    className='!py-[2px] !px-[6px]'
                    onClick={() => handleShowDeleteModal(item.id, item.name)}
                  >
                    Delete
                  </Button.danger>
                </TableSimple.td>
              </TableSimple.tr>
            );
          })}
        </TableSimple>
      ) : (
        <Shimer className='!h-60' />
      )}
    </Layout>
  );
}
