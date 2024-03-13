import { Metadata } from "next";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import Note from "@/components/area/Note";
import NoteNivel4 from "@/components/area/NoteNivel3";

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

  const allNotes = await prisma.note.findMany({
    where: { userId, title2: titulo2, title3: titulo3, Nivel: "3" },
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
            <NoteNivel4 note={note} key={note.id} />
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
