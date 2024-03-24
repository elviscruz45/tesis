import { Metadata } from "next";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import Note from "@/components/area/Note";
import Dedicatoria from "@/components/area/Dedicatoria";
import NavBarSection from "../../../NavBarSection";
// import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import RetriveInformacionOtrosDocumentos from "@/components/area/RetrieveOtrosDocumentos/RetriveInformacion";
import Tesis from "@/components/area/TesisConsolidado/tesis";
import NavBarConsolidado from "../../../NavBarConsolidado";
import SideNavbar from "../../../SideNavbar";

import RetrievePreguntasInvestigacion from "@/components/area/RetrievePreguntasInvestigacion/RetriveInformacion";

import RetriveResumen from "@/components/secciones/1.Preliminares/Resumen/RetriveInformacion";
import RetriveAbstract from "@/components/secciones/1.Preliminares/Abstract/RetriveInformacion";
import RetriveDedicatoria from "@/components/secciones/1.Preliminares/Dedicatoria/RetriveInformacion";
import RetriveAgradecimientos from "@/components/secciones/1.Preliminares/Agradecimientos/RetriveInformacion";
import RetriveInformacionIntroduccion from "@/components/area/RetrieveIntroduccion/RetriveInformacion";
import RetriveIntroduccion from "@/components/secciones/1.Preliminares/Introduccion/RetriveInformacion";
import RetriveLineaDeInvestigacion from "@/components/secciones/2.PlanteamientoProblema/LineaDeInvestigacion/RetriveInformacion";
import RetriveDescripcionDelProblema from "@/components/secciones/2.PlanteamientoProblema/DescripcionDelProblema/RetriveInformacion";
import RetrivePreguntasDeInvestigacion from "@/components/secciones/2.PlanteamientoProblema/PreguntasDeInvestigacion/RetriveInformacion";
import RetriveObjetivosDelProyecto from "@/components/secciones/2.PlanteamientoProblema/ObjetivosDelProyecto/RetriveInformacion";
import RetriveJustificacionDeLaInvestigacion from "@/components/secciones/2.PlanteamientoProblema/JustificacionDeLaInvestigacion/RetriveInformacion";
import RetriveDelimitaciones from "@/components/secciones/2.PlanteamientoProblema/Delimitaciones/RetriveInformacion";
import SearchInfoAntecedentes from "@/components/area/SearchInfoAntecedentes/Informacion";
import SearchInfoMarcoTeorico from "@/components/area/SearchInfoMarcoTeorico/Informacion";
import RetrieveAntecedentes from "@/components/area/RetrieveAntecedentes/RetriveInformacion";
import RetriveInformacionMarcoTeorico from "@/components/area/RetrieveMarcoTeorico/RetriveInformacion";
import RetriveDesarrolloDeLaHipotesis from "@/components/secciones/3.RevisionLiteratura/DesarrolloDeLaHipotesis/RetriveInformacion";
import RetriveDisenoGeneralDeLaInvestigacion from "@/components/secciones/4.PlanteamientoMetodologico/DisenoGeneralDeLaInvestigacion/RetriveInformacion";
import RetriveUnidadesDeAnalisis from "@/components/secciones/4.PlanteamientoMetodologico/UnidadesDeAnalisis/RetriveInformacion";
import RetriveVariables from "@/components/secciones/4.PlanteamientoMetodologico/Variables/RetriveInformacion";
import RetriveMedicionDeLasVariables from "@/components/secciones/4.PlanteamientoMetodologico/MedicionDeLasVariables/RetriveInformacion";
import RetriveMetodosParaElAnalisisDeDatos from "@/components/secciones/4.PlanteamientoMetodologico/MetodosParaElAnalisisDeDatos/RetriveInformacion";
import RetriveResultadosDemograficos from "@/components/secciones/5.Resultados/ResultadosDemograficos/RetriveInformacion";
import RetriveAnalisisDeResultadosDescriptivos from "@/components/secciones/5.Resultados/AnalisisDeResultadosDescriptivos/RetriveInformacion";
import RetrivePruebasDeHipotesis from "@/components/secciones/5.Resultados/PruebasDeHipotesis/RetriveInformacion";
import RetrivePruebasAdicionales from "@/components/secciones/5.Resultados/PruebasAdicionales/RetriveInformacion";
import RetriveDiscusion from "@/components/secciones/6.Discusion/Discusion/RetriveInformacion";
import RetriveConclusiones from "@/components/secciones/7.ConclusionesRecomendaciones/Conclusiones/RetriveInformacion";
import RetriveRecomendaciones from "@/components/secciones/7.ConclusionesRecomendaciones/Recomendaciones/RetriveInformacion";

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
          <RetriveResumen sectionName={sectionName} titulo={tituloString} />
        )}
        {sectionName === "abstract" && (
          <RetriveAbstract sectionName={sectionName} titulo={tituloString} />
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
          <RetriveIntroduccion
            sectionName={sectionName}
            titulo={tituloString}
          />
        )}

        {/* Capítulo I: Planteamiento del problema   */}
        {sectionName === "linea_de_investigacion" && (
          <RetriveLineaDeInvestigacion
            sectionName={sectionName}
            titulo={tituloString}
          />
        )}
        {sectionName === "descripcion_del_problema" && (
          <RetriveDescripcionDelProblema
            sectionName={sectionName}
            titulo={tituloString}
          />
        )}
        {sectionName === "preguntas_de_investigacion" && (
          <RetrivePreguntasDeInvestigacion
            sectionName={sectionName}
            titulo={tituloString}
          />
        )}
        {sectionName === "objetivos_del_proyecto" && (
          <RetriveObjetivosDelProyecto
            sectionName={sectionName}
            titulo={tituloString}
          />
        )}

        {sectionName === "justificacion_de_la_investigacion" && (
          <RetriveJustificacionDeLaInvestigacion
            sectionName={sectionName}
            titulo={tituloString}
          />
        )}

        {sectionName === "delimitaciones" && (
          <RetriveDelimitaciones
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
          <RetriveDesarrolloDeLaHipotesis sectionName={sectionName} />
        )}
        {/* Capítulo III: Planteamiento metodológico   */}
        {sectionName === "diseno_general_de_la_investigacion" && (
          <RetriveDisenoGeneralDeLaInvestigacion sectionName={sectionName} />
        )}
        {sectionName === "unidades_de_analisis" && (
          <RetriveUnidadesDeAnalisis sectionName={sectionName} />
        )}
        {sectionName === "variables" && (
          <RetriveVariables sectionName={sectionName} />
        )}
        {sectionName === "medicion_de_las_variables" && (
          <RetriveMedicionDeLasVariables sectionName={sectionName} />
        )}
        {sectionName === "metodos_para_el_analisis_de_datos" && (
          <RetriveMetodosParaElAnalisisDeDatos sectionName={sectionName} />
        )}
        {/* Capítulo IV: Resultados   */}
        {sectionName === "resultados_demograficos" && (
          <RetriveResultadosDemograficos sectionName={sectionName} />
        )}
        {sectionName === "analisis_de_resultados_descriptivos" && (
          <RetriveAnalisisDeResultadosDescriptivos sectionName={sectionName} />
        )}
        {sectionName === "pruebas_de_hipotesis" && (
          <RetrivePruebasDeHipotesis sectionName={sectionName} />
        )}
        {sectionName === "pruebas_adicionales" && (
          <RetrivePruebasAdicionales sectionName={sectionName} />
        )}
        {/* Capítulo V: Discusión    */}
        {sectionName === "discusion" && (
          <RetriveDiscusion sectionName={sectionName} />
        )}
        {/* Capítulo VI: Conclusiones y Recomendaciones   */}
        {sectionName === "conclusiones" && (
          <RetriveConclusiones sectionName={sectionName} />
        )}
        {sectionName === "recomendaciones" && (
          <RetriveRecomendaciones sectionName={sectionName} />
        )}
        {/* Capítulo VI: Consolidado  */}

        {sectionName === "consolidado" && <Tesis sectionName={sectionName} />}
      </div>
    </div>
  );

  // return <div>{JSON.stringify(allNotes)} </div>;
}
