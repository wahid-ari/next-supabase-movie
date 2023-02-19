import { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import useToast from '@utils/useToast';
import { PlusSmIcon } from '@heroicons/react/outline';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import Dialog from '@components/systems/Dialog';
import Button from '@components/systems/Button';
import LabeledInput from '@components/systems/LabeledInput';
import ReactTable from '@components/systems/ReactTable';
import LinkButton from '@components/systems/LinkButton';
import nookies from 'nookies';
import moment from 'moment';

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

export default function Actor() {
  const { data, error } = useSWR(`${process.env.API_ROUTE}/api/actor`, fetcher);
  const { updateToast, pushToast, dismissToast } = useToast();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItem, setDeleteItem] = useState({ id: null, name: '' });

  async function handleDelete() {
    const toastId = pushToast({
      message: 'Deleting Song...',
      isLoading: true,
    });
    try {
      const res = await axios.delete(`${process.env.API_ROUTE}/api/actor?id=${deleteItem.id}`);
      if (res.status == 200) {
        setOpenDeleteDialog(false);
        setDeleteItem({ id: null, name: '' });
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
      mutate(`${process.env.API_ROUTE}/api/actor`);
    }
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
              href={`actor/detail/${values.id}`}
              className='rounded text-sm font-medium transition-all duration-200 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-500'
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
        Header: 'Age',
        accessor: 'birthday',
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row;
          return values.birthday ? Number(moment().diff(values.birthday, 'years', false)) : '';
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
              className='rounded text-sm font-medium transition-all duration-200 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-500'
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
              <Link
                href={`actor/edit/${values.id}`}
                className='mr-2 rounded bg-sky-600 py-[3px] px-[6px] text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400'
              >
                Edit
              </Link>
              <Button.danger
                className='!py-[2px] !px-[6px]'
                onClick={() => handleShowDeleteModal(values.id, values.name)}
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

  if (error) {
    return (
      <Layout title='Actor - MyMovie'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Actor - MyMovie'>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        <Title>Actor</Title>
        <LinkButton href='actor/add' className='flex items-center gap-2'>
          <PlusSmIcon className='h-5 w-5' />
          Add Actor
        </LinkButton>
      </div>

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

      <Dialog
        title='Delete Actor'
        open={openDeleteDialog}
        isDanger
        setOpen={setOpenDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDelete}
      >
        <div className='mt-5 text-center sm:text-left'>
          Are you sure want to delete actor <span className='font-semibold'>{deleteItem.name}</span> ?
        </div>
      </Dialog>
    </Layout>
  );
}
