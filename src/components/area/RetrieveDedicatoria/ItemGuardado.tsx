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
import AddEditNoteDialogNivel5 from "@/components/AddEditNoteDialogNivel5";
import { Input } from "@/components/ui/input";

export const ResultItemGuardado = ({ result, userId }: any) => {
  const [newData, setNewData] = useState<string>("");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [newQuery, setNewQuery] = useState(false);
  const [text, setText] = useState("");

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);
  const [activateActualizar, setActivateActualizar] = useState(false);
  const [newTextSaved, setNewTextSaved] = useState("");
  const [disabledSave, setDisabledSave] = useState(false);
  const router = useRouter();

  console.log("result 999999", result);

  const guardar = async () => {
    try {
      setLoading3(true);

      const response = await fetch("/api/section", {
        method: "POST",
        body: JSON.stringify({
          title: "no hay titulo",
          title4: "dedicatoria",
          Nivel: "5",
          content: newData,
          section: "dedicatoria",
          area: "dedicatoria",
        }),
      });
      if (!response.ok) throw new Error("Status Code" + response.status);

      setNewTextSaved(newData);
      setNewData("");
      setNewQuery(false);
      setLoading3(false);
      setActivateActualizar(true);
      setDisabledSave(true);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Sucedio algo mal, por favor intente de nuevo.");
    }
  };

  const mostrarConsultarGPT = async () => {
    setNewQuery((item) => !item);
  };
  const edit = async () => {
    setShowEditDialog(true);
  };

  const regresar = async () => {
    console.log("regresar");
    setNewData("");
    setNewTextSaved("");
  };

  const consultarGPT = async () => {
    try {
      setLoading4(true);
      const systemMessage: any = {
        role: "system",
        content: `. Eres un especialista en crear tesis para graduados profesionales. Tus respuestas deben estar diseñadas para ser incluidas en el documento de tesis. Usa adjetivos no comunes para que el texto sea original , tener muy en cuenta que el texto no debe ser detectable por turnitin. `,
      };
      const userAssitantMessage: any = [
        {
          role: "user",
          content: `Tienes el siguiente texto:${result.content} , se quiere modificarlo de la siguiente manera:${text}`,
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
      console.log(data);
      setNewData(data);
      setLoading4(false);
    } catch (error) {
      console.error("Error sending chat message:", error);
      // setErrores("An error occurred.");
    }
  };
  console.log("newTextSaved", newTextSaved);

  return (
    <div className="mb-2 border border-white">
      <div>
        <div
          // key={result?.title}
          className="flex text-xl"
        >
          {newData && (
            <Button
              size="sm"
              className="m-3 "
              onClick={() => guardar()}
              disabled={loading3}
            >
              <DatabaseBackup size={20} />
            </Button>
          )}
          <Button
            size="sm"
            className="m-3"
            onClick={() => mostrarConsultarGPT()}
          >
            <FileCode size={20} />
          </Button>

          <Button
            // disabled={!activateActualizar}
            size="sm"
            className="m-3"
            onClick={() => edit()}
          >
            <NotebookPen size={20} />
          </Button>

          <Button size="sm" className="m-3 " onClick={() => regresar()}>
            <Undo2 size={20} />
          </Button>
        </div>
      </div>
      <div>
        <br />
      </div>
      {newData && <div className="mx-4 text-red-500">Version Original</div>}

      <div className="mx-4">{result?.content}</div>

      <br />
      <br />

      {newQuery && (
        <div className="mx-4 flex items-start text-xl">
          <Input
            // value={input}
            onChange={(e: any) => setText(e.target.value)}
            placeholder="Modificar..."
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
      )}

      {newData && (
        <>
          <div className="mx-4 text-green-500"> Nueva Version</div>
          <div className="mx-4">{newData}</div>
        </>
      )}

      <AddEditNoteDialogNivel5
        open={showEditDialog}
        setOpen={setShowEditDialog}
        setNewTextSaved={setNewTextSaved}
        content={newData ? newData : result?.content}
        noteToEdit={{
          id: result?.id,
          title: "no hay titulo",
          title2: "",
          title3: null,
          title4: null,
          title5: "Dedicatoria",
          title6: null,
          title7: null,
          title8: null,
          Nivel: "5",
          content: newData ? newData : result?.content,
          userId: userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        }}
      />
    </div>
  );
};
