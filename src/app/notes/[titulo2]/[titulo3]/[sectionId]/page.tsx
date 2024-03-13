import { Metadata } from "next";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import Note from "@/components/area/Note";
import Dedicatoria from "@/components/area/Dedicatoria";
import NavBarSection from "../../../NavBarSection";
// import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import SearchInfoAntecedentes from "@/components/area/SearchInfoAntecedentes/Informacion";
import RetrieveAntecedentes from "@/components/area/RetrieveAntecedentes/RetriveInformacion";
import RetriveInformacionMarcoTeorico from "@/components/area/RetrieveMarcoTeorico/RetriveInformacion";
import SearchInfoMarcoTeorico from "@/components/area/SearchInfoMarcoTeorico/Informacion";
import RetriveInformacionOtrosDocumentos from "@/components/area/RetrieveOtrosDocumentos/RetriveInformacion";
import Tesis from "@/components/area/TesisConsolidado/tesis";
import NavBarConsolidado from "../../../NavBarConsolidado";
import SideNavbar from "../../../SideNavbar";

export const metadata: Metadata = {
  title: "Section",
};

export default async function Section({ params }: any) {
  const sectionName = params?.sectionId;
  const { userId } = auth();
  //   const [showEditDialog, setShowEditDialog] = useState(false);
  //   const sectionPage = navigation.query.sectionPage;
  //   const searchParams = useSearchParams();
  //   const sectionPageName = searchParams.get("sectionPage");
  //   const [sectionPageName, setSectionPageName] = useState("");

  if (!userId) throw new Error("You must be logged in to view this page");

  // const allSection = await prisma.sectionContent.findMany({
  //   where: {
  //     section: params?.sectionId,
  //   },
  // });

  return (
    <div className="flex flex-row">
      <div className="basis-1/5">
        <SideNavbar />
      </div>
      <div className="basis-4/5">
        {sectionName === "10consolidado" ? (
          <NavBarConsolidado />
        ) : (
          <NavBarSection />
        )}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"></div>
        {/* {sectionName === "dedicatoria" && (
          <Dedicatoria
            contentData={allSection[0]}
            // setSectionPageName={setSectionPageName}
            // open={showEditDialog}
            // setOpen={setShowEditDialog}
            // noteToEdit={params}
          />
        )} */}

        {sectionName === "busqueda_de_informacion_antecedentes" && (
          <SearchInfoAntecedentes sectionName={sectionName} />
        )}
        {sectionName === "busqueda_de_informacion_marco_teorico" && (
          <SearchInfoMarcoTeorico sectionName={sectionName} />
        )}

        {sectionName === "informacion_guardada_antecedentes" && (
          <RetrieveAntecedentes sectionName={sectionName} />
        )}
        {sectionName === "informacion_guardada_marco_teorico" && (
          <RetriveInformacionMarcoTeorico sectionName={sectionName} />
        )}
        {sectionName === "documentos" && (
          <RetriveInformacionOtrosDocumentos sectionName={sectionName} />
        )}
        {sectionName === "consolidado" && <Tesis sectionName={sectionName} />}
      </div>
    </div>
  );

  // return <div>{JSON.stringify(allNotes)} </div>;
}
