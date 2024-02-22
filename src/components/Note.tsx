"use client";

import { Note as NoteModel } from "@prisma/client";
import { useState } from "react";
import AddEditNoteDialog from "./AddEditNoteDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";

interface NoteProps {
  note: NoteModel;
}

export default function Note({ note }: NoteProps) {
  const sectionPage = note.title
    .trim()
    .replace(/\s+/g, "_")
    .replace(/\./g, "")
    .replace(/á/g, "a")
    .replace(/é/g, "e")
    .replace(/í/g, "i")
    .replace(/ó/g, "o")
    .replace(/ú/g, "u")
    .toLowerCase();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const wasUpdated = note.updatedAt > note.createdAt;
  const createdUpdatedAtTimestamp = (
    wasUpdated ? note.updatedAt : note.createdAt
  ).toDateString();

  // function goToSectionPage(title: string) {
  //   title = title.trim().replace(/\s+/g, "-").replace(/\./g, "").toLowerCase();
  //   console.log("title", title);
  //   //go to another page
  //   // const dynamicRoute={`/notes/${title}`}
  // }

  return (
    <>
      <Link href={`/notes/${sectionPage}`}>
        <Card
          className="cursor-pointer transition-shadow hover:shadow-lg"
          // onClick={() => setShowEditDialog(true)}
          // onClick={() => goToSectionPage(note.title)}
        >
          <CardHeader>
            <CardTitle>{note.title}</CardTitle>
            <CardDescription>
              {createdUpdatedAtTimestamp}
              {wasUpdated && " (updated)"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">{note.content}</p>
          </CardContent>
        </Card>
        {/* <AddEditNoteDialog
        open={showEditDialog}
        setOpen={setShowEditDialog}
        noteToEdit={note}
      /> */}
      </Link>
    </>
  );
}
