import { useState } from "react";
import Link from "next/link";
import useSWR, { mutate } from "swr";
import axios from "axios";
import useToast from "@utils/useToast";
import { PlusSmIcon } from "@heroicons/react/outline";
import Layout from "@components/layout/Layout";
import TableSimple from "@components/systems/TableSimple";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";
import Dialog from "@components/systems/Dialog";
import Button from "@components/systems/Button";
import LabeledInput from "@components/systems/LabeledInput";
import nookies from "nookies";

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

export default function Category() {
  const { data, error } = useSWR(`${process.env.API_ROUTE}/api/category`, fetcher)
  const { updateToast, pushToast, dismissToast } = useToast();
  const [openCreateDialog, setOpenCreateDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [name, setName] = useState("")
  const [editItem, setEditItem] = useState({ id: null, name: "" })
  const [deleteItem, setDeleteItem] = useState({ id: null, name: "" })

  async function handleCreate() {
    const toastId = pushToast({
      message: "Saving Category...",
      isLoading: true,
    });
    try {
      const res = await axios.post(`${process.env.API_ROUTE}/api/category`, { name: name })
      if (res.status == 200) {
        setOpenCreateDialog(false)
        setName("")
        updateToast({ toastId, message: res.data.message, isError: false });
      }
    } catch (error) {
      console.error(error)
      updateToast({ toastId, message: error.response.data.error, isError: true });
    } finally {
      mutate(`${process.env.API_ROUTE}/api/category`)
    }
  }

  async function handleEdit() {
    const toastId = pushToast({
      message: "Saving Category...",
      isLoading: true,
    });
    try {
      const res = await axios.put(`${process.env.API_ROUTE}/api/category`, editItem)
      if (res.status == 201) {
        setOpenEditDialog(false)
        setEditItem({ id: null, name: "" })
        updateToast({ toastId, message: res.data.message, isError: false });
      }
    } catch (error) {
      console.error(error)
      updateToast({ toastId, message: error.response.data.error, isError: true });
    } finally {
      mutate(`${process.env.API_ROUTE}/api/category`)
    }
  }

  async function handleDelete() {
    const toastId = pushToast({
      message: "Deleting Category...",
      isLoading: true,
    });
    try {
      const res = await axios.delete(`${process.env.API_ROUTE}/api/category?id=${deleteItem.id}`)
      if (res.status == 200) {
        setOpenDeleteDialog(false)
        setDeleteItem({ id: null, name: "" })
        updateToast({ toastId, message: res.data.message, isError: false });
      }
    } catch (error) {
      console.error(error)
      updateToast({ toastId, message: error.response.data.error, isError: true });
    } finally {
      mutate(`${process.env.API_ROUTE}/api/category`)
    }
  }

  function handleShowEditModal(id, name) {
    setEditItem({ id: id, name: name })
    setOpenEditDialog(true)
  }

  function handleShowDeleteModal(id, name) {
    setDeleteItem({ id: id, name: name })
    setOpenDeleteDialog(true)
  }

  if (error) {
    return (
      <Layout title="Category - MyMovie">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title="Category - MyMovie">

      <div className="flex flex-wrap justify-between items-center mb-6 gap-y-3">
        <Title>Category</Title>
        <Button.success onClick={() => setOpenCreateDialog(true)} className="flex gap-2 items-center">
          <PlusSmIcon className="h-5 w-5" />Add Category
        </Button.success>
      </div>

      <Dialog
        title="Create Category"
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        onConfirm={handleCreate}
        confirmText="Save"
      >
        <div className="mt-5">
          <LabeledInput label="Name" type="text" name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Action"
          />
        </div>
      </Dialog>

      <Dialog
        title="Edit Category"
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        onClose={() => setOpenEditDialog(false)}
        onConfirm={handleEdit}
        confirmText="Update"
        isEdit
      >
        <div className="mt-5">
          <LabeledInput label="Name" type="text" name="name"
            value={editItem.name}
            onChange={(e) =>
              setEditItem({ ...editItem, name: e.target.value })
            }
          />
        </div>
      </Dialog>

      <Dialog
        title="Delete Category"
        open={openDeleteDialog}
        isDanger
        setOpen={setOpenDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDelete}
      >
        <div className="mt-5 text-center sm:text-left">
          Are you sure want to delete category <span className="font-semibold">{deleteItem.name}</span> ?
        </div>
      </Dialog>

      {data ?
        <TableSimple
          head={
            <>
              <TableSimple.td small>No</TableSimple.td>
              <TableSimple.td>Name</TableSimple.td>
              <TableSimple.td small>Action</TableSimple.td>
            </>
          }
        >
          {data.map((item, index) => {
            return (
              <TableSimple.tr key={index}>
                <TableSimple.td small>{index + 1}</TableSimple.td>
                <TableSimple.td>
                  <Link href={`category/detail/${item.id}`} className="text-emerald-500 hover:text-emerald-600 text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 rounded">
                    {item.name}
                  </Link>  
                </TableSimple.td>
                <TableSimple.td>
                  <Button className="!py-[2px] !px-[6px] mr-2"
                    onClick={() => handleShowEditModal(item.id, item.name)}>
                    Edit
                  </Button>
                  <Button.danger className="!py-[2px] !px-[6px]"
                    onClick={() => handleShowDeleteModal(item.id, item.name)}>
                    Delete
                  </Button.danger>
                </TableSimple.td>
              </TableSimple.tr>
            );
          })}
        </TableSimple>
        :
        <Shimer className="!h-60" />
      }

    </Layout>
  );
}