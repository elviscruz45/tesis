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
import { ResultItemGuardado } from "./ItemGuardado";

export const ChatGPT = ({ result, userId }: any) => {
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
      const systemMessage: any = {
        role: "system",
        content: `. Eres un especialista en crear tesis para graduados profesionales. Tus respuestas deben estar diseñadas para ser incluidas en el documento de tesis. Usa adjetivos no comunes para que el texto sea original , tener muy en cuenta que el texto no debe ser detectable por turnitin. Incluir datos numericos,estadisticos y la referencia en formato APA `,
      };
      const systemMessage2: any = {
        role: "system",
        content: `- No utilices las palabras crucial, reto, desafío, subrayar  u otras palabras que deriven de éstas, como "subrayando". 
        -	Emplea un lenguaje plano con pocos adjetivos, en tercera person y no pongas innecesariamente más de un verbo en una misma oración. 
        - Para evitar que el software antiplagio marque el texto como copia por coincidencias de 5 palabras o más, menciona las variables y conceptos específicos solo una vez (en la medida de lo posible). Después, refiérete a ellos usando pronombres como "éstas" o de manera indirecta. Evita repetir palabras académicas comunes.
        - No utilices mayúsculas de forma innecesaria, ni tampoco comillas. El nombre de las variables va en minúscula, salvo que sean SIGLAS.`,
      };

      const userAssitantMessage: any = [
        {
          role: "user",
          content: `incluye el nombre de las personas: ${nombre} y la carrera en la que se esta graduando ${carrera} `,
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
          messages: [systemMessage, systemMessage2, ...userAssitantMessage],
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
        <div className=" text-gray-900">Instrucciones al Sistema:</div>
        <ul className="list-inside list-disc space-y-2 text-gray-700">
          <li>
            No utilices las palabras crucial, reto, desafío, subrayar u otras
            palabras que deriven de éstas, como "subrayando".
          </li>
          <li>
            Emplea un lenguaje plano con pocos adjetivos, en tercera person y no
            pongas innecesariamente más de un verbo en una misma oración.
          </li>
          <li>
            Para evitar que el software antiplagio marque el texto como copia
            por coincidencias de 5 palabras o más, menciona las variables y
            conceptos específicos solo una vez (en la medida de lo posible).
            Después, refiérete a ellos usando pronombres como "éstas" o de
            manera indirecta. Evita repetir palabras académicas comunes.
          </li>
          <li>
            No utilices mayúsculas de forma innecesaria, ni tampoco comillas. El
            nombre de las variables va en minúscula, salvo que sean SIGLAS.
          </li>
        </ul>
      </div>
      <br />
      <div className="rounded-md  bg-slate-300 p-6 shadow-md">
        <div className=" text-gray-900">Justificacion de la investigacion:</div>
        <ul className="list-inside list-disc space-y-2 text-gray-700">
          <li>
            Haz en un párrafo una justificación profesional y en otro una
            justificación académica para esta tesis, según esta problemática
            identificada. Toma de base esta información y considera algunas
            referencias de ésta que consideres necesarias.
          </li>
          <li>
            Haz en un párrafo una justificación social y en otro una
            justificación práctica para esta tesis, según esta problemática
            identificada. Toma de base esta información y considera algunas
            referencias de ésta que consideres necesarias.
          </li>
        </ul>
      </div>
      <br />
      <div className="rounded-md  bg-slate-300 p-6 shadow-md">
        <div className=" text-gray-900">Viabilidad:</div>
        <ul className="list-inside list-disc space-y-2 text-gray-700">
          <li>
            Haz un texto de dos párrafos donde digas que la tesis es viable
            porque se trata de un estudio cuantitativo que requiere
            principalmente de tiempo para la aplicación de los cuestionarios en
            la muestra respectiva. Además, no se necesitan una fuerte inversión
            económica, más allá de lo básico para llevar a cabo esta
            investigación, por lo que no hay impedimento significativo
          </li>
        </ul>
      </div>
      <br />
      <br />
      <div className="flex items-start text-xl">
        <Input
          className="border-gray-300"
          // value={input}
          onChange={(e: any) => setNombre(e.target.value)}
          placeholder="Nombre de la persona..."
          // ref={inputRef}
        />
        <div>&nbsp;&nbsp;</div>
        <Input
          className="border-gray-300"
          // value={input}
          onChange={(e: any) => setCarrera(e.target.value)}
          placeholder="Carrera..."
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
      {newData && <ResultItem chatGPTresult={newData} userId={userId} />}
      <br />
      <br />
      <div className="flex items-center justify-center">Historial</div>
      <br />

      {result && <ResultItemGuardado result={result} userId={userId} />}
    </div>
  );
};
