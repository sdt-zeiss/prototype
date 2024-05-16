import z from "zod";

export const authSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  // well this is certainly a unique way to handle a boolean, but I don't know how to make it work with forms and typescript at the same time
  signup: z.enum(["true", "false"]),
});

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const postSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title cannot be empty"),
  content: z
    .string({ required_error: "Content is required" })
    .min(1, "Content cannot be empty"),
  image: (typeof window === "undefined" ? z.any() : z.instanceof(FileList))
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    )
    .optional(),
  imageDataUrl: z.string().optional(),
  type: z.enum(["Question", "Discussion", "Story"]),
});

export const commentSchema = z.object({
  content: z
    .string({ required_error: "Comment is required" })
    .min(1, "Comment cannot be empty"),
});

export const onboardingSchema = z.object({
  ageRange: z.string({ required_error: "Age range is required" }),
  profession: z.string({ required_error: "Profession is required" }),
});
