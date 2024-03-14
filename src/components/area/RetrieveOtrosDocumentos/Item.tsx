"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/buttonsmall";
import { FileUpload } from "@/components/pdfAnalizer/Upload";
import Link from "next/link";
import { resourceLimits } from "worker_threads";
import { Bot, Save } from "lucide-react";
import axios from "axios";
import { Input } from "../../ui/input";
import ChatWithPdf from "./ChatPDF";

export const ResultItem = ({ result, index, categoryList }: any) => {
  const [sourceId, setSourceId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customizedPrompt, setCustomizedPrompt] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    // const prueba =
    //   "https://link.springer.com/content/pdf/10.1007/s00445-019-1336-3.pdf";

    try {
      const response = await axios.post(
        "https://api.chatpdf.com/v1/sources/add-url",
        { url: result?.PDFlink },

        {
          headers: {
            "x-api-key": "sec_CGNMZENbOBE46FZvWlGfmGCLoqy9vgiI", // Replace with your actual API key
            "Content-Type": "application/json",
          },
        },
      );

      setSourceId(response.data.sourceId);
    } catch (error: any) {
      setError(error.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <br />
      </div>

      <div key={result?.content} className="">
        <a href={result.PDFlink} target="_blank" rel="noopener noreferrer">
          {index}. {result.title}
        </a>
        <div>- Tipo: {result.content.type}</div>
        <div>- Source: {result.content.source}</div>
      </div>
      <br />

      <Button onClick={(e) => handleSubmit(e)} disabled={!!sourceId}>
        {isLoading
          ? "Uploading..."
          : !!sourceId
            ? "Analisis Completado"
            : "Analizar"}
      </Button>
      <br />
      <br />

      {sourceId && (
        <>
          <Input
            type="text"
            id="message"
            placeholder="Pregunta sobre el Archivo..."
            value={customizedPrompt}
            onChange={(e) => setCustomizedPrompt(e.target.value)}
          />
          {customizedPrompt.length > 0 && (
            <ChatWithPdf
              sourceId={sourceId}
              prompt={customizedPrompt}
              categoryList={categoryList}
            />
          )}{" "}
        </>
      )}
      <br />
      <br />
      <br />
      <div className="dark my-4 border-b border-gray-100 pb-4" />
    </>
  );
};
