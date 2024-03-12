"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/buttonsmall";
import UploadPdfByUrl from "@/components/pdfAnalizer/ChatPdfdocUpload";
import { FileUpload } from "@/components/pdfAnalizer/Upload";
import Link from "next/link";
import { resourceLimits } from "worker_threads";
import { Bot, Save } from "lucide-react";
import openai from "@/lib/openai";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";

export const ResultItem = ({ result }: any) => {
  const [newData, setNewData] = useState<string>("");

  const updateToMongoDB = async () => {
    console.log(result);

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

  const openAI = async () => {
    try {
      const systemMessage: any = {
        role: "system",
        content:
          "Eres un asesor de tesis inteligente que crea documentos de tesis profesionales. Tus respuestas deben estar diseñadas para ser incluidas en el documento de tesis. Ademas usa adjetivos no comunes para que el documento sea muy original y no sea detectable por turnitin",
      };
      const userAssitantMessage: any = [
        {
          role: "user",
          content:
            "Crea una dedicatoria para mi tesis de grado por haber culminado la carrera",
        },
        {
          role: "assistant",
          content:
            "indicame cual es tu carrera profesional que terminaste para hacer la dedicatoria mas personalizada",
        },
      ];
      console.log("1111111111OPENAOAIAIIS");
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          stream: true,
          messages: [systemMessage, ...userAssitantMessage],
        }),
      });
      console.log("22222222OPENAOAIAIIS");

      const data = await response.json();
      console.log(data);
      console.log("333333333OPENAOAIAIIS");
    } catch (error) {
      console.error("Error sending chat message:", error);
      // setErrores("An error occurred.");
    }
  };

  return (
    <>
      <div>
        <div key={result?.title} className="flex text-xl">
          {result.title}
          <Button size="sm" className="m-3" onClick={() => openAI()}>
            <Bot size={20} />
          </Button>
          <Button size="sm" className="m-3 " onClick={() => updateToMongoDB()}>
            <Save size={20} />
          </Button>
        </div>
      </div>
      <div>
        <br />
      </div>

      <div key={result?.content} className="">
        {result.content}
      </div>
    </>
  );
};
