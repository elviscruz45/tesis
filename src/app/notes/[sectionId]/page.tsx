import { Metadata } from "next";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import Note from "@/components/section/Note";
import Dedicatoria from "@/components/section/Dedicatoria";
import NavBarSection from "../NavBarSection";
// import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import MarcoTeorico from "@/components/section/MarcoTeorico";
import Antecedentes from "@/components/section/Antecedentes";

export const metadata: Metadata = {
  title: "Section",
};

export default async function Section({ params }: any) {
  const sectionName = params?.sectionId;
  console.log("params12312312313123123", params?.sectionId);
  const { userId } = auth();
  //   const [showEditDialog, setShowEditDialog] = useState(false);
  //   const sectionPage = navigation.query.sectionPage;
  //   const searchParams = useSearchParams();
  //   const sectionPageName = searchParams.get("sectionPage");
  //   const [sectionPageName, setSectionPageName] = useState("");

  //   console.log("sectionPageName111112222333", sectionPageName);
  if (!userId) throw new Error("You must be logged in to view this page");

  const allSection = await prisma.sectionContent.findMany({
    where: {
      section: params?.sectionId,
    },
  });

  console.log("allSection", allSection);
  return (
    <>
      <NavBarSection />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"></div>
      {sectionName === "dedicatoria" && (
        <Dedicatoria
          contentData={allSection[0]}
          // setSectionPageName={setSectionPageName}
          // open={showEditDialog}
          // setOpen={setShowEditDialog}
          // noteToEdit={params}
        />
      )}
      {sectionName === "marco_teorico" && <MarcoTeorico />}
      {sectionName === "antecedentes" && <Antecedentes />}
    </>
  );

  // return <div>{JSON.stringify(allNotes)} </div>;
}
