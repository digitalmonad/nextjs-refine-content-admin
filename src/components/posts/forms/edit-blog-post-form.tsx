import { Button } from "@components/ui/button";
import { useSelect } from "@refinedev/core";
import { Input } from "@components/ui/input";
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@components/ui/textarea";

import React from "react";
import { toast } from "sonner";
import {
  BlogPostStatusSchema,
  editBlogPostFormSchema,
} from "@schemas/blog-post";

export const EditBlogPostForm = () => {
  const form = useForm({
    resolver: zodResolver(editBlogPostFormSchema),
    refineCoreProps: {
      onMutationSuccess: () => {
        toast.success("Blog post updated successfully");
      },
    },
  });

  const blogPostsData = form.refineCore.queryResult?.data?.data;

  const { options: categoryOptions } = useSelect({
    resource: "categories",
    defaultValue: blogPostsData?.category?.id,
  });

  React.useEffect(() => {
    form.setValue("category.id", blogPostsData?.category?.id);
  }, [categoryOptions]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(form.refineCore.onFinish)}>
        <div className="flex flex-col space-y-2 max-w-2xl border p-4 rounded-lg">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>
                <FormDescription>
                  The unique blog post slug is created from this.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Blog post content"
                    {...field}
                    rows={5}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category.id"
            render={({ field }) => {
              // Find if there is a matching category option. Since there can be a case of db inconsistency when the category is deleted, but still can exist on Post
              const matchingOption = categoryOptions?.find(
                (option) => option.value === field.value
              );

              console.log(categoryOptions);

              return (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(+value);
                    }}
                    key={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        {matchingOption ? (
                          <SelectValue
                            placeholder="Select blog post category"
                            key={matchingOption.value}
                          >
                            {matchingOption.label}
                          </SelectValue>
                        ) : (
                          <SelectValue
                            placeholder="Select blog post category"
                            key="error"
                          >
                            No matching category found
                          </SelectValue>
                        )}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoryOptions?.map((option) => (
                        <SelectItem value={option.value} key={option.value}>
                          {option.label ?? "-- No label --"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  key={field.value}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BlogPostStatusSchema._def.values.map((option) => (
                      <SelectItem value={option} key={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  The post is by default in &quot;draft&quot; state
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex pt-4">
            <Button variant={"outline"} type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
