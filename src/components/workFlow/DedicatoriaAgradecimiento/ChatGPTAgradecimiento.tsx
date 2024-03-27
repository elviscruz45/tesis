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

export const ChatGPTAgradecimiento = ({ titulo, userId, seccion }: any) => {
  const [newData, setNewData] = useState<string>("");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [newQuery, setNewQuery] = useState(false);
  const [text, setText] = useState("");
  const [nombre, setNombre] = useState("");
  const [carrera, setCarrera] = useState("");

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
          1.Redacta en primera persona el agradecimiento de tesis . (1 párrafo de 2 lineas ) 
          2.Debajo del párrafo pon en el nombre del tesista ${nombre} 
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
    <div className=" items-start text-xl">
      <div className="rounded-md  bg-slate-300 p-6 shadow-md">
        <ul className="list-inside list-disc space-y-2 text-gray-700">
          <li>Redacta Agradecimiento (1 párrafo muy breve de dos líneas)</li>
          <li>
            Debajo de cada párrafo pon en el nombre del tesista o tesistas
          </li>
        </ul>
      </div>
      <br />
      <br />
      <div className="flex items-start text-xl">
        <Input
          className="m-3 self-start border-gray-300"
          // value={input}
          onChange={(e: any) => setNombre(e.target.value)}
          placeholder="Nombre de la persona..."
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
      {newData && (
        <ResultItem chatGPTresult={newData} userId={userId} seccion={seccion} />
      )}
      <br />
    </div>
  );
};
