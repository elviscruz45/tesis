import { Metadata } from "next";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import Note from "@/components/area/Note";
import Dedicatoria from "@/components/area/Dedicatoria";
import NavBarSection from "../../NavBarSection";
// import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import MarcoTeorico from "@/components/area/TesisConsolidado/3.RevisionDeLiteratura/MarcoTeorico";
export const metadata: Metadata = {
  title: "Section",
};

export default async function Section({ params }: any) {
  const sectionName = params?.saveDoc;
  const { userId } = auth();
  //   const [showEditDialog, setShowEditDialog] = useState(false);
  //   const sectionPage = navigation.query.sectionPage;
  //   const searchParams = useSearchParams();
  //   const sectionPageName = searchParams.get("sectionPage");
  //   const [sectionPageName, setSectionPageName] = useState("");

  //   console.log("sectionPageName111112222333", sectionPageName);
  if (!userId) throw new Error("You must be logged in to view this page");

  const totalContent = await prisma.sectionContent.findMany({
    where: {
      section: params?.saveDoc,
    },
  });

  return (
    <>
      <NavBarSection />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"></div>
      {sectionName === "marco_teorico" && (
        <MarcoTeorico totalContent={totalContent} />
      )}
    </>
  );

  // return <div>{JSON.stringify(allNotes)} </div>;
}
