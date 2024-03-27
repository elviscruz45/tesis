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

export const ChatGPTAnalisis = ({
  titulo,
  poblacion,
  userId,
  seccion,
}: any) => {
  console.log("poblacion", poblacion);
  const [newData, setNewData] = useState<string>("");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [newQuery, setNewQuery] = useState(false);
  const [text, setText] = useState("");
  const [nombre, setNombre] = useState("");
  const [carrera, setCarrera] = useState("");
  const [variable1, setVariable1] = useState("");
  const [variable2, setVariable2] = useState("");
  const [dimension1, setDimension1] = useState("");
  const [dimension2, setDimension2] = useState("");
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
          content: `
          1. Escribir una parrafo de introduccion sobre la población de estudio ${poblacion}, incluye referencias bibliograficas con formato APA
          2. Luego Coloca un subtitulo llamado: Tecnicas de Muestreo
          3. Luego escribe la tecnica de muestreo para esta poblacion: ${poblacion}, incluye referencias bibliograficas con formato APA
          4. Luego Coloca un subtitulo llamado: Tamaño de Muestra
          5. Luego escribe un parrafo que incluya formulas para el tamaño de muestra para esta poblacion: ${poblacion}, incluye referencias bibliograficas con formato APA
          `,
        },
      ];

      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4-turbo-preview",
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

  return (
    <div className="">
      <div className=" items-start text-xl">
        <div className="rounded-md  bg-slate-300 p-6 shadow-md">
          <ul className="list-inside list-disc space-y-2 text-gray-700">
            <li>Unidad de Analisis</li>
          </ul>
        </div>
        <br />
        <div className="flex items-start text-xl">
          <Input
            className="m-3 self-start border-gray-300"
            // value={input}
            onChange={(e: any) => setDimension1(e.target.value)}
            placeholder="Unidad de Analisis"
            // ref={inputRef}
          />
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
