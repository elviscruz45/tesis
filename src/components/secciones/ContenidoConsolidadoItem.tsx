"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/buttonsmall";
import UploadPdfByUrl from "@/components/pdfAnalizer/ChatPdfdocUpload";
import { FileUpload } from "@/components/pdfAnalizer/Upload";
import Link from "next/link";
import { resourceLimits } from "worker_threads";
import { Pencil } from "lucide-react";
import openai from "@/lib/openai";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { useRouter } from "next/navigation";
import AddEditNoteDialogNivel5 from "@/components/ui/AddEditNoteDialog/AddEditNoteDialogNivel5";
import { Input } from "@/components/ui/input";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";

export const ContenidoConsolidadoItem = ({ result, allInfo, index }: any) => {
  const [newData, setNewData] = useState<string>("");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [newQuery, setNewQuery] = useState(false);
  const [text, setText] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);
  const [newTextSaved, setNewTextSaved] = useState("");

  const router = useRouter();

  const edit = async () => {
    setShowEditDialog(true);
  };

  return (
    <>
      <div>
        <div key={result?.title} className="flex text-xl">
          {result.title} &nbsp;
          <Pencil size={20} onClick={() => edit()} />
          {/* <Button size="sm" className="m-3" onClick={() => edit()}>
            <NotebookPen size={20} />
          </Button> */}
        </div>
      </div>
      <div>
        <br />
      </div>
      <div key={result?.content} className="">
        {result.content.split("\n").map((line: any, i: any) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
      <br />
      <br />

      <AddEditNoteDialogNivel5
        open={showEditDialog}
        setOpen={setShowEditDialog}
        noteToEdit={result}
        setNewTextSaved={setNewTextSaved}
      />
    </>
  );
};
