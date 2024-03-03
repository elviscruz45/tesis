import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/pdfAnalizer/Upload";

export const ResultItem = ({ result }: any) => {
  const [isSaved, setIsSaved] = useState(false);
  const [urlPDF, setUrlPDF] = useState<string>("");

  const saveToMongoDB = async (result: any) => {
    console.log(result);
    try {
      console.log("onsave111");
      const response = await fetch("/api/saveInformation", {
        method: "POST",
        body: JSON.stringify({
          title: result?.title,
          content: result,
          PDFlink: urlPDF,
        }),
      });
      if (!response.ok) throw new Error("Status Code" + response.status);
    } catch (error) {
      console.error(error);
      alert("Sucedio algo mal, por favor intente de nuevo.");
    }
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
      <div className="flex items-center justify-center space-x-4 self-center">
        {urlPDF && (
          <Button
            onClick={() => {
              saveToMongoDB(result);
              setIsSaved(true);
            }}
            disabled={isSaved}
          >
            {isSaved ? "Guardando..." : "Guardar en Antecedentes"}
          </Button>
        )}
        {urlPDF && (
          <Button
            onClick={() => {
              saveToMongoDB(result);
              setIsSaved(true);
            }}
            disabled={isSaved}
          >
            {isSaved ? "Guardando..." : "Guardar en Marco Teorico"}
          </Button>
        )}
      </div>
      <br />
    </div>
  );
};
