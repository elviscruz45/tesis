import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import { ResultItem } from "./Item";

interface RetriveInformacion {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  contentData?: any;
  sectionName?: any;
}

export default async function RetriveInformacion({
  open,
  setOpen,
  contentData,
  sectionName,
}: RetriveInformacion) {
  const { userId } = auth();
  if (!userId) throw new Error("You must be logged in to view this page");

  const allInfo = await prisma.sectionContent.findMany({
    where: {
      userId,
      title4: "informacion_guardada_antecedentes",
      Nivel: "4",
    },
  });

  return (
    <>
      {allInfo.map((result: any, index) => (
        <ResultItem
          key={result?.identifiers?.doi}
          result={result}
          allInfo={allInfo}
          index={index}
        />
      ))}
    </>
  );
}
