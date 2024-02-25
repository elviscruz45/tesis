// import { auth } from "./../firebase";
import { z } from "zod";

export const createInfoSavedSchema = z.object({
  //   id: z.string(),
  title: z.string().min(1, { message: "id must be at least 1 character long" }),
  content: z
    .object({
      link: z.string().optional(),
      // authors: z
      //   .array(
      //     z.object({
      //       first_name: z.string().optional(),
      //       last_name: z.string().optional(),
      //     }),
      //   )
      //   .optional(),

      identifiers: z
        .object({
          doi: z.string().optional(),
        })
        .optional(),
      source: z.string().optional(),
      type: z.string().optional(),
      year: z.number().optional(),
    })
    .optional(),
  PDFlink: z.string().optional(),
});

export type CreateInfoSavedSchema = z.infer<typeof createInfoSavedSchema>;

export const updateInfoSavedSchema = createInfoSavedSchema.extend({
  id: z.string().min(1),
});

export const deleteInfoSavedSchema = z.object({
  id: z.string().min(1),
});
