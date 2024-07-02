"use client";

import {
  GetManyResponse,
  useDelete,
  useMany,
  useNavigation,
} from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@components/ui/data-table/data-table";
import { DataTablePagination } from "@components/ui/data-table/data-table-pagination";
import { formatDateSafe } from "@lib/date";
import { PostsDataTableFilters } from "./posts-data-table-filters";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Edit, Eye, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import {
  CaretDownIcon,
  CaretSortIcon,
  CaretUpIcon,
} from "@radix-ui/react-icons";
import { toast } from "sonner";

export default function PostsDataTable() {
  const { editUrl, showUrl } = useNavigation();

  const { mutateAsync } = useDelete();

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        size: 50,
        minSize: 50,
        maxSize: 50,
        header: ({ column }) => {
          const sortingOrder = column.getIsSorted();
          return (
            <Link
              className="flex items-center hover:underline"
              href={"#"}
              onClick={() => column.toggleSorting()}
            >
              ID
              {sortingOrder === "asc" ? (
                <CaretUpIcon className="ml-2 icon" />
              ) : sortingOrder === "desc" ? (
                <CaretDownIcon className="ml-2 icon" />
              ) : (
                <CaretSortIcon className="ml-2 icon" />
              )}
            </Link>
          );
        },
      },
      {
        id: "title",
        accessorKey: "title",
        header: ({ column }) => {
          const sortingOrder = column.getIsSorted();
          return (
            <Link
              className="flex items-center hover:underline"
              href={"#"}
              onClick={() => column.toggleSorting()}
            >
              Title
              {sortingOrder === "asc" ? (
                <CaretUpIcon className="ml-2 icon" />
              ) : sortingOrder === "desc" ? (
                <CaretDownIcon className="ml-2 icon" />
              ) : (
                <CaretSortIcon className="ml-2 icon" />
              )}
            </Link>
          );
        },
        cell: ({ getValue, cell }) => {
          return (
            <div
              className="truncate overflow-hidden max-w-[200px]"
              style={{
                width: cell.column.getSize(),
              }}
            >
              {getValue<string>()}
            </div>
          );
        },
        meta: {
          filterOperator: "contains",
        },
      },
      {
        id: "content",
        accessorKey: "content",
        header: ({ column }) => {
          const sortingOrder = column.getIsSorted();
          return (
            <Link
              className="flex items-center hover:underline"
              href={"#"}
              onClick={() => column.toggleSorting()}
            >
              Content
              {sortingOrder === "asc" ? (
                <CaretUpIcon className="ml-2 icon" />
              ) : sortingOrder === "desc" ? (
                <CaretDownIcon className="ml-2 icon" />
              ) : (
                <CaretSortIcon className="ml-2 icon" />
              )}
            </Link>
          );
        },
        cell: function render({ getValue }) {
          return (
            <div className="truncate overflow-hidden max-w-[200px]">
              {getValue<string>()}
            </div>
          );
        },
      },
      {
        id: "category",
        enableSorting: true,
        accessorKey: "category",
        meta: {
          filterOperator: "eq",
        },
        header: "Category",
        cell: function render({ getValue, table }) {
          const meta = table.options.meta as {
            categoryData: GetManyResponse;
          };

          try {
            const category = meta.categoryData?.data?.find(
              (item) => item.id == getValue<string>()?.id
            );

            return category?.title ?? "-- No label --";
          } catch (error) {
            return null;
          }
        },
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        enableColumnFilter: true,
        enableSorting: true,
        header: ({ column }) => {
          const sortingOrder = column.getIsSorted();
          return (
            <Link
              className="flex items-center hover:underline"
              href={"#"}
              onClick={() => column.toggleSorting()}
            >
              Created At
              {sortingOrder === "asc" ? (
                <CaretUpIcon className="ml-2 icon" />
              ) : sortingOrder === "desc" ? (
                <CaretDownIcon className="ml-2 icon" />
              ) : (
                <CaretSortIcon className="ml-2 icon" />
              )}
            </Link>
          );
        },
        cell: function render({ getValue }) {
          return formatDateSafe(getValue<string>(), "yyyy-MM-dd HH:mm:ss");
        },
      },
      {
        id: "status",
        accessorKey: "status",
        header: ({ column }) => {
          const sortingOrder = column.getIsSorted();
          return (
            <Link
              className="flex items-center hover:underline justify-end"
              href={"#"}
              onClick={() => column.toggleSorting()}
            >
              Status
              {sortingOrder === "asc" ? (
                <CaretUpIcon className="ml-2 icon" />
              ) : sortingOrder === "desc" ? (
                <CaretDownIcon className="ml-2 icon" />
              ) : (
                <CaretSortIcon className="ml-2 icon" />
              )}
            </Link>
          );
        },
        cell: function render({ getValue }) {
          return <div className="flex justify-end">{getValue<string>()}</div>;
        },
      },
      {
        id: "actions",
        accessorKey: "id",
        size: 80,
        minSize: 80,
        maxSize: 80,
        header: ({ header }) => <div className="text-right">Actions</div>,
        cell: ({ getValue, cell }) => {
          return (
            <div>
              <ActionsCell
                showActionLinkUrl={showUrl("blog_posts", getValue<string>())}
                editActionLinkUrl={editUrl("blog_posts", getValue<string>())}
                onDelete={async () =>
                  await mutateAsync({
                    resource: "blog_posts",
                    id: getValue<string>(),
                  })
                }
              />
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useTable({
    columns,
    refineCoreProps: {
      syncWithLocation: true,
    },
    defaultColumn: {
      size: 200,
      maxSize: 200,
      minSize: 200,
    },
  });

  const {
    refineCore: {
      tableQueryResult: { data: tableData },
    },
  } = table;

  const { data: categoryData } = useMany({
    resource: "categories",
    ids:
      tableData?.data?.map((item) => item?.category?.id).filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!tableData?.data,
    },
  });

  table.setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
      categoryData,
    },
  }));

  return (
    <div className="flex flex-col space-y-4">
      <PostsDataTableFilters {...{ table }} />
      <DataTable {...{ table }} />
      <DataTablePagination {...{ table }} />
    </div>
  );
}

const ActionsCell = ({
  showActionLinkUrl,
  editActionLinkUrl,
  onDelete,
  ...props
}: any) => {
  const [open, setIsOpen] = useState(false);
  return (
    <div className="flex justify-end space-x-2" {...props}>
      <Link href={showActionLinkUrl}>
        <Eye className="icon" />
      </Link>

      <Link href={editActionLinkUrl}>
        <Edit className="icon" />
      </Link>

      <AlertDialogDemo
        open={open}
        onCancel={() => setIsOpen(false)}
        onApprove={async () => {
          try {
            await onDelete();
            setIsOpen(false);
            toast.success("Post deleted successfully");
          } catch (error) {
            toast.error("Failed to delete post");
          }
        }}
      >
        <X className="icon cursor-pointer" onClick={() => setIsOpen(true)} />
      </AlertDialogDemo>
    </div>
  );
};

export function AlertDialogDemo({
  children,
  open,
  onApprove,
  onCancel,
}: {
  children: React.ReactNode;
  open: boolean;
  onApprove: () => void;
  onCancel: () => void;
}) {
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onCancel()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => onApprove()}>
            Approve
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
