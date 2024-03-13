import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/pdfAnalizer/Upload";
import UploadPdfByUrl from "./ChatPdfdocUpload";

export const ResultItem = ({ result }: any) => {
  const [isSaved, setIsSaved] = useState(false);
  const [urlPDF, setUrlPDF] = useState<string>("");
  const [savingAntecedentes, setSavingAntecedentes] = useState(false);
  const [savingMarcoTeorico, setSavingMarcoTeorico] = useState(false);
  const [schemaMarcoTeorico, setSchemaMarcoTeorico] = useState<any>(null);

  const saveToMongoDB = async (result: any, area: string) => {
    // if (area === "Antecedentes") {
    //   setSavingAntecedentes(true);
    // } else {
    //   setSavingMarcoTeorico(true);
    // }
    // try {
    //   const response = await fetch("/api/saveInformation", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       title: result?.title,
    //       content: result,
    //       PDFlink: urlPDF,
    //       area: area,
    //       schema: schemaMarcoTeorico,
    //     }),
    //   });
    //   if (!response.ok) throw new Error("Status Code" + response.status);
    //   if (area === "Antecedentes") {
    //     setSavingAntecedentes(false);
    //     setIsSaved(true);
    //   } else {
    //     setSavingMarcoTeorico(false);
    //     setIsSaved(true);
    //   }
    // } catch (error) {
    //   console.error(error);
    //   alert("Sucedio algo mal, por favor intente de nuevo.");
    // }
  };

  const goToSCIHUB = (doi: string) => {
    // window.location.href = `https://sci-hub.se/${doi}`;
    window.open(`https://sci-hub.se/${doi}`, "_blank");
  };
  const goToMendely = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <div key={result?.identifiers?.doi} className=" ">
      Titulo: {result.title}
      <br />
      DOI: {result?.identifiers?.doi}
      <br />
      Tipo: {result.type}
      <br />
      Recurso: {result.source}
      <br />
      Año:{result.year}
      <br />
      <a href={result.link} target="_blank" rel="noopener noreferrer">
        {result.link}
      </a>
      <div className="flex items-center justify-center space-x-4 self-center">
        <Button onClick={() => goToMendely(result?.link)}>
          Ver en Mendely
        </Button>
        <br />
        <br />
        <Button onClick={() => goToSCIHUB(result?.identifiers.doi)}>
          Ver en Sci-Hub
        </Button>
      </div>
      <br />
      <FileUpload analizar={false} resumir={false} setUrlPDF={setUrlPDF} />
      {urlPDF && (
        <UploadPdfByUrl
          url={urlPDF}
          analizar={true}
          resumir={true}
          prompts={{
            titulo:
              "Como se divide este documento , puedes enumerar las secciones, subsecciones de manera detallada y traducirlas al español?",
            resumen: "",
            referencias: "",
            datosAutores: "",
          }}
          setSchemaMarcoTeorico={setSchemaMarcoTeorico}
        />
      )}
      <div className="flex items-center justify-center space-x-4 self-center">
        {urlPDF && (
          <Button
            onClick={() => {
              saveToMongoDB(result, "Marco_Teorico");
            }}
            disabled={savingMarcoTeorico || isSaved}
          >
            {isSaved
              ? "Guardado en la Nube"
              : savingMarcoTeorico
                ? "Guardando..."
                : "Guardar en Marco Teorico"}
          </Button>
        )}
      </div>
      <br />
    </div>
  );
};
