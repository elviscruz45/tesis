import {
  createContentSchema,
  CreateContentSchema,
  updateContentSchema,
  deleteContentSchema,
} from "../../../lib/validation/sectionContent";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import { getEmbedding } from "../../../lib/openai";
import { notesIndex } from "@/lib/db/pinecone";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);

  return Response.json({ success: true });
}

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const parseResult = createContentSchema.safeParse(body);

//     if (!parseResult.success) {
//       console.error(parseResult.error);
//       return Response.json({ error: "Invalid input" }, { status: 400 });
//     }
//     const { section, content, title, area, title4, Nivel } = parseResult.data;
//     const { userId } = auth();

//     if (!userId) {
//       return Response.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // const embedding = await getEmbeddingForSectionDedicatoria(
//     //   section || "",
//     //   content,
//     // );

//     const sectionContent = await prisma.$transaction(async (tx: any) => {
//       const sectionContent = await tx.sectionContent.create({
//         data: {
//           section,
//           content,
//           userId,
//           title,
//           title4,
//           Nivel,
//           area,
//         },
//       });

//       // await notesIndex.upsert([
//       //   {
//       //     id: sectionContent.id,
//       //     values: embedding,
//       //     metadata: { userId },
//       //   },
//       // ]);
//       return sectionContent;
//     });

//     return Response.json({ sectionContent }, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

// export async function PUT(req: Request) {
//   try {
//     const body = await req.json();

//     const parseResult = updateContentSchema.safeParse(body);

//     if (!parseResult.success) {
//       console.error(parseResult.error);
//       return Response.json({ error: "Invalid input" }, { status: 400 });
//     }

//     const { id, Nivel, title, content } = parseResult.data;

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

//     // const embedding = await getEmbeddingForSectionDedicatoria(
//     //   section || "",
//     //   content,
//     // );

//     const updatedNote = await prisma.$transaction(async (tx: any) => {
//       const updatedNote = await tx.sectionContent.update({
//         where: { id },
//         data: {
//           Nivel,
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

//     const parseResult = deleteContentSchema.safeParse(body);

//     if (!parseResult.success) {
//       console.error(parseResult.error);
//       return Response.json({ error: "Invalid input" }, { status: 400 });
//     }

//     const { id } = parseResult.data;

//     const note = await prisma.sectionContent.findUnique({ where: { id } });

//     if (!note) {
//       return Response.json({ error: "Note not found" }, { status: 404 });
//     }

//     const { userId } = auth();

//     if (!userId || userId !== note.userId) {
//       return Response.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     await prisma.$transaction(async (tx: any) => {
//       await tx.sectionContent.delete({ where: { id } });
//       // await notesIndex.deleteOne(id);
//     });

//     return Response.json({ message: "Note deleted" }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: "Internal server error" }, { status: 500 });
//   }
// }
// async function getEmbeddingForSectionDedicatoria(
//   title: string,
//   content: string | undefined,
// ) {
//   return getEmbedding(title + "\n\n" + content ?? "");
// }
