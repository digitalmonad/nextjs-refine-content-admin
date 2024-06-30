"use client";

import { CreateBlogPostForm } from "@components/posts/forms/create-blog-post-form";
import { Button } from "@components/ui/button";
import { useNavigation, useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { ChevronLeftIcon, PlusIcon } from "lucide-react";
import React from "react";

export default function BlogPostCreate() {
  const { list } = useNavigation();
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">{"Create Blog Post"}</h2>
        <Button variant={"outline"} onClick={() => list("blog_posts")}>
          <ChevronLeftIcon className="icon mr-2" />
          {"List"}
        </Button>
      </div>

      <CreateBlogPostForm />
    </div>
  );
}
