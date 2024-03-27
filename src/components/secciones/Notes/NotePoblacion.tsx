"use client";

import { Note as NoteModel } from "@prisma/client";
import { useState } from "react";
import AddEditNoteDialog from "../../ui/AddEditNoteDialog/AddEditNoteDialog";
import AddEditNoteTituloTesis from "../../ui/AddEditNoteDialog/AddEditNoteTituloTesis";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
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
import { Button } from "../../ui/button";

interface NoteProps {
  note: NoteModel;
}

export default function NotePoblacion({ note }: NoteProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
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
}
