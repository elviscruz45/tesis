import { Metadata } from "next";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import Note from "@/components/secciones/Notes/Note";
import Dedicatoria from "@/components/secciones/Dedicatoria";
import NavBarSection from "../../../../NavBarSideBar/NavBarSection";
// import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import SideNavbar from "../../../../NavBarSideBar/SideNavbar";
import ContenidoConsolidado from "@/components/secciones/ContenidoConsolidado";
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
        <ContenidoConsolidado totalContent={totalContent} />
      </div>
    </div>
  );
  // return <div>{JSON.stringify(allNotes)} </div>;
}
