"use client";

import { GetManyResponse, useMany, useNavigation } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import React from "react";

import { DataTable } from "@components/ui/data-table/data-table";
import { DataTablePagination } from "@components/ui/data-table/data-table-pagination";
import { formatDateSafe } from "@lib/date";
import { PostsDataTableFilters } from "./posts-data-table-filters";

import { Edit, Eye } from "lucide-react";
import Link from "next/link";

export default function PostsDataTable() {
  const { editUrl, showUrl } = useNavigation();

  const columns = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: "ID",
      },
      {
        id: "title",
        accessorKey: "title",
        header: "Title",
        meta: {
          filterOperator: "contains",
        },
      },
      {
        id: "content",
        accessorKey: "content",
        header: "Content",
        cell: function render({ getValue }) {
          return (
            <div className="lowercase truncate overflow-hidden max-w-[300px]">
              {getValue<any>()}
            </div>
          );
        },
      },
      {
        id: "category",
        header: "Category",
        accessorKey: "category",
        meta: {
          filterOperator: "eq",
        },
        cell: function render({ getValue, table }) {
          const meta = table.options.meta as {
            categoryData: GetManyResponse;
          };

          try {
            const category = meta.categoryData?.data?.find(
              (item) => item.id == getValue<any>()?.id
            );

            return category?.title ?? "Loading...";
          } catch (error) {
            return null;
          }
        },
      },
      {
        id: "status",
        accessorKey: "status",
        header: "Status",
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Created At",
        cell: function render({ getValue }) {
          return formatDateSafe(getValue<any>(), "dd-MM-yyy HH:mm:ss");
        },
      },
      {
        id: "actions",
        accessorKey: "id",
        header: () => <div className="text-right">Actions</div>,
        cell: function render({ getValue }) {
          return (
            <div className="flex justify-end space-x-2">
              <Link href={showUrl("blog_posts", getValue() as string)}>
                <Eye className="icon" />
              </Link>

              <Link href={editUrl("blog_posts", getValue() as string)}>
                <Edit className="icon" />
              </Link>
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
