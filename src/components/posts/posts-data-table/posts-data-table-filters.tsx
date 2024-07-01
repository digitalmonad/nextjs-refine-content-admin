import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { useTable } from "@refinedev/react-table";
import { BlogPostStatusSchema } from "@schemas/blog-post";
import debounce from "lodash.debounce";

import { ChevronDownIcon, Search } from "lucide-react";

export const PostsDataTableFilters = ({
  table,
}: {
  table: ReturnType<typeof useTable>;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="relative flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
          onChange={debounce((e) => {
            if (e.target.value.length < 1) {
              table.resetPagination();
              return table.getColumn("title")?.setFilterValue(undefined);
            }
            if (e.target.value.length > 2) {
              table.resetPagination();
              return table.getColumn("title")?.setFilterValue(e.target.value);
            }
          }, 500)}
        />
      </div>
      <div className="flex space-x-2">
        <Select
          key={table.getColumn("status")?.getFilterValue() as string}
          defaultValue={undefined}
          onValueChange={(value) => {
            if (value === "none") {
              table.getColumn("status")?.setFilterValue(undefined);
              return;
            }

            table.getColumn("status")?.setFilterValue(value);
          }}
          value={table.getColumn("status")?.getFilterValue() as string}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status filter" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="none" className="p-3.5"></SelectItem>
            {BlogPostStatusSchema._def.values.map((option) => (
              <SelectItem value={option} key={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
