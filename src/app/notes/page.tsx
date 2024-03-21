import { Metadata } from "next";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import Note from "@/components/area/Note";
import SideNavbar from "./SideNavbar";
import NavBarInicio from "./NavBarInicio";

export const metadata: Metadata = {
  title: "Notes",
};

export default async function NotesPages() {
  const { userId } = auth();

  if (!userId) throw new Error("You must be logged in to view this page");

  const allNotesGeneral = await prisma.note.findMany({
    where: {
      userId: "todos",
      Nivel: "2",
    },
  });

  const allNotesUserId = await prisma.note.findMany({
    where: {
      userId: userId,
      Nivel: "2",
    },
  });

  const allNotes = [...allNotesGeneral, ...allNotesUserId];

  //Mercado Pago

  return (
    <div className="flex flex-row">
      <div className=" basis-1/5 overflow-y-auto ">
        <SideNavbar />
      </div>
      <div className="basis-4/5 overflow-y-auto ">
        <NavBarInicio />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {allNotes.map((note: any) => (
            <Note note={note} key={note.id} />
          ))}
          {allNotes.length === 0 && (
            <div className=" text-center">
              {"Todavia no hay informacion..."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
