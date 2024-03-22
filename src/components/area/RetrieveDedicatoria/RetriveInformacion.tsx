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

export default async function RetriveDedicatoria({
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
      title4: "dedicatoria",
      Nivel: "4",
    },
  });

  return (
    <>
      <div className="items-center justify-center rounded-md  bg-slate-300 p-6 text-gray-900 shadow-md ">
        <div className="items-center justify-center">Titulo: {titulo}</div>
      </div>
      <br />
      <ChatGPT titulo={titulo} />
      {/* {allInfo.map((result: any, index) => (
        <div className="mb-4 rounded-lg border-2 border-gray-300 p-6  shadow-md">
          <ResultItem
            key={result?.identifiers?.doi}
            result={result}
            allInfo={allInfo}
            index={index}
            titulo={titulo}
          />
        </div>
      ))} */}
    </>
  );
}
