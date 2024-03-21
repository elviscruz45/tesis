import { Metadata } from "next";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import Note from "@/components/area/Note";
import NoteNivel3 from "@/components/area/NoteNivel3";
import Dedicatoria from "@/components/area/Dedicatoria";
import NavBarSection from "../../NavBarSection";
// import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import SearchInfoAntecedentes from "@/components/area/SearchInfoAntecedentes/Informacion";
import RetrieveAntecedentes from "@/components/area/RetrieveAntecedentes/RetriveInformacion";
import RetriveInformacionMarcoTeorico from "@/components/area/RetrieveMarcoTeorico/RetriveInformacion";
import SearchInfoMarcoTeorico from "@/components/area/SearchInfoMarcoTeorico/Informacion";
import RetriveInformacionOtrosDocumentos from "@/components/area/RetrieveOtrosDocumentos/RetriveInformacion";
import Tesis from "@/components/area/TesisConsolidado/tesis";
import NavBarConsolidado from "../../NavBarConsolidado";
import SideNavbar from "../../SideNavbar";
import NavBar from "../../NavBar";
import NavBarNivel3 from "../../NavBarNivel3";

export const metadata: Metadata = {
  title: "Section",
};

export default async function Section({ params }: any) {
  const titulo3 = params?.titulo3;
  const titulo2 = params?.titulo2;
  console.log("sdfasdf", titulo2);

  const { userId } = auth();
  //   const [showEditDialog, setShowEditDialog] = useState(false);
  //   const sectionPage = navigation.query.sectionPage;
  //   const searchParams = useSearchParams();
  //   const sectionPageName = searchParams.get("sectionPage");
  //   const [sectionPageName, setSectionPageName] = useState("");

  if (!userId) throw new Error("You must be logged in to view this page");

  const allNotesGeneral = await prisma.note.findMany({
    where: { userId: "todos", title3: titulo3, Nivel: "3" },
  });

  const allNotesUserId = await prisma.note.findMany({
    where: { userId: userId, title3: titulo3, Nivel: "3" },
  });

  const allNotes = [...allNotesGeneral, ...allNotesUserId];

  return (
    <div className="flex flex-row">
      <div className=" basis-1/5 overflow-y-auto ">
        <SideNavbar />
      </div>
      <div className="basis-4/5 overflow-y-auto ">
        <NavBarNivel3 sectionName={titulo2} titulo3={titulo3} />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {allNotes.map((note: any) => (
            <NoteNivel3
              note={note}
              key={note.id}
              titulo3={titulo3}
              titulo2={titulo2}
            />
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
