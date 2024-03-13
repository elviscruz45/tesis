import { Metadata } from "next";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import Note from "@/components/area/Note";
import NavBar from "../NavBar";
import SideNavbar from "../SideNavbar";

export const metadata: Metadata = {
  title: "Notes",
};

export default async function NotesPages({ params }: any) {
  const sectionName = params?.titulo2;
  console.log(sectionName);
  const { userId } = auth();

  if (!userId) throw new Error("You must be logged in to view this page");

  const allNotes = await prisma.note.findMany({
    where: {
      userId,
      Nivel: "2",
      title2: sectionName,
    },
  });
  return (
    <div className="flex flex-row">
      <div className=" basis-1/5 overflow-y-auto ">
        <SideNavbar />
      </div>
      <div className="basis-4/5 overflow-y-auto ">
        <NavBar />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {allNotes.map((note: any) => (
            <Note note={note} key={note.id} />
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
