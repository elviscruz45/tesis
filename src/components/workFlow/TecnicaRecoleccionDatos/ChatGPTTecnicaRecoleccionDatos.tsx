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

export const ChatGPTTecnicaRecoleccionDatos = ({
  titulo,
  poblacion,
  userId,
  seccion,
}: any) => {
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
          Haz un texto de dos párrafos donde digas que la tesis es viable porque se trata de un estudio cuantitativo
           que requiere principalmente de tiempo para la aplicación de los cuestionarios en la muestra respectiva.
            Además, no se necesitan una fuerte inversión económica, más allá de lo básico para llevar a cabo esta 
            investigación, por lo que no hay impedimento significativo 
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

  return (
    <div className="">
      <div className="flex items-start text-xl">
        <div className="rounded-md  bg-slate-300 p-6 shadow-md">
          <ul className="list-inside list-disc space-y-2 text-gray-700">
            <li>Viabilidad</li>
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