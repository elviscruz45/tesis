import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import { ResultItem } from "./Item";
import { ChatGPTPreguntas } from "./ChatGPTPreguntas";
import { ChatGPTObjectivo } from "./ChatGPTObjetivo";
import { ChatGPTHipotesis } from "./ChatGPTHipotesis";

interface RetriveInformacion {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  contentData?: any;
  sectionName?: any;
  titulo?: any;
}

export default async function RetrivePreguntasObjetivoHipotesis({
  open,
  setOpen,
  contentData,
  sectionName,
}: RetriveInformacion) {
  const { userId } = auth();
  if (!userId) throw new Error("You must be logged in to view this page");

  const titulo = await prisma.note.findFirst({
    where: {
      userId,
      title2: "titulo",
      Nivel: "0",
    },
  });
  const poblacion = await prisma.note.findFirst({
    where: {
      userId,
      title2: "poblacion",
      Nivel: "0",
    },
  });
  const preguntaGeneralEspecifica = await prisma.sectionContent.findFirst({
    where: {
      userId,
      title4: "preguntas_de_investigacion",
      Nivel: "5",
    },
  });
  // console.log("preguntaGeneralEspecifica", preguntaGeneralEspecifica?.content);

  const objetivos = await prisma.sectionContent.findFirst({
    where: {
      userId,
      title4: "objetivos_del_proyecto",
      Nivel: "5",
    },
  });
  return (
    <>
      <div className="items-center justify-center rounded-md  bg-slate-300 p-6 text-gray-900 shadow-md ">
        <div className="items-center justify-center">
          Contexto de estudio: {titulo?.title} en {poblacion?.title}
        </div>
      </div>
      <br />
      <ChatGPTPreguntas
        titulo={titulo?.title}
        poblacion={poblacion?.title}
        userId={userId}
        seccion={"Preguntas de Investigacion"}
      />
      <ChatGPTObjectivo
        titulo={titulo?.title}
        poblacion={poblacion?.title}
        userId={userId}
        seccion={"Objetivos del Proyecto"}
        preguntaGeneralEspecifica={preguntaGeneralEspecifica?.content}
      />
      <ChatGPTHipotesis
        titulo={titulo?.title}
        poblacion={poblacion?.title}
        userId={userId}
        seccion={"Desarrollo de la Hipotesis"}
        preguntaGeneralEspecifica={preguntaGeneralEspecifica?.content}
        objetivos={objetivos?.content}
      />
    </>
  );
}
