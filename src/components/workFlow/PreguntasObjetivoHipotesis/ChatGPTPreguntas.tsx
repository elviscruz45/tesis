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

export const ChatGPTPreguntas = ({
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
          content: "Crea preguntas creativas de acuerdo a lo siguientes",
        },
        {
          role: "user",
          content: `
          Considerando una relacion de las variables : ${direccion}
          1. Coloca un subtitulo llamado:"Pregunta General " 
          2. Luego escribe la siguiente pregunta ¿qué relación existe entre  ${variable1} y ${variable2} en ${poblacion} ?.
          3. Luego Coloca un subtitulo llamado: Preguntas Especificas.
          Sigue las mismas estructuras (excepto lo que está entre paréntesis, que solo es aclaratorio) y repite el contexto de estudio:${titulo} en una población ${poblacion} para cada pregunta por más que sea redundante. 
          - ¿Qué relación existe entre ${variable1} y ${dimension1} (de ${variable2}) en ${poblacion} para cada pregunta por más que sea redundante. "? 
          - ¿Qué relación existe entre ${variable1} y ${dimension2} (de ${variable2}) en  ${poblacion} para cada pregunta por más que sea redundante. "?
          - ¿Qué relación existe entre ${variable2} y ${dimension1} (de ${variable2}) en  ${poblacion} para cada pregunta por más que sea redundante. "? 
          - ¿Qué relación existe entre ${variable2} y ${dimension2} (de ${variable2}) en  ${poblacion} para cada pregunta por más que sea redundante. "?
          - ¿Qué relación existe entre ${variable1} y ${dimension1} (de ${variable1}) en ${poblacion} para cada pregunta por más que sea redundante. "? 
          - ¿Qué relación existe entre ${variable1} y ${dimension2} (de ${variable1}) en  ${poblacion} para cada pregunta por más que sea redundante. "?
          - ¿Qué relación existe entre ${variable2} y ${dimension1} (de ${variable1}) en  ${poblacion} para cada pregunta por más que sea redundante. "? 
          - ¿Qué relación existe entre ${variable2} y ${dimension2} (de ${variable1}) en  ${poblacion} para cada pregunta por más que sea redundante. "?
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
    <div className=" items-start text-xl">
      <div className="rounded-md  bg-slate-300 p-6 shadow-md">
        <ul className="list-inside list-disc space-y-2 text-gray-700">
          <li>
            Redacta las preguntas Generales y Especificas de acuerdo a lo
            siguiente:
          </li>
        </ul>
      </div>
      <br />
      <div className="flex items-start text-xl">
        <Input
          className="m-3 self-start border-gray-300"
          // value={input}
          onChange={(e: any) => setVariable1(e.target.value)}
          placeholder="Variable 1"
          // ref={inputRef}
        />
        <Input
          className="m-3 self-start border-gray-300"
          // value={input}
          onChange={(e: any) => setDimension1(e.target.value)}
          placeholder="Dimensiones 1"
          // ref={inputRef}
        />
        <Input
          className="m-3 self-start border-gray-300"
          // value={input}
          onChange={(e: any) => setVariable2(e.target.value)}
          placeholder="Variable 2"
          // ref={inputRef}
        />
        <Input
          className="m-3 self-start border-gray-300"
          // value={input}
          onChange={(e: any) => setDimension2(e.target.value)}
          placeholder="Dimensiones 2."
          // ref={inputRef}
        />
        <Input
          className="m-3 self-start border-gray-300"
          // value={input}
          onChange={(e: any) => setDireccion(e.target.value)}
          placeholder="Dirección relación"
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
