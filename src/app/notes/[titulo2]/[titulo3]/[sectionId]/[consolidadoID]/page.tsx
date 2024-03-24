import { Metadata } from "next";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import Note from "@/components/area/Note";
import Dedicatoria from "@/components/area/Dedicatoria";
import NavBarSection from "../../../../NavBarSection";
// import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import SideNavbar from "../../../../SideNavbar";
import MarcoTeorico from "@/components/area/TesisConsolidado/3.RevisionDeLiteratura/MarcoTeorico";
export const metadata: Metadata = {
  title: "Section",
};

export default async function Section({ params }: any) {
  const sectionName = params?.consolidadoID;
  const { userId } = auth();
  //   const [showEditDialog, setShowEditDialog] = useState(false);
  //   const sectionPage = navigation.query.sectionPage;
  //   const searchParams = useSearchParams();
  //   const sectionPageName = searchParams.get("sectionPage");
  //   const [sectionPageName, setSectionPageName] = useState("");

  if (!userId) throw new Error("You must be logged in to view this page");

  const totalContent = await prisma.sectionContent.findMany({
    where: {
      userId,
      Nivel: "5",
      title4: sectionName,
    },
  });

  return (
    <div className="flex flex-row">
      <div className="basis-1/5">
        <SideNavbar />
      </div>
      <div className="basis-4/5">
        <NavBarSection />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"></div>
        <MarcoTeorico totalContent={totalContent} />

        {/* {sectionName === "informacion_guardada_marco_teorico" && (
          <MarcoTeorico totalContent={totalContent} />
        )}
        {sectionName === "informacion_guardada_antecedentes" && (
          <MarcoTeorico totalContent={totalContent} />
        )} */}
      </div>
    </div>
  );
  // return <div>{JSON.stringify(allNotes)} </div>;
}
