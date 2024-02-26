"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import UploadPdfByUrl from "@/components/pdfAnalizer/ChatPdfdocUpload";
import { FileUpload } from "@/components/pdfAnalizer/Upload";
import Link from "next/link";
const prompts = {
  titulo: "¿Cuál es el título del artículo, traducelo al español",
  resumen:
    "Con la maxima cantidad de palabras que puedas usar, crea subtitulos de cada seccion, menos la seccion de referencias. Luego resume cada sección, incluye referencias de otros autores que estan en las referencias del libro. Incluye cifras si es que las hay",

  referencias:
    "De esta lista de referencias, indica cuáles has mencionado en este texto. (dame toda la información, no solo los autores)  ",
  datosAutores:
    "Ahora quiero que me indiques los datos de esta investigación: DOI, autores (en esta forma, apellido, nombre: Pérez, G.) , revista, volumen, número, páginas. (SOLO ESOS DATOS) ",
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
    <div key={result?.content?.identifiers?.doi} className=" ">
      Titulo: {result.title}
      <br />
      Revista: {result?.content?.source}
      <br />
      doi: {result?.content?.identifiers?.doi}
      <br />
      tipo: {result?.content?.type}
      <br />
      año: {result?.content?.year}
      <br />
      PDF:
      {result?.PDFlink && (
        <>
          <Link
            href={result?.PDFlink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="m-3  gap-1">Open PDF</Button>
          </Link>
          <br />

          <UploadPdfByUrl
            url={result?.PDFlink}
            analizar={true}
            resumir={true}
            prompts={prompts}
          />
        </>
      )}
      {/* <a href={result?.content?.link} target="_blank" rel="noopener noreferrer">
        {result?.content?.link}
      </a> */}
      <br />
      {/* <div>{`https://sci-hub.se/${result?.content?.identifiers?.doi}`}</div> */}
      <br />
      {/* {result?.content?.identifiers?.doi && <FileUpload />} */}
      <div>
        -----------------------------------------------------------------------------------------
        <br />
        -----------------------------------------------------------------------------------------
        <br />
        -----------------------------------------------------------------------------------------
      </div>
      <br />
    </div>
  );
};
