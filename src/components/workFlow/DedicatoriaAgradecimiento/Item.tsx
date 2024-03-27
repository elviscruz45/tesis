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
import AddEditNoteDialogNivel5 from "@/components/ui/AddEditNoteDialog/AddEditNoteDialogNivel5";
import { Input } from "@/components/ui/input";
import { intruccionesSistema } from "@/lib/instrucciones";

export const ResultItem = ({ result, chatGPTresult, userId, seccion }: any) => {
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

  const guardar = async () => {
    const seccionLower = seccion.toLowerCase();

    try {
      setLoading3(true);

      const response = await fetch("/api/section", {
        method: "POST",
        body: JSON.stringify({
          title: seccion,
          title4: seccionLower,
          title5: seccionLower,
          Nivel: "5",
          content: chatGPTresult,
          section: seccionLower,
          area: seccionLower,
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

  return (
    <div className="mb-2 border border-white">
      <div>
        <div
          // key={result?.title}
          className="flex text-xl"
        >
          <Button
            size="sm"
            className="m-3 "
            onClick={() => guardar()}
            disabled={loading3}
          >
            <DatabaseBackup size={20} />
          </Button>
        </div>
      </div>
      <div>
        <br />
      </div>

      <div className="mx-4">
        {chatGPTresult.split("\n").map((line: any, i: any) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>

      <br />
    </div>
  );
};
