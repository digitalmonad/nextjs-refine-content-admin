import { z } from "zod";

export const BlogPostStatusSchema = z.enum(["draft", "published", "rejected"]);

const MIN_POST_TITLE_LENGTH = 2;
const MIN_POST_CONTENT_LENGTH = 2;

const blogPostSchema = z.object({
  title: z.string().min(MIN_POST_TITLE_LENGTH, {
    message: `Title must be at least ${MIN_POST_TITLE_LENGTH} characters long.`,
  }),
  content: z.string().min(MIN_POST_CONTENT_LENGTH, {
    message: `Title must be at least ${MIN_POST_CONTENT_LENGTH} characters long.`,
  }),
  category: z.object({
    id: z.number(),
  }),
  status: BlogPostStatusSchema,
});

export const createBlogPostFormSchema = blogPostSchema;
export const editBlogPostFormSchema = blogPostSchema;

export type PosSchema = z.infer<typeof blogPostSchema>;
