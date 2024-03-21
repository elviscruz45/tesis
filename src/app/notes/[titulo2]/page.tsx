import { Metadata } from "next";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import NoteNivel2 from "@/components/area/NoteNivel2";
import NavBarNivel2 from "../NavBarNivel2";
import SideNavbar from "../SideNavbar";
import Tesis from "@/components/area/TesisConsolidado/tesis";

export const metadata: Metadata = {
  title: "Notes",
};

export default async function NotesPages({ params }: any) {
  const sectionName = params?.titulo2;
  console.log(sectionName);
  const { userId } = auth();

  if (!userId) throw new Error("You must be logged in to view this page");

  const allNotesGeneral = await prisma.note.findMany({
    where: {
      userId: "todos",
      Nivel: "2",
      title2: sectionName,
    },
  });

  const allNotesUserId = await prisma.note.findMany({
    where: {
      userId: userId,
      Nivel: "2",
      title2: sectionName,
    },
  });

  const allNotes = [...allNotesGeneral, ...allNotesUserId];

  if (sectionName === "consolidado") {
    return (
      <div className="flex flex-row">
        <div className=" basis-1/5 overflow-y-auto ">
          <SideNavbar />
        </div>
        <div className="basis-4/5 overflow-y-auto ">
          <NavBarNivel2 sectionName={sectionName} />
          <Tesis />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row">
        <div className=" basis-1/5 overflow-y-auto ">
          <SideNavbar />
        </div>
        <div className="basis-4/5 overflow-y-auto ">
          <NavBarNivel2 sectionName={sectionName} />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {allNotes.map((note: any) => (
              <NoteNivel2 note={note} key={note.id} />
            ))}
            {allNotes.length === 0 && (
              <div className=" text-center">
                {"You don't have any notes yet. Why don't you create one?"}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
