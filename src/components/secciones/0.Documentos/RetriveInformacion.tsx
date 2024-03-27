import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import { ResultItem } from "./Item";
import OtrosDocumentos from "./Informacion";
import { FileUpload } from "@/components/pdfAnalizer/Upload";
// import React, { useState } from "react";

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
  // const [urlPDF, setUrlPDF] = useState<string>("");

  const { userId } = auth();
  if (!userId) throw new Error("You must be logged in to view this page");

  const allDocuments = await prisma.infoSaved.findMany({
    where: {
      userId,
      // section: "marco_teorico",
    },
  });

  const categoryList = await prisma.note.findMany({
    where: {
      userId,
      Nivel: "3",
      // section: "marco_teorico",
    },
  });

  return (
    <>
      {allDocuments.map((result: any, index) => (
        <ResultItem
          key={result?.identifiers?.doi}
          result={result}
          index={index}
          categoryList={categoryList}
        />
      ))}
      <FileUpload
        analizar={false}
        resumir={false}
        // setUrlPDF={setUrlPDF}
        // result={result}
      />
    </>
  );
}
