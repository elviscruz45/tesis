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
  console.log("POST Activated");

  try {
    const body = await req.json();
    const parseResult = createInfoSavedSchema.safeParse(body);

    if (!parseResult.success) {
      console.error(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }
    const { title, content, PDFlink } = parseResult.data;
    const { userId } = auth();
    console.log("POST222222");

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log("POST333333");

    // const embedding = await getEmbeddingForSectionDedicatoria(section, content);

    const InfoContent = await prisma.$transaction(async (tx: any) => {
      console.log("POST333333", title, content, userId, PDFlink);
      const InfoContent = await tx.infoSaved.create({
        data: {
          title,
          content,
          userId,
          PDFlink,
        },
      });
      console.log("POST444444");
      // await notesIndex.upsert([
      //   {
      //     id: sectionContent.id,
      //     values: embedding,
      //     metadata: { userId },
      //   },
      // ]);
      return InfoContent;
    });
    console.log("POST555555");

    return Response.json({ InfoContent }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// export async function PUT(req: Request) {
//   try {
//     const body = await req.json();
//     console.log("PUTBODY", body);

//     const parseResult = updateInfoSavedSchema.safeParse(body);
//     // console.log("PUT111111", parseResult);

//     if (!parseResult.success) {
//       console.error(parseResult.error);
//       return Response.json({ error: "Invalid input" }, { status: 400 });
//     }

//     const { id, title, content } = parseResult.data;
//     console.log("PUTaaaaa", title);

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
