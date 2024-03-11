import { Metadata } from "next";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import Note from "@/components/area/Note";
import NavBar from "./NavBar";

export const metadata: Metadata = {
  title: "Notes",
};

export default async function NotesPages() {
  const { userId } = auth();

  if (!userId) throw new Error("You must be logged in to view this page");

  const allNotes = await prisma.note.findMany({
    where: {
      userId,
    },
  });
  return (
    <>
      <NavBar />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {allNotes.map((note: any) => (
          <Note note={note} key={note.id} />
        ))}
        {allNotes.length === 0 && (
          <div className="col-span-full text-center">
            {"You don't have any notes yet. Why don't you create one?"}
          </div>
        )}
      </div>
    </>
  );

  // return <div>{JSON.stringify(allNotes)} </div>;
}
