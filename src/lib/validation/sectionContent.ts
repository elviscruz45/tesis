import { z } from "zod";

export const createContentSchema = z.object({
  //   id: z.string(),
  title: z.string().min(1, { message: "id must be at least 1 character long" }),
  title2: z.string().optional(),

  title3: z.string().optional(),
  title4: z.string().optional(),
  Nivel: z.string().optional(),
  section: z.string().optional(),
  area: z.string().optional(),
  content: z.string().min(1, { message: "Debe contener al menos 1 letra" }),
  // palabrasClave: z
  //   .string()
  //   .min(1, { message: "id must be at least 1 character long" }),
  // palabrasClave: z.string().optional(),
  //   createdAt: z.string(),
  //   updatedAt: z.string(),
});

export type CreateContentSchema = z.infer<typeof createContentSchema>;

export const updateContentSchema = createContentSchema.extend({
  id: z.string().min(1),
});

export const deleteContentSchema = z.object({
  id: z.string().min(1),
});
