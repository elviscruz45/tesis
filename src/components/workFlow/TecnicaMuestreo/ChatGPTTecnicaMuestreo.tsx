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

export const ChatGPTTecnicaMuestreo = ({
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
      ? `Se usa fórmula. En un párrafo detalla el tipo de muestreo no
      probabilístico que se plantea llevar a cabo: por conveniencia
      (explica brevemente de qué se trata), es decir que se tomarán las
      respuestas de los trabajadores que deseen participar
      voluntariamente. El objetivo es llegar al tamaño de muestra (n)
      determinado a partir de la fórmula para estimar el tamaño de
      muestra para una población conocida, pero sin elección aleatoria.
      Esta metodología permite tener un tamaño de muestra previamente
      determinado por la fórmula, de modo que se asegure la
      representatividad de la muestra. Es decir, si bien es por
      conveniencia, porque no se elige de forma aleatoria, pero se
      tienen un objetivo de tamaño de muestra para tener una referencia
      que asegure la representatividad.`
      : `No se usa fórmula. En un párrafo detalla el tipo de muestreo no
      probabilístico que se plantea llevar a cabo: por conveniencia
      (explica brevemente de qué se trata), es decir que se tomarán las
      respuestas de los trabajadores que deseen participar
      voluntariamente. El objetivo es llegar a la mayor cantidad de
      participantes para tener una muestra representativa.`;

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
