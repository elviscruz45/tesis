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
import RetriveInformacionIntroduccion from "@/components/area/RetrieveIntroduccion/RetriveInformacion";
import RetriveDedicatoria from "@/components/area/RetrieveDedicatoria/RetriveInformacion";
import RetriveAgradecimientos from "@/components/area/RetrieveDedicatoria/RetriveInformacion";
import RetrievePreguntasInvestigacion from "@/components/area/RetrievePreguntasInvestigacion/RetriveInformacion";

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

  const titulo = await prisma.note.findMany({
    where: {
      userId,
      Nivel: "1",
    },
  });

  const tituloString = titulo.map((item: any) => item.title);

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

        {sectionName === "documentos" && (
          <RetriveInformacionOtrosDocumentos sectionName={sectionName} />
        )}

        {/* Secciones Peliminares  */}

        {sectionName === "resumen" && (
          <RetriveAgradecimientos
            sectionName={sectionName}
            titulo={tituloString}
          />
        )}
        {sectionName === "abstract" && (
          <RetriveAgradecimientos
            sectionName={sectionName}
            titulo={tituloString}
          />
        )}

        {sectionName === "dedicatoria" && (
          <RetriveDedicatoria sectionName={sectionName} titulo={tituloString} />
        )}
        {sectionName === "agradecimientos" && (
          <RetriveAgradecimientos
            sectionName={sectionName}
            titulo={tituloString}
          />
        )}
        {sectionName === "informacion_guardada_introduccion" && (
          <RetriveInformacionIntroduccion sectionName={sectionName} />
        )}

        {sectionName === "introduccion" && (
          <RetriveAgradecimientos
            sectionName={sectionName}
            titulo={tituloString}
          />
        )}

        {/* Capítulo I: Planteamiento del problema   */}
        {sectionName === "linea_de_investigacion" && (
          <RetrievePreguntasInvestigacion
            sectionName={sectionName}
            titulo={tituloString}
          />
        )}
        {sectionName === "descripcion_del_problema" && (
          <RetrievePreguntasInvestigacion
            sectionName={sectionName}
            titulo={tituloString}
          />
        )}
        {sectionName === "preguntas_de_investigacion" && (
          <RetrievePreguntasInvestigacion
            sectionName={sectionName}
            titulo={tituloString}
          />
        )}
        {sectionName === "objetivos_del_proyecto" && (
          <RetrievePreguntasInvestigacion
            sectionName={sectionName}
            titulo={tituloString}
          />
        )}

        {sectionName === "justificacion_de_la_investigacion" && (
          <RetrievePreguntasInvestigacion
            sectionName={sectionName}
            titulo={tituloString}
          />
        )}

        {sectionName === "delimitaciones" && (
          <RetrievePreguntasInvestigacion
            sectionName={sectionName}
            titulo={tituloString}
          />
        )}
        {/* Capítulo II: Revisión de literatura   */}

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

        {sectionName === "desarrollo_de_la_hipotesis" && (
          <RetriveInformacionMarcoTeorico sectionName={sectionName} />
        )}
        {/* Capítulo III: Planteamiento metodológico   */}
        {sectionName === "diseno_general_de_la_investigacion" && (
          <RetriveInformacionMarcoTeorico sectionName={sectionName} />
        )}
        {sectionName === "unidades_de_analisis" && (
          <RetriveInformacionMarcoTeorico sectionName={sectionName} />
        )}
        {sectionName === "variables" && (
          <RetriveInformacionMarcoTeorico sectionName={sectionName} />
        )}
        {sectionName === "medicion_de_las_variables" && (
          <RetriveInformacionMarcoTeorico sectionName={sectionName} />
        )}
        {sectionName === "metodos_para_el_analisis_de_datos" && (
          <RetriveInformacionMarcoTeorico sectionName={sectionName} />
        )}
        {/* Capítulo IV: Resultados   */}
        {sectionName === "resultados_demograficos" && (
          <RetriveInformacionMarcoTeorico sectionName={sectionName} />
        )}
        {sectionName === "analisis_de_resultados_descriptivos" && (
          <RetriveInformacionMarcoTeorico sectionName={sectionName} />
        )}
        {sectionName === "pruebas_de_hipotesis" && (
          <RetriveInformacionMarcoTeorico sectionName={sectionName} />
        )}
        {sectionName === "pruebas_adicionales" && (
          <RetriveInformacionMarcoTeorico sectionName={sectionName} />
        )}
        {/* Capítulo V: Discusión    */}
        {sectionName === "discusion" && (
          <RetriveInformacionMarcoTeorico sectionName={sectionName} />
        )}
        {/* Capítulo VI: Conclusiones y Recomendaciones   */}
        {sectionName === "conclusiones" && (
          <RetriveInformacionMarcoTeorico sectionName={sectionName} />
        )}
        {sectionName === "recomendaciones" && (
          <RetriveInformacionMarcoTeorico sectionName={sectionName} />
        )}
        {/* Capítulo VI: Consolidado  */}

        {sectionName === "consolidado" && <Tesis sectionName={sectionName} />}
      </div>
    </div>
  );

  // return <div>{JSON.stringify(allNotes)} </div>;
}
