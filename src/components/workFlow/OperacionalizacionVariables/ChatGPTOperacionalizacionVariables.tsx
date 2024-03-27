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

export const ChatGPTOperacionalizacionVariables = ({
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

  const [dimension1, setDimension1] = useState("");
  const [dimension2, setDimension2] = useState("");
  const [direccion, setDireccion] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);

  const router = useRouter();
  const [variable1, setVariable1] = useState("");
  const [variable2, setVariable2] = useState("");
  const [selectedOption, setSelectedOption] = React.useState("");

  const promptChoose =
    selectedOption === "option1"
      ? ` Haz un concepto de cada variable ${variable1} y ${variable2} en dos párrafos detallado, 
      según lo que plantean estos autores y su respectivo modelo teórico, basado en estas dimensiones,
       pero sin mencionar explícitamente a las dimensiones 
       (solo sirve para que tengas una idea para conceptualizar la variable de forma general) 
      `
      : selectedOption === "option2"
        ? `Haz un concepto parafraseando en dos párrafos detallado de cada variable ${variable1} y ${variable2} según lo que plantean estos autores.`
        : `Haz un concepto de estas variables según lo que plantean estos autores en dos parrafos`;

  const legend = (
    <div>
      {selectedOption === "option1" && (
        <div>
          <p>- Variable 1: Modelo teórico (variable + dimensiones) y autores</p>
          <p>- Variable 2: Modelo teórico (variable + dimensiones) y autores</p>
        </div>
      )}
      {selectedOption === "option2" && (
        <div>
          <p>- Variable 1: nombre del autor y la definición</p>
          <p>- Variable 2: nombre del autor y la definición</p>
        </div>
      )}
      {selectedOption === "option3" && (
        <div>
          <p>- Variable 1: nombre de autor(es)</p>
          <p>- Variable 2: nombre de autor(es)</p>
        </div>
      )}
    </div>
  );
  const consultarGPT = async () => {
    try {
      setLoading4(true);
      const systemMessage: any = intruccionesSistema;
      const userAssitantMessage: any = [
        {
          role: "user",
          content: `
          Respecto al tema de tesis: ${titulo} y la población de estudio: ${poblacion}

           ${promptChoose}, escribe referencias bibliograficas en formato APA
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
              No se tiene la conceptualización en concreto
            </ul>
            <ul>
              <input
                type="radio"
                className="form-radio h-5 w-5 text-red-600"
                value="option2"
                checked={selectedOption === "option2"}
                onChange={(e) => setSelectedOption(e.target.value)}
              />{" "}
              Se tiene la conceptualización en concreto
            </ul>
            <ul>
              <input
                type="radio"
                className="form-radio h-5 w-5 text-red-600"
                value="option3"
                checked={selectedOption === "option3"}
                onChange={(e) => setSelectedOption(e.target.value)}
              />{" "}
              El autor es muy conocido y así mismo la conceptualización
            </ul>
          </ul>
          <br />
          <ul className=" list-inside list-disc space-y-2 dark:text-slate-100">
            <ul>{legend}</ul>
          </ul>
        </div>
        <br />
        <div className="flex items-start text-xl">
          <Input
            className="m-3 self-start border-gray-300"
            // value={input}
            onChange={(e: any) => setVariable1(e.target.value)}
            placeholder="Nombre"
            // ref={inputRef}
          />
          <Input
            className="m-3 self-start border-gray-300"
            // value={input}
            onChange={(e: any) => setVariable2(e.target.value)}
            placeholder="Cuestionario que indique claramente las dimensiones, el número  y los ítems"
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
