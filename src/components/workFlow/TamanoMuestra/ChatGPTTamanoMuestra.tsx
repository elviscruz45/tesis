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

export const ChatGPTTamanoMuestra = ({
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
  const [selectedOption, setSelectedOption] = React.useState("");

  const promptChoose =
    selectedOption === "option1"
      ? ` Haz un texto donde expliques los elementos de la fórmula (con viñetas), 
      que se aplica para determinar el tamaño de muestra para un población conocida, bajo estos parámetros: 
      n=(Za^2*N*p*q)/(e^2*(N-1)+Za^2*p*q) (no mendiones la fórmula, solo es para que sepas cuál es)
      N: tamaño de población 
      Za: 1.96 (nivel de confianza correspondiente a 95%) 
      p y q: 0.5 (explica por qué)
      e: error (0.05)
      n: tamaño de muestra resultante  
      Es importante que uses lenguaje tan común en metodología por el tema del software anti plagio. `
      : `Indica que el tamaño de muestra estará determinado por las personas que voluntariamente deseen 
      participar en el estudio, sin embargo, lógicamente el objetivo es llegar a la mayor cantidad de 
      participantes para que la muestra tenga mayor poder de inferencia estadística (o algún término similar
         que tenga que ver con la idea que planteo) `;

  const consultarGPT = async () => {
    try {
      setLoading4(true);
      const systemMessage: any = intruccionesSistema;
      const userAssitantMessage: any = [
        {
          role: "user",
          content: `
          Considera que el tema de tesis es: ${titulo} y la poblacion es: ${poblacion} donde
          1. ${promptChoose}, incluye referencias bibliograficas con formato APA
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
        <div className="rounded-md   p-6 shadow-md">
          <ul className=" list-inside list-disc space-y-2 dark:text-slate-100">
            <ul>
              <input
                type="radio"
                className="form-radio h-5 w-5 text-red-600"
                value="option1"
                checked={selectedOption === "option1"}
                onChange={(e) => setSelectedOption(e.target.value)}
              />{" "}
              Se usa fórmula.
            </ul>
            <ul>
              <input
                type="radio"
                className="form-radio h-5 w-5 text-red-600"
                value="option2"
                checked={selectedOption === "option2"}
                onChange={(e) => setSelectedOption(e.target.value)}
              />{" "}
              No se usa fórmula.
            </ul>
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
