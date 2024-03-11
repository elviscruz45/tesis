import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import { ResultItem } from "./Item";
import OtrosDocumentos from "./Informacion";

interface RetriveInformacion {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  contentData?: any;
  sectionName?: any;
}

export default async function RetriveInformacionOtrosDocumentos({
  open,
  setOpen,
  contentData,
  sectionName,
}: RetriveInformacion) {
  // const [deleteInProgress, setDeleteInProgress] = useState(false);

  const { userId } = auth();
  if (!userId) throw new Error("You must be logged in to view this page");

  const allInfo = await prisma.infoSaved.findMany({
    where: {
      userId,
      // section: "marco_teorico",
    },
  });
  console.log("allInfo", allInfo);

  return (
    <>
      {allInfo.map((result: any, index) => (
        <ResultItem
          key={result?.identifiers?.doi}
          result={result}
          index={index}
        />
      ))}
    </>
  );
}
