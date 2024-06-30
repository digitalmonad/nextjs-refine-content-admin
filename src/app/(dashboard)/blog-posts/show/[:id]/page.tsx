"use client";

import { ShowBlogPostForm } from "@components/posts/forms/show-blog-post-form";
import { Button } from "@components/ui/button";
import { useNavigation, useOne, useResource, useShow } from "@refinedev/core";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";

export default function BlogPostShow() {
  const { showId } = useShow({});
  const { edit, list } = useNavigation();

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Edit Blog Post ID: {showId}</h2>
        <div className="flex items-center gap-2">
          <Button variant={"outline"} onClick={() => list("blog_posts")}>
            <ChevronLeftIcon className="icon mr-2" />
            {"List"}
          </Button>
          <Button
            variant={"outline"}
            onClick={() => edit("blog_posts", showId ?? "")}
          >
            {"Edit"}
            <ChevronRightIcon className="icon ml-2" />
          </Button>
        </div>
      </div>
      <ShowBlogPostForm />
    </div>
  );
}
