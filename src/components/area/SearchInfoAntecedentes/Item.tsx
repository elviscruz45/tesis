import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/pdfAnalizer/Upload";
import UploadPdfByUrl from "./ChatPdfdocUpload";

export const ResultItem = ({ result }: any) => {
  const [isSaved, setIsSaved] = useState(false);
  const [urlPDF, setUrlPDF] = useState<string>("");
  const [savingAntecedentes, setSavingAntecedentes] = useState(false);
  const [savingMarcoTeorico, setSavingMarcoTeorico] = useState(false);
  const [contentData, setContentData] = useState<string>("");

  const saveToMongoDB = async () => {
    // const area = "antecedentes";
    // try {
    //   const response = await fetch("/api/section", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       title: "Antecedentes",
    //       content: contentData,
    //       section: "antecedentes",
    //       area: area,
    //     }),
    //   });
    //   if (!response.ok) throw new Error("Status Code" + response.status);
    // } catch (error) {
    //   console.error(error);
    //   alert("Sucedio algo mal, por favor intente de nuevo.");
    // }
  };

  const goToSCIHUB = (doi: string) => {
    window.open(`https://sci-hub.se/${doi}`, "_blank");
  };
  const goToMendely = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <div
      key={result?.identifiers?.doi}
      className=" mb-4 rounded-lg border border-gray-300 p-6  shadow-md "
    >
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
      <FileUpload
        analizar={false}
        resumir={false}
        setUrlPDF={setUrlPDF}
        result={result}
      />
      {urlPDF && (
        <UploadPdfByUrl
          url={urlPDF}
          analizar={true}
          resumir={true}
          setContentData={setContentData}
          prompts={{
            titulo:
              "Enumerar las secciones y subsecciones de manera detallada y traducirlas al español?",
            resumen: "",
            // "Este texto es para una tesis cientifica , por lo que con 500 palabras crea subtitulos de cada seccion, menos la seccion de referencias. Luego resume cada sección, incluye referencias de otros autores que estan en las referencias del libro. Incluye cifras si es que las hay",

            referencias: "",
            // "De esta lista de referencias, indica cuáles has mencionado en este texto. (dame toda la información, no solo los autores)  ",
            datosAutores: "",
            // "De este PDF, indicame los autores  apellidos, nombre, revista, volumen de la revista, el numero de la ultima pagina. ",
          }}
          // setSchemaMarcoTeorico={setSchemaMarcoTeorico}
        />
      )}
      <div className="flex items-center justify-center space-x-4 self-center">
        {/* {urlPDF && (
          <Button
            onClick={() => {
              saveToMongoDB();
            }}
            disabled={savingAntecedentes || isSaved}
          >
            {isSaved
              ? "Guardado en la Nube"
              : savingAntecedentes
                ? "Guardando..."
                : "Guardar en Antecedentes"}
          </Button>
        )} */}
      </div>
      <br />
    </div>
  );
};
