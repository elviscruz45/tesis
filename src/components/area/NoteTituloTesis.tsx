"use client";

import { Note as NoteModel } from "@prisma/client";
import { useState } from "react";
import AddEditNoteDialog from "../AddEditNoteDialog";
import AddEditNoteTituloTesis from "../AddEditNoteTituloTesis";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import {
  Bot,
  Save,
  NotebookPen,
  Brain,
  Undo2,
  FileCode,
  SendHorizontal,
  DatabaseBackup,
  RefreshCw,
  Pencil,
  Plus,
} from "lucide-react";
import { Button } from "../ui/button";

interface NoteProps {
  note?: NoteModel;
}

export default function NoteTitulo({ note }: NoteProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  if (note) {
    return (
      <div className=" items-center justify-center">
        <Card className="cursor-pointer transition-shadow hover:shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle>{note.title}&nbsp;&nbsp;</CardTitle>

              <Pencil size={15} onClick={() => setShowEditDialog(true)} />
            </div>
          </CardHeader>
        </Card>

        <AddEditNoteTituloTesis
          open={showEditDialog}
          setOpen={setShowEditDialog}
          noteToEdit={note}
        />
        <br />
        <br />
      </div>
    );
  } else {
    return (
      <div className=" items-center justify-center">
        <Card className="cursor-pointer transition-shadow hover:shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle>
                Agregar Titulo a este Proyectso &nbsp;&nbsp;
              </CardTitle>
              <Pencil size={15} onClick={() => setShowEditDialog(true)} />
            </div>
          </CardHeader>
        </Card>
        <AddEditNoteTituloTesis
          open={showEditDialog}
          setOpen={setShowEditDialog}
          noteToEdit={{
            id: "holamundo",
            title: "Agregar Titulo a este Proyecto",
            title2: "holamundo",
            title3: "holamundo",
            userId: "holamundo",
            updatedAt: new Date(),
            createdAt: new Date(),
            title4: null,
            title5: null,
            title6: null,
            title7: null,
            title8: null,
            Nivel: "1",
            content: " ",
          }}
        />
        <br />
        <br />
      </div>
    );
  }
}
