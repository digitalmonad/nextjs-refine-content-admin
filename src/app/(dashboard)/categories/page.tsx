"use client";

import { CategoriesDataTable } from "@components/categories/categories-data-table/categories-data-table";
import { Button } from "@components/ui/button";
import { useNavigation } from "@refinedev/core";
import { PlusIcon } from "lucide-react";

import React from "react";

export default function CategoryList() {
  const { create } = useNavigation();

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">{"Blog Posts List"}</h2>
        <Button variant={"outline"} onClick={() => create("categories")}>
          <PlusIcon className="w-4 h-4" />
          {"Create"}
        </Button>
      </div>
      <CategoriesDataTable />
    </div>
  );
}
