import { Button } from "@components/ui/button";
import { useSelect } from "@refinedev/core";
import { Input } from "@components/ui/input";
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

const BlogPostStatusSchema = z.enum(["draft", "published", "rejected"]);

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  category: z.object({
    id: z.number(),
  }),
  status: BlogPostStatusSchema,
});

export const CreateBlogPostForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: BlogPostStatusSchema.Values.draft,
      title: "",
      content: "",
      category: {
        id: undefined,
      },
    },
  });

  const {
    refineCore: { onFinish },
    handleSubmit,
    formState: { errors },
  } = form;

  const { options: categoryOptions } = useSelect({
    resource: "categories",
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onFinish)}>
        <div className="flex flex-col space-y-2 max-w-2xl border p-4 rounded-lg">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Blog post title" {...field} />
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(Number(value));
                  }}
                  value={field.value as unknown as string}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blog post category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoryOptions?.map((option) => (
                      <SelectItem value={option.value} key={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
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
