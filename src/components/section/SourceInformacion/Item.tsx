"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import UploadPdfByUrl from "@/components/pdfAnalizer/ChatPdfdocUpload";
import { FileUpload } from "@/components/pdfAnalizer/Upload";
import Link from "next/link";

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
      DOI: {result?.content?.identifiers?.doi}
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
