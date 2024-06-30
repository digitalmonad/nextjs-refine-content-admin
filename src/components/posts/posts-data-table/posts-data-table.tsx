"use client";

import { GetManyResponse, useMany, useNavigation } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import React from "react";

import { DataTable } from "@components/ui/data-table/data-table";
import { formatDateSafe } from "@lib/date";

export default function PostsDataTable() {
  const { edit, show } = useNavigation();

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
            <div
              className="flex justify-end"
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "4px",
              }}
            >
              <button
                onClick={() => {
                  show("blog_posts", getValue() as string);
                }}
              >
                Show
              </button>
              <button
                onClick={() => {
                  edit("blog_posts", getValue() as string);
                }}
              >
                Edit
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useTable({
    columns,
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

  return <DataTable {...{ table }} />;
}
