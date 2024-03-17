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
  DatabaseBackup,
} from "lucide-react";
import openai from "@/lib/openai";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { useRouter } from "next/navigation";
import AddEditNoteDialogNivel4 from "@/components/AddEditNoteDialogNivel4";
import { Input } from "@/components/ui/input";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";

export const ResultItem = ({ result, allInfo, index }: any) => {
  const [newData, setNewData] = useState<string>("");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [newQuery, setNewQuery] = useState(false);
  const [text, setText] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);

  const router = useRouter();

  console.log("allInfo123456", allInfo[0]?.content);

  const edit = async () => {
    setShowEditDialog(true);
  };

  const parafrasear = async () => {
    try {
      setLoading1(true);
      const systemMessage: any = {
        role: "system",
        content:
          "Eres un especialista en crear tesis para graduados profesionales. Tus respuestas deben estar diseñadas para ser incluidas en el documento de tesis. Usa adjetivos no comunes para que el texto sea original , tener muy en cuenta que el texto no debe ser detectable por turnitin",
      };
      const userAssitantMessage: any = [
        {
          role: "user",
          content: `Mejora, parafrasea y añade mas informacion para que sea mas original y no sea detectable por turnitin sobre el siguiente texto: ${result?.content}. Incluir datos numericos,estadisticos y la referencia en formato APA`,
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
      setLoading1(false);
    } catch (error) {
      console.error("Error sending chat message:", error);
      // setErrores("An error occurred.");
    }
  };

  const mostrarConsultarGPT = async () => {
    setNewQuery((item) => !item);
  };

  const estandarizar = async () => {
    try {
      setLoading2(true);

      const systemMessage: any = {
        role: "system",
        content:
          "Eres un especialista en crear tesis para graduados profesionales. Tus respuestas deben estar diseñadas para ser incluidas en el documento de tesis. Usa adjetivos no comunes para que el texto sea original , tener muy en cuenta que el texto no debe ser detectable por turnitin",
      };
      const userAssitantMessage: any = [
        // {
        //   role: "user",
        //   content: `Mejora, parafrasea y añade mas informacion para que sea mas original y no sea detectable por turnitin sobre el siguiente texto: ${result?.content}`,
        // },
        {
          role: "user",
          content: `Reescribe, mejora, parafrasea este parrafo: ${result?.content} manteniendo la misma tonalidad y estilo de redaccion de este parrafo : ${allInfo[0]?.content} y añade mas informacion para que sea mas original y no sea detectable por turnitin. Incluir datos numericos,estadisticos y la referencia en formato APA`,
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
      setLoading2(false);
    } catch (error) {
      console.error("Error sending chat message:", error);
      // setErrores("An error occurred.");
    }
  };

  const guardar = async () => {
    console.log("result", result);
    try {
      setLoading3(true);

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
      setLoading3(false);
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
      setLoading4(true);
      const systemMessage: any = {
        role: "system",
        content: `Tienes el siguiente texto:${result?.content} . Eres un especialista en crear tesis para graduados profesionales. Tus respuestas deben estar diseñadas para ser incluidas en el documento de tesis. Usa adjetivos no comunes para que el texto sea original , tener muy en cuenta que el texto no debe ser detectable por turnitin. Incluir datos numericos,estadisticos y la referencia en formato APA `,
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
      setLoading4(false);
    } catch (error) {
      console.error("Error sending chat message:", error);
      // setErrores("An error occurred.");
    }
  };
  const consolidado = async () => {
    try {
      const response = await fetch("/api/section", {
        method: "POST",
        body: JSON.stringify({
          title: result?.title,
          title4: "informacion_guardada_marco_teorico",
          Nivel: "5",
          content: result?.content,
          section: "marco_teorico",
          area: "marco_teorico",
        }),
      });
      if (!response.ok) throw new Error("Status Code" + response.status);
      setLoading5(true);
    } catch (error) {
      console.error(error);
      alert("Sucedio algo mal, por favor intente de nuevo.");
    }
  };
  return (
    <div className="mb-4 border-2">
      <div>
        <div key={result?.title} className="flex text-xl">
          {result.title}
          <Button size="sm" className="m-3" onClick={() => edit()}>
            <NotebookPen size={20} />
          </Button>
          <Button
            size="sm"
            className="m-3"
            onClick={() => parafrasear()}
            disabled={loading1}
          >
            <Bot size={20} />
          </Button>
          <Button
            size="sm"
            className="m-3"
            onClick={() => mostrarConsultarGPT()}
          >
            <FileCode size={20} />
          </Button>
          {index !== 0 && (
            <Button
              size="sm"
              className="m-3"
              onClick={() => estandarizar()}
              disabled={loading2}
            >
              <Brain size={20} />
            </Button>
          )}

          <Button
            size="sm"
            className="m-3 "
            onClick={() => guardar()}
            disabled={loading3 || !newData}
          >
            <Save size={20} />
          </Button>
          <Button size="sm" className="m-3 " onClick={() => regresar()}>
            <Undo2 size={20} />
          </Button>
          <Button
            size="sm"
            className="m-3 "
            onClick={() => consolidado()}
            disabled={loading5}
          >
            <DatabaseBackup size={20} />
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
          <Button
            size="sm"
            className="m-3 "
            onClick={() => consultarGPT()}
            disabled={loading4}
          >
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

      <AddEditNoteDialogNivel4
        open={showEditDialog}
        setOpen={setShowEditDialog}
        noteToEdit={result}
      />
    </div>
  );
};
