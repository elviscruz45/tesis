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

    // const response = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   // stream: true,
    //   messages: [systemMessage, ...messagesTruncated],
    // });

    const completion = await openai.chat.completions.create({
      messages: [systemMessage, ...userAssitantMessage, ...messagesTruncated],
      model: "gpt-3.5-turbo",
    });

    const content = completion.choices[0].message.content;
    // if (content === null) {
    //   throw new Error("Content is null");
    // }
    // const stream = OpenAIStream(content);

    // const stream = OpenAIStream(completion.choices[0].message.content);

    // return new StreamingTextResponse(stream);

    return new Response(JSON.stringify(content), { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
