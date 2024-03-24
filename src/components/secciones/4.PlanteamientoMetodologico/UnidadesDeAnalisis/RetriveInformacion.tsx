import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import { ResultItem } from "./Item";
import { ChatGPT } from "./ChatGPT";

interface RetriveInformacion {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  contentData?: any;
  sectionName?: any;
  titulo?: any;
}

export default async function RetriveUnidadesDeAnalisis({
  open,
  setOpen,
  contentData,
  sectionName,
  titulo,
}: RetriveInformacion) {
  const { userId } = auth();
  if (!userId) throw new Error("You must be logged in to view this page");

  const allInfo = await prisma.sectionContent.findMany({
    where: {
      userId,
      title4: "unidadesDeAnalisis",
      Nivel: "5",
    },
  });
  const result = allInfo[allInfo.length - 1];

  return (
    <>
      <div className="items-center justify-center rounded-md  bg-slate-300 p-6 text-gray-900 shadow-md ">
        <div className="items-center justify-center">Titulo: {titulo}</div>
      </div>
      <br />
      <ChatGPT titulo={titulo} result={result} userId={userId} />
    </>
  );
}
