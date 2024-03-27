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
import { Textarea } from "@/components/ui/textarea";

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

      <Textarea
        className="border-gray-300"
        placeholder=" Contexto de estudio: "
      />
      <div>&nbsp;&nbsp;</div>
      <Input
        className="border-gray-300"
        // value={input}
        onChange={(e: any) => setNombre(e.target.value)}
        placeholder=" Variable 1, dimensiones:"
        // ref={inputRef}
      />
      <div>&nbsp;&nbsp;</div>
      <Input
        className="border-gray-300"
        // value={input}
        onChange={(e: any) => setCarrera(e.target.value)}
        placeholder=" Variable 2, dimensiones:"
        // ref={inputRef}
      />
      <div>&nbsp;&nbsp;</div>

      <Input
        className="border-gray-300"
        // value={input}
        onChange={(e: any) => setCarrera(e.target.value)}
        placeholder="Dirección de la relación:"
        // ref={inputRef}
      />
      <br />
      <div className="rounded-md  bg-slate-300 p-6 shadow-md">
        <ul className="list-inside list-disc space-y-2 text-gray-700">
          Pregunta General
          <li>
            ¿qué relación existe entre variable 1 y variable 2 en "contexto de
            estudio"?
          </li>
        </ul>
      </div>
      <br />

      <div className="rounded-md  bg-slate-300 p-6 shadow-md">
        {/* <div className=" text-gray-900">Instrucciones:</div> */}
        <ul className="list-inside list-disc space-y-2 text-gray-700">
          <li>Preguntas específicas</li>
          Sigue las mismas estructuras (excepto lo que está entre paréntesis,
          que solo es aclaratorio) y repite el contexto para cada pregunta por
          más que sea redundante.
          <li>
            - ¿Qué relación existe entre variable 1 y dimensión 1 (de la
            variable 2) en "contexto de estudio"?
          </li>
          <li>
            ¿Qué relación existe entre variable 1 y dimensión 2 (de la variable
            2) en "contexto de estudio"?
          </li>
          Y continúas con todas las dimensiones de la variable 2. Luego continúa
          con estas preguntas
          <li>
            ¿Qué relación existe entre variable 2 y dimensión 1 (de la variable
            1) en (contexto)?
          </li>
          <li>
            ¿Qué relación existe entre variable 2 y dimensión 2 (de la variable
            1) en (contexto)?
          </li>
          Y continúas con todas las dimensiones de la variable 1
        </ul>
      </div>
      <br />
      <div className="rounded-md  bg-slate-300 p-6 shadow-md">
        {/* <div className=" text-gray-900">Instrucciones:</div> */}
        <ul className="list-inside list-disc space-y-2 text-gray-700">
          <li>
            Objetivo general y objetivos específicos (alineados con la pregunta
            general y las específicas, respectivamente)
          </li>
          Sigue esta estructura:
          <li>
            Identificar (o verbo similar) la relación entre variable 1 y
            variable 2 en “contexto de estudio”
          </li>
        </ul>
      </div>
      <br />
      <div className="rounded-md  bg-slate-300 p-6 shadow-md">
        {/* <div className=" text-gray-900">Instrucciones:</div> */}
        <ul className="list-inside list-disc space-y-2 text-gray-700">
          <ul>Hipótesis</ul>
          Plantea una hipótesis general e hipótesis específicas, alineadas al
          objetivo general y a los objetivos específicos, según esta estructura
          <li>
            Existe una relación (positiva o negativa, según las instrucciones)
            entre variable 1 y variable 2 en “contexto de estudio”.
          </li>
        </ul>
      </div>
      <br />
      <br />
      <Button
        size="sm"
        className="m-3 "
        onClick={() => consultarGPT()}
        disabled={loading4}
      >
        <SendHorizontal size={20} />
      </Button>
      <div className="flex items-start text-xl"></div>
      {newData && <ResultItem chatGPTresult={newData} userId={userId} />}
      <br />
      <br />
      <div className="flex items-center justify-center">Historial</div>
      <br />

      {result && <ResultItemGuardado result={result} userId={userId} />}
    </div>
  );
};
