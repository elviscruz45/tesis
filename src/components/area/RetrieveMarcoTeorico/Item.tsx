"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/buttonsmall";
import UploadPdfByUrl from "@/components/pdfAnalizer/ChatPdfdocUpload";
import { FileUpload } from "@/components/pdfAnalizer/Upload";
import Link from "next/link";
import { resourceLimits } from "worker_threads";
import { Bot, Save } from "lucide-react";

export const ResultItem = ({ result }: any) => {
  const updateToMongoDB = async (result: any, area: string) => {
    console.log(result);

    // if (area === "Antecedentes") {
    //   setSavingAntecedentes(true);
    // } else {
    //   setSavingMarcoTeorico(true);
    // }
    // try {
    //   console.log("onsave111");
    //   const response = await fetch("/api/saveInformation", {
    //     method: "PUT",
    //     body: JSON.stringify({
    //       title: result?.title,
    //       content: result,
    //       PDFlink: urlPDF,
    //       area: area,
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
