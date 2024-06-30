import { DataTable } from "@components/ui/data-table/data-table";

import { useNavigation } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

export const CategoriesDataTable = () => {
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
                  show("categories", getValue() as string);
                }}
              >
                Show
              </button>
              <button
                onClick={() => {
                  edit("categories", getValue() as string);
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

  const { edit, show, create } = useNavigation();

  const table = useTable({
    columns,
  });

  table.setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
    },
  }));

  return <DataTable {...{ table }} />;
};
