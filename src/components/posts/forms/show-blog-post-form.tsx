import { useOne, useShow } from "@refinedev/core";
import { Input } from "@components/ui/input";

import { Textarea } from "@components/ui/textarea";

import React from "react";
import { Label } from "@components/ui/label";
import { format } from "date-fns";
import { formatDateSafe } from "@lib/date";

export const ShowBlogPostForm = () => {
  const { queryResult } = useShow({});
  const { data: data } = queryResult;

  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "categories",
    id: record?.category?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <div className="flex flex-col space-y-2 max-w-2xl border p-4 rounded-lg">
      <Label>Title</Label>
      <Input placeholder="Title" value={record?.title} />
      <Label>Content</Label>
      <Textarea
        placeholder="Blog post content"
        value={record?.content}
        rows={5}
      />

      <Label>Category</Label>
      <Input placeholder="Category" value={categoryData?.data.title} />
      <Label>Status</Label>
      <Input placeholder="Status" value={record?.status} />
      <Label>Created at</Label>
      <Input
        placeholder="Created at"
        value={formatDateSafe(record?.createdAt, "yyyy-MM-dd HH:mm:ss")}
      />
    </div>
  );
};
