import { z } from "zod";

export const createNoteSchema = z.object({
  //   id: z.string(),
  title: z.string().min(1, { message: "id must be at least 1 character long" }),
  title2: z
    .string()
    .min(1, { message: "id must be at least 1 character long" })
    .optional(),

  title3: z
    .string()
    .min(1, { message: "id must be at least 1 character long" })
    .optional(),
  Nivel: z.string().optional(),

  content: z.string().optional(),
  userId: z.string().optional(),

  //   createdAt: z.string(),
  //   updatedAt: z.string(),
});

export type CreateNoteSchema = z.infer<typeof createNoteSchema>;

export const updateNoteSchema = createNoteSchema.extend({
  id: z.string().min(1),
});

export const deleteNoteSchema = z.object({
  id: z.string().min(1),
});
