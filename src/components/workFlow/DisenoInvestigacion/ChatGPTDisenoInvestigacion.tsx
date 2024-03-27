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

export const ChatGPTDisenoInvestigacion = ({
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

  const [alcance, setAlcance] = useState("");
  const [diseno, setDiseno] = useState("");
  const [enfoque, setEnfoque] = useState("");
  const [metodo, setMetodo] = useState("");
  const [corte, setCorte] = useState("");

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
          Respecto al tema de tesis: ${titulo} y la población de estudio: ${poblacion}
          1. Escribir una parrafo de introduccion sobre lo que propone Hernández Sampieri sobre metodología de investigación. incluye refencia formato APA 
          Es importante que no uses palabras tan comunes en metodología (salvo las estrictamente necesarias,
          como por ejemplo "alcance correlacional, explicativo, etc." ) 
          porque esta parte es muy común y el trabajo que hago pasa por un software anti plagio, por lo tanto, es fácil que hayan coincidencias 	
          2. Coloca un subtitulo llamado:Alcance
          3. Luego escribe un parrafo relacionado al alcance: ${alcance}
          4. Coloca un subtitulo llamado:Diseño
          5. Luego escribe un parrafo relacionado al diseño: ${diseno}
          6. Coloca un subtitulo llamado:Enfoque
          7. Luego escribe un parrafo relacionado al enfoque: ${enfoque}
          8. Coloca un subtitulo llamado:Método
          9. Luego escribe un parrafo relacionado al método: ${metodo}
          10. Coloca un subtitulo llamado:Corte
          11. Luego escribe un parrafo relacionado al corte: ${corte}
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
            Completa los siguiente puntos según lo que propone Hernández
            Sampieri sobre metodología de investigación. Es importante que no
            uses palabras tan comunes en metodología (salvo las estrictamente
            necesarias, como por ejemplo "alcance correlacional, explicativo,
            etc." ) porque esta parte es muy común y el trabajo que hago pasa
            por un software anti plagio, por lo tanto, es fácil que hayan
            coincidencias
          </li>
        </ul>
      </div>
      <br />
      <div className="flex items-start text-xl">
        <Input
          className="m-3 self-start border-gray-300"
          // value={input}
          onChange={(e: any) => setAlcance(e.target.value)}
          placeholder="Alcance"
          // ref={inputRef}
        />
        <Input
          className="m-3 self-start border-gray-300"
          // value={input}
          onChange={(e: any) => setDiseno(e.target.value)}
          placeholder="Diseño"
          // ref={inputRef}
        />
        <Input
          className="m-3 self-start border-gray-300"
          // value={input}
          onChange={(e: any) => setEnfoque(e.target.value)}
          placeholder="Enfoque"
          // ref={inputRef}
        />
        <Input
          className="m-3 self-start border-gray-300"
          // value={input}
          onChange={(e: any) => setMetodo(e.target.value)}
          placeholder="Método."
          // ref={inputRef}
        />
        <Input
          className="m-3 self-start border-gray-300"
          // value={input}
          onChange={(e: any) => setCorte(e.target.value)}
          placeholder="Corte"
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
