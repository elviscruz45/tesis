"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/buttonsmall";
import UploadPdfByUrl from "@/components/pdfAnalizer/ChatPdfdocUpload";
import { FileUpload } from "@/components/pdfAnalizer/Upload";
import Link from "next/link";
import { resourceLimits } from "worker_threads";
import {
  Bot,
  Save,
  NotebookPen,
  Brain,
  Undo2,
  FileCode,
  SendHorizontal,
} from "lucide-react";
import openai from "@/lib/openai";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { useRouter } from "next/navigation";
import AddEditNoteDialogNivel4 from "@/components/AddEditNoteDialogNivel4";
import { Input } from "@/components/ui/input";
export const ResultItem = ({ result }: any) => {
  const [newData, setNewData] = useState<string>("");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [newQuery, setNewQuery] = useState(false);
  const [text, setText] = useState("");

  const router = useRouter();

  const edit = async () => {
    setShowEditDialog(true);
  };

  const parafrasear = async () => {
    try {
      const systemMessage: any = {
        role: "system",
        content:
          "Eres un especialista en crear tesis para graduados profesionales. Tus respuestas deben estar diseñadas para ser incluidas en el documento de tesis. Usa adjetivos no comunes para que el texto sea original , tener muy en cuenta que el texto no debe ser detectable por turnitin",
      };
      const userAssitantMessage: any = [
        {
          role: "user",
          content: `Mejora, parafrasea y añade mas informacion para que sea mas original y no sea detectable por turnitin sobre el siguiente texto: ${result?.content}`,
        },
      ];

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

      const data = await response.json();
      console.log(data);

      setNewData(data);
    } catch (error) {
      console.error("Error sending chat message:", error);
      // setErrores("An error occurred.");
    }
  };

  const mostrarConsultarGPT = async () => {
    setNewQuery((item) => !item);
  };

  const estandarizar = async () => {};

  const guardar = async () => {
    console.log("result", result);
    try {
      const response = await fetch("/api/section", {
        method: "PUT",
        body: JSON.stringify({
          id: result.id,
          title: result?.title,
          content: newData,
          Nivel: "4",
          // PDFlink: urlPDF,
          // area: area,
        }),
      });
      if (!response.ok) throw new Error("Status Code" + response.status);
      // if (area === "Antecedentes") {
      //   setSavingAntecedentes(false);
      //   setIsSaved(true);
      // } else {
      //   setSavingMarcoTeorico(false);
      //   setIsSaved(true);
      // }
      router.refresh();
      setNewData("");
      setNewQuery(false);
    } catch (error) {
      console.error(error);
      alert("Sucedio algo mal, por favor intente de nuevo.");
    }
  };

  const regresar = async () => {
    console.log("regresar");
    setNewData("");
  };
  const consultarGPT = async () => {
    try {
      const systemMessage: any = {
        role: "system",
        content: `Tienes el siguiente texto:${result?.content} . Eres un especialista en crear tesis para graduados profesionales. Tus respuestas deben estar diseñadas para ser incluidas en el documento de tesis. Usa adjetivos no comunes para que el texto sea original , tener muy en cuenta que el texto no debe ser detectable por turnitin, `,
      };
      const userAssitantMessage: any = [
        {
          role: "user",
          content: `${text}`,
        },
        // {
        //   role: "assistant",
        //   content:
        //     "indicame cual es tu carrera profesional que terminaste para hacer la dedicatoria mas personalizada",
        // },
      ];

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

      const data = await response.json();
      console.log(data);
      setNewData(data);
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
          <Button size="sm" className="m-3" onClick={() => edit()}>
            <NotebookPen size={20} />
          </Button>
          <Button size="sm" className="m-3" onClick={() => parafrasear()}>
            <Bot size={20} />
          </Button>
          <Button
            size="sm"
            className="m-3"
            onClick={() => mostrarConsultarGPT()}
          >
            <FileCode size={20} />
          </Button>
          <Button size="sm" className="m-3" onClick={() => estandarizar()}>
            <Brain size={20} />
          </Button>

          <Button size="sm" className="m-3 " onClick={() => guardar()}>
            <Save size={20} />
          </Button>
          <Button size="sm" className="m-3 " onClick={() => regresar()}>
            <Undo2 size={20} />
          </Button>
        </div>
      </div>
      <div>
        <br />
      </div>
      {newData && <div className="text-red-500">Version Original</div>}
      <div key={result?.content} className="">
        {result.content}
      </div>
      <br />
      <br />
      {newQuery && (
        <div className="flex items-start text-xl">
          <Input
            // value={input}
            onChange={(e: any) => setText(e.target.value)}
            placeholder="Consultar..."
            // ref={inputRef}
          />
          <Button size="sm" className="m-3 " onClick={() => consultarGPT()}>
            <SendHorizontal size={20} />
          </Button>
        </div>
      )}

      {newData && (
        <>
          <div className="text-green-500"> Nueva Version</div>
          <div className="">{newData}</div>
        </>
      )}
      <br />
      <br />
      <AddEditNoteDialogNivel4
        open={showEditDialog}
        setOpen={setShowEditDialog}
        noteToEdit={result}
      />
    </>
  );
};
