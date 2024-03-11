"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import UploadPdfByUrl from "@/components/pdfAnalizer/ChatPdfdocUpload";
import { FileUpload } from "@/components/pdfAnalizer/Upload";
import Link from "next/link";
const prompts = {
  titulo: "¿Cuál es el título del artículo, traducelo al español",
  resumen:
    "Con 500 palabras,  crea subtitulos de cada seccion, menos la seccion de referencias. Luego resume cada sección, incluye referencias de otros autores que estan en las referencias del libro. Incluye cifras si es que las hay",

  referencias:
    "De esta lista de referencias, indica cuáles has mencionado en este texto. (dame toda la información, no solo los autores)  ",
  datosAutores:
    "De este PDF, indicame los autores  apellidos, nombre, revista, volumen de la revista, el numero de la ultima pagina. ",
};

export const ResultItem = ({ result }: any) => {
  // const goToSCIHUB = (doi: string) => {
  //   // window.location.href = `https://sci-hub.se/${doi}`;
  //   window.open(`https://sci-hub.se/${doi}`, "_blank");
  // };
  // const goToMendely = (link: string) => {
  //   window.open(link, "_blank");
  // };

  return (
    <>
      <div>
        <br />
      </div>
      <div key={result?.title} className="text-xl">
        {result.title}
      </div>
      <div key={result?.content} className="">
        {result.content}
      </div>
    </>
  );
};
