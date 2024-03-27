import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import { ResultItem } from "./Item";
import { ChatGPTDedicatoria } from "./ChatGPTDedicatoria";
import { ChatGPTAgradecimiento } from "./ChatGPTAgradecimiento";

interface RetrieveInformacion {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  contentData?: any;
  sectionName?: any;
  titulo?: any;
}

export default async function RetrieveDedicatoriaAgradecimiento({
  open,
  setOpen,
  contentData,
  sectionName,
}: RetrieveInformacion) {
  const { userId } = auth();
  if (!userId) throw new Error("You must be logged in to view this page");

  // const allInfo = await prisma.sectionContent.findMany({
  //   where: {
  //     userId,
  //     title4: "dedicatoria",
  //     Nivel: "5",
  //   },
  // });
  // const result = allInfo[allInfo.length - 1];
  const titulo = await prisma.note.findFirst({
    where: {
      userId,
      title2: "titulo",
      Nivel: "0",
    },
  });

  return (
    <>
      <div className="items-center justify-center rounded-md  bg-slate-300 p-6 text-gray-900 shadow-md ">
        <div className="items-center justify-center">
          Tesis: {titulo?.title}
        </div>
      </div>
      <br />
      <ChatGPTDedicatoria
        titulo={titulo?.title}
        userId={userId}
        seccion={"Dedicatoria"}
      />
      <ChatGPTAgradecimiento
        titulo={titulo?.title}
        userId={userId}
        seccion={"Agradecimientos"}
      />
    </>
  );
}
