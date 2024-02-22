import { notesIndex } from "@/lib/db/pinecone";
import prisma from "@/lib/db/prisma";
import openai, { getEmbedding } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { ChatCompletionMessage } from "openai/resources/index.mjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: ChatCompletionMessage[] = body.messages;

    const messagesTruncated = messages.slice(-2);

    const embedding = await getEmbedding(
      messagesTruncated.map((message) => message.content).join("\n"),
    );

    const { userId } = auth();

    const vectorQueryResponse = await notesIndex.query({
      vector: embedding,
      topK: 5,
      filter: { userId },
    });

    const relevantNotes = await prisma.note.findMany({
      where: {
        id: {
          in: vectorQueryResponse.matches.map((match) => match.id),
        },
      },
    });

    const systemMessage: any = {
      role: "system",
      content:
        "Eres un asesor de tesis inteligente que crea documentos de tesis profesionales. Tus respuestas deben estar diseñadas para ser incluidas en el documento de tesis. Ademas usa adjetivos no comunes para que el documento sea muy original y no sea detectable por turnitin",
    };

    const userAssitantMessage: any = [
      {
        role: "user",
        content:
          "Crea una dedicatoria para mi tesis de grado por haber culminado la carrera",
      },
      {
        role: "assistant",
        content:
          "indicame cual es tu carrera profesional que terminaste para hacer la dedicatoria mas personalizada",
      },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [systemMessage, ...userAssitantMessage, ...messagesTruncated],
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const messages: ChatCompletionMessage[] = body.messages;

//     const messagesTruncated = messages.slice(-6);

//     const embedding = await getEmbedding(
//       messagesTruncated.map((message) => message.content).join("\n"),
//     );

//     const { userId } = auth();

//     const vectorQueryResponse = await notesIndex.query({
//       vector: embedding,
//       topK: 4,
//       filter: { userId },
//     });

//     const relevantNotes = await prisma.note.findMany({
//       where: {
//         id: {
//           in: vectorQueryResponse.matches.map((match) => match.id),
//         },
//       },
//     });

//     console.log("Relevant notes found: ", relevantNotes);

//     const systemMessage: ChatCompletionMessage = {
//       role: "system",
//       content:
//         "You are an intelligent note-taking app. You answer the user's question based on their existing notes. " +
//         "The relevant notes for this query are:\n" +
//         relevantNotes
//           .map((note) => `Title: ${note.title}\n\nContent:\n${note.content}`)
//           .join("\n\n"),
//     };

// const response = await openai.chat.completions.create({
//   model: "gpt-3.5-turbo",
//   stream: true,
//   messages: [systemMessage, ...messagesTruncated],
// });

// const stream = OpenAIStream(response);
// return new StreamingTextResponse(stream);
//   } catch (error) {
//     console.error(error);
//     return Response.json({ error: "Internal server error" }, { status: 500 });
//   }
// }
