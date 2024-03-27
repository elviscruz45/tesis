"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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
import AddEditNoteDialogNivel4 from "@/components/ui/AddEditNoteDialog/AddEditNoteDialogNivel4";
import { Input } from "@/components/ui/input";
import { ResultItem } from "./Item";
// import { ResultItemGuardado } from "./ItemGuardado";
import { intruccionesSistema } from "@/lib/instrucciones";

export const ChatGPTObjectivo = ({
  titulo,
  poblacion,
  userId,
  seccion,
  preguntaGeneralEspecifica,
}: any) => {
  console.log("preguntaGeneralEspecifica", preguntaGeneralEspecifica);
  const [newData, setNewData] = useState<string>("");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [newQuery, setNewQuery] = useState(false);
  const [text, setText] = useState("");
  const [nombre, setNombre] = useState("");
  const [carrera, setCarrera] = useState("");
  const [variable1, setVariable1] = useState("");
  const [variable2, setVariable2] = useState("");
  const [direccion, setDireccion] = useState("");

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);

  const router = useRouter();

  const consultarGPT = async () => {
    try {
      setLoading4(true);
      const systemMessage: any = intruccionesSistema;
      const userAssitantMessage: any = [
        {
          role: "user",
          content: preguntaGeneralEspecifica,
        },
        {
          role: "user",
          content: `
          1. Coloca un subtitulo llamado:Objetivo general
          2. Luego escribe un objetivo considerando la pregunta general.
          3. Luego Coloca un subtitulo llamado:Objetivo Específico
          4. Luego escribe 6 objetivos especificos considerando las preguntas generales y especificas.
          `,
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
      setNewData(data);
      setLoading4(false);
    } catch (error) {
      console.error("Error sending chat message:", error);
    }
  };
  console.log(newData);

  return (
    <div className="">
      <div className="flex items-start text-xl">
        <div className="rounded-md  bg-slate-300 p-6 shadow-md">
          <ul className="list-inside list-disc space-y-2 text-gray-700">
            <li>Objetivo general y objetivos específicos</li>{" "}
          </ul>
        </div>
        <br />
        <div className="flex items-start text-xl">
          <Button
            size="sm"
            className="m-3 self-start"
            onClick={() => consultarGPT()}
            disabled={loading4}
          >
            <SendHorizontal size={20} />
          </Button>
        </div>
      </div>
      <br />

      {newData && (
        <ResultItem chatGPTresult={newData} userId={userId} seccion={seccion} />
      )}
      <br />
    </div>
  );
};
