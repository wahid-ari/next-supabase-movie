import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { mutate } from 'swr';
import { useCountryData, useDirectorData } from '@libs/swr';
import axios from 'axios';
import useToast from '@utils/useToast';
import { PlusSmIcon } from '@heroicons/react/outline';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import Dialog from '@components/systems/Dialog';
import Button from '@components/systems/Button';
import LabeledInput from '@components/systems/LabeledInput';
import nookies from 'nookies';
import SearchBox from '@components/systems/SearchBox';
import Radio from '@components/systems/Radio';
import Label from '@components/systems/Label';
import TextArea from '@components/systems/TextArea';
import ReactTable from '@components/systems/ReactTable';

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

export default function Director() {
  const { data, error } = useDirectorData();
  const { data: country, error: errorCountry } = useCountryData();
  const { updateToast, pushToast, dismissToast } = useToast();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [createItem, setCreateItem] = useState({
    name: '',
    image_url: '',
    gender: 1,
    biography: '',
    country_id: null,
  });
  const [editItem, setEditItem] = useState({
    name: '',
    image_url: '',
    gender: 1,
    biography: '',
    country_id: null,
  });
  const [deleteItem, setDeleteItem] = useState({
    name: '',
    image_url: '',
    gender: 1,
    biography: '',
    country_id: null,
  });
  const [selectedCountry, setSelectedCountry] = useState();
  const [queryCountry, setQueryCountry] = useState('');
  const [selectedCountryEdit, setSelectedCountryEdit] = useState();
  const [queryCountryEdit, setQueryCountryEdit] = useState('');

  const filteredCountry =
    queryCountry === ''
      ? country
      : country.filter((item) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(queryCountry.toLowerCase().replace(/\s+/g, ''))
        );

  const filteredCountryEdit =
    queryCountryEdit === ''
      ? country
      : country.filter((item) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(queryCountryEdit.toLowerCase().replace(/\s+/g, ''))
        );

  useEffect(() => {
    if (selectedCountry) setCreateItem({ ...createItem, country_id: selectedCountry.id });
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountryEdit) setEditItem({ ...editItem, country_id: selectedCountryEdit.id });
  }, [selectedCountryEdit]);

  async function handleCreate() {
    const toastId = pushToast({
      message: 'Saving Director...',
      isLoading: true,
    });
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/director`, createItem);
      if (res.status == 200) {
        setOpenCreateDialog(false);
        setCreateItem({
          name: '',
          image_url: '',
          gender: 1,
          biography: '',
          country_id: null,
        });
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
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/director`);
    }
  }

  async function handleEdit() {
    const toastId = pushToast({
      message: 'Saving Country...',
      isLoading: true,
    });
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/director?id=${editItem.id}`, editItem);
      if (res.status == 201) {
        setOpenEditDialog(false);
        setEditItem({
          name: '',
          image_url: '',
          gender: 1,
          biography: '',
          country_id: null,
        });
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
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/director`);
    }
  }

  async function handleDelete() {
    const toastId = pushToast({
      message: 'Deleting Director...',
      isLoading: true,
    });
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/director?id=${deleteItem.id}`);
      if (res.status == 200) {
        setOpenDeleteDialog(false);
        setDeleteItem({
          name: '',
          image_url: '',
          gender: 1,
          biography: '',
          country_id: null,
        });
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
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/director`);
    }
  }

  function handleShowEditModal(id, name, image_url, gender, biography, country_id) {
    setEditItem({
      id: id,
      name: name,
      image_url: image_url,
      gender: gender,
      biography: biography,
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

  const column = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'id',
        width: 300,
        Cell: (row) => {
          return row.cell.row.index + 1;
        },
      },
      {
        Header: 'Name',
        accessor: 'name',
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row;
          return (
            <Link
              href={`/director/detail/${values.id}`}
              className='rounded text-sm font-medium transition-all duration-200 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
            >
              {values.name}
            </Link>
          );
        },
      },
      {
        Header: 'Gender',
        accessor: 'gender',
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row;
          return values.gender == 1 ? 'Male' : 'Female';
        },
      },
      {
        Header: 'Country',
        accessor: 'countries.name',
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row;
          return (
            <Link
              href={`/country/detail/${original.countries?.id}`}
              className='rounded text-sm font-medium transition-all duration-200 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
            >
              {original.countries?.name}
            </Link>
          );
        },
      },
      {
        Header: 'Action',
        disableSortBy: true,
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row;
          return (
            <div>
              <Button
                className='mr-2 !py-[2px] !px-[6px]'
                onClick={() =>
                  handleShowEditModal(
                    original.id,
                    original.name,
                    original.image_url,
                    original.gender,
                    original.biography,
                    original.countries?.id
                  )
                }
              >
                Edit
              </Button>
              <Button.danger
                className='!py-[2px] !px-[6px]'
                onClick={() => handleShowDeleteModal(original.id, original.name)}
              >
                Delete
              </Button.danger>
            </div>
          );
        },
        width: 200,
      },
    ],
    []
  );

  const tableInstance = useRef(null);

  if (error || errorCountry) {
    return (
      <Layout title='Director - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Director - MyMovie'>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Director</Title>
        <Button.success onClick={() => setOpenCreateDialog(true)} className='flex items-center gap-2'>
          <PlusSmIcon className='h-5 w-5' />
          Add Director
        </Button.success>
      </div>

      <Dialog
        title='Create Director'
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
            onChange={(e) => setCreateItem({ ...createItem, name: e.target.value })}
            placeholder='Director Name'
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
                onChange={(e) =>
                  setCreateItem({
                    ...createItem,
                    gender: Number(e.target.value),
                  })
                }
              />
              <Radio
                value={2}
                checked={createItem.gender == 2}
                name='gender'
                label='Female'
                className='!mb-2'
                onChange={(e) =>
                  setCreateItem({
                    ...createItem,
                    gender: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>
          <TextArea
            label='Biography (Optional)'
            type='text'
            name='biography'
            value={createItem.biography}
            onChange={(e) => setCreateItem({ ...createItem, biography: e.target.value })}
            placeholder='Director Biography'
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
        title='Edit Director'
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
            onChange={(e) => setEditItem({ ...editItem, image_url: e.target.value })}
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
                onChange={(e) => setEditItem({ ...editItem, gender: Number(e.target.value) })}
              />
              <Radio
                value={2}
                checked={editItem.gender == 2}
                name='gender'
                label='Female'
                className='!mb-2'
                onChange={(e) => setEditItem({ ...editItem, gender: Number(e.target.value) })}
              />
            </div>
          </div>
          <TextArea
            label='Biography (Optional)'
            type='text'
            name='biography'
            value={editItem.biography}
            onChange={(e) => setEditItem({ ...editItem, biography: e.target.value })}
            placeholder='Director Biography'
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
        title='Delete Director'
        open={openDeleteDialog}
        isDanger
        setOpen={setOpenDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDelete}
      >
        <div className='mt-5 text-center sm:text-left'>
          Are you sure want to delete director <span className='font-semibold'>{deleteItem.name}</span> ?
        </div>
      </Dialog>

      {data ? (
        <>
          <LabeledInput
            label='Search Data'
            id='caridata'
            name='caridata'
            placeholder='Keyword'
            className='max-w-xs !py-2'
            onChange={(e) => {
              tableInstance.current.setGlobalFilter(e.target.value);
            }}
          />

          <ReactTable
            columns={column}
            data={data}
            ref={tableInstance}
            page_size={20}
            itemPerPage={[5, 10, 20, 50, 100]}
          />
        </>
      ) : (
        <Shimer className='!h-60' />
      )}
    </Layout>
  );
}
