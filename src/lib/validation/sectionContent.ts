import { z } from "zod";

export const createDedicatoriaSchema = z.object({
  //   id: z.string(),
  title: z.string().min(1, { message: "id must be at least 1 character long" }),

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

export type CreateDedicatoriaSchema = z.infer<typeof createDedicatoriaSchema>;

export const updateDedicatoriaSchema = createDedicatoriaSchema.extend({
  id: z.string().min(1),
});

export const deleteDedicatoriaSchema = z.object({
  id: z.string().min(1),
});
