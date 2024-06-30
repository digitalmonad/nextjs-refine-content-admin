"use client";

import PostsDataTable from "@components/posts/posts-data-table/posts-data-table";
import { Button } from "@components/ui/button";
import { useNavigation } from "@refinedev/core";
import { PlusIcon } from "lucide-react";

import React from "react";

export default function BlogPostList() {
  const { create } = useNavigation();

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">{"Blog Posts List"}</h2>
        <Button variant={"outline"} onClick={() => create("blog_posts")}>
          <PlusIcon className="icon mr-2" />
          {"Create"}
        </Button>
      </div>

      <PostsDataTable />
    </div>
  );
}
