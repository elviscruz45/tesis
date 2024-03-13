import {
  createInfoSavedSchema,
  CreateInfoSavedSchema,
  updateInfoSavedSchema,
  deleteInfoSavedSchema,
} from "../../../lib/validation/savedInformacion";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import { getEmbedding } from "../../../lib/openai";
import { notesIndex } from "@/lib/db/pinecone";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parseResult = createInfoSavedSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }
    const { title, content, PDFlink, area, schema } = parseResult.data;
    const { userId } = auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // const embedding = await getEmbeddingForSectionDedicatoria(section, content);

    const InfoContent = await prisma.$transaction(async (tx: any) => {
      const InfoContent = await tx.infoSaved.create({
        data: {
          title,
          content,
          userId,
          PDFlink,
          area,
          schema,
        },
      });
      // await notesIndex.upsert([
      //   {
      //     id: sectionContent.id,
      //     values: embedding,
      //     metadata: { userId },
      //   },
      // ]);
      return InfoContent;
    });

    return Response.json({ InfoContent }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// export async function PUT(req: Request) {
//   try {
//     const body = await req.json();

//     const parseResult = updateInfoSavedSchema.safeParse(body);

//     if (!parseResult.success) {
//       console.error(parseResult.error);
//       return Response.json({ error: "Invalid input" }, { status: 400 });
//     }

//     const { id, title, content } = parseResult.data;

//     const sectionContent = await prisma.sectionContent.findUnique({
//       where: { id },
//     });

//     if (!sectionContent) {
//       return Response.json({ error: "Note not found" }, { status: 404 });
//     }

//     const { userId } = auth();

//     if (!userId || userId !== sectionContent.userId) {
//       return Response.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // const embedding = await getEmbeddingForSectionDedicatoria(section, content);

//     const updatedNote = await prisma.$transaction(async (tx: any) => {
//       const updatedNote = await tx.sectionContent.update({
//         where: { id },
//         data: {
//           title,
//           content,
//         },
//       });

//       // await notesIndex.upsert([
//       //   {
//       //     id,
//       //     values: embedding,
//       //     metadata: { userId },
//       //   },
//       // ]);

//       return updatedNote;
//     });

//     return Response.json({ updatedNote }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

// export async function DELETE(req: Request) {
//   try {
//     const body = await req.json();

//     const parseResult = deleteInfoSavedSchema.safeParse(body);

//     if (!parseResult.success) {
//       console.error(parseResult.error);
//       return Response.json({ error: "Invalid input" }, { status: 400 });
//     }

//     const { id } = parseResult.data;

//     const note = await prisma.note.findUnique({ where: { id } });

//     if (!note) {
//       return Response.json({ error: "Note not found" }, { status: 404 });
//     }

//     const { userId } = auth();

//     if (!userId || userId !== note.userId) {
//       return Response.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     await prisma.$transaction(async (tx: any) => {
//       await tx.note.delete({ where: { id } });
//       // await notesIndex.deleteOne(id);
//     });

//     return Response.json({ message: "Note deleted" }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: "Internal server error" }, { status: 500 });
//   }
// }
// // async function getEmbeddingForSectionDedicatoria(
// //   title: string,
// //   content: string | undefined,
// // ) {
// //   return getEmbedding(title + "\n\n" + content ?? "");
// // }
