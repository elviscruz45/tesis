import { Metadata } from "next";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import NoteNivel2 from "@/components/secciones/Notes/NoteNivel2";
import NavBarNivel2 from "../NavBarSideBar/NavBarNivel2";
import SideNavbar from "../NavBarSideBar/SideNavbar";
import Tesis from "@/components/workFlow/tesis";
import RetrieveDedicatoriaAgradecimiento from "@/components/workFlow/DedicatoriaAgradecimiento/RetriveInformacion";
import RetrivePreguntasObjetivoHipotesis from "@/components/workFlow/PreguntasObjetivoHipotesis/RetriveInformacion";
import RetrieveViabilidad from "@/components/workFlow/Viabilidad/RetriveInformacion";
import RetrieveUnidadAnalisis from "@/components/workFlow/UnidadDeAnalisis/RetriveInformacion";
import RetriveDisenoGeneralInvestigacion from "@/components/workFlow/DisenoInvestigacion/RetriveInformacion";
import RetrieveTecnicaMuestreo from "@/components/workFlow/TecnicaMuestreo/RetriveInformacion";
import RetrieveTamanoMuestra from "@/components/workFlow/TamanoMuestra/RetriveInformacion";
import RetrieveConceptualizacionVariables from "@/components/workFlow/ConceptualizacionVariables/RetriveInformacion";
import RetrieveOperacionalizacionVariables from "@/components/workFlow/OperacionalizacionVariables/RetriveInformacion";
import RetrieveTecnicaRecoleccionDatos from "@/components/workFlow/TecnicaRecoleccionDatos/RetriveInformacion";
import RetrieveEscalaMedicion from "@/components/workFlow/EscalaMedicion/RetriveInformacion";
import RetrieveConfiabilidadValidezEscalasMedicion from "@/components/workFlow/ConfiabilidadValidezEscalasMedicion/RetriveInformacion";
import RetrieveMetodosAnalisisDatos from "@/components/workFlow/MetodosAnalisisDatos/RetriveInformacion";

import Instrucciones from "@/components/workFlow/instrucciones";

export const metadata: Metadata = {
  title: "Notes",
};

export default async function NotesPages({ params }: any) {
  const sectionName = params?.titulo2;
  const { userId } = auth();

  if (!userId) throw new Error("You must be logged in to view this page");

  // const titulo = await prisma.note.findMany({
  //   where: {
  //     userId: userId,
  //     Nivel: "0",
  //   },
  // });

  // const allNotesUserId = await prisma.note.findMany({
  //   where: {
  //     userId: userId,
  //     Nivel: "0",
  //   },
  // });
  // const allNotes = [...allNotesGeneral, ...allNotesUserId];

  switch (sectionName) {
    case "dedicatoria_y_agradecimiento":
      return (
        <div className="flex flex-row">
          <div className=" basis-1/5 overflow-y-auto ">
            <SideNavbar />
          </div>
          <div className="basis-4/5 overflow-y-auto ">
            <NavBarNivel2 sectionName={sectionName} />
            <RetrieveDedicatoriaAgradecimiento />
          </div>
        </div>
      );
      break;
    case "preguntas_objetivos_e_hipotesis":
      return (
        <div className="flex flex-row">
          <div className=" basis-1/5 overflow-y-auto ">
            <SideNavbar />
          </div>
          <div className="basis-4/5 overflow-y-auto ">
            <NavBarNivel2 sectionName={sectionName} />
            <RetrivePreguntasObjetivoHipotesis />
          </div>
        </div>
      );
      break;
    case "viabilidad":
      return (
        <div className="flex flex-row">
          <div className=" basis-1/5 overflow-y-auto ">
            <SideNavbar />
          </div>
          <div className="basis-4/5 overflow-y-auto ">
            <NavBarNivel2 sectionName={sectionName} />
            <RetrieveViabilidad />
          </div>
        </div>
      );
      break;
    case "unidades_de_analisis":
      return (
        <div className="flex flex-row">
          <div className=" basis-1/5 overflow-y-auto ">
            <SideNavbar />
          </div>
          <div className="basis-4/5 overflow-y-auto ">
            <NavBarNivel2 sectionName={sectionName} />
            <RetrieveUnidadAnalisis />
          </div>
        </div>
      );
      break;
    case "diseno_general_de_la_investigacion":
      return (
        <div className="flex flex-row">
          <div className=" basis-1/5 overflow-y-auto ">
            <SideNavbar />
          </div>
          <div className="basis-4/5 overflow-y-auto ">
            <NavBarNivel2 sectionName={sectionName} />
            <RetriveDisenoGeneralInvestigacion />
          </div>
        </div>
      );
      break;
    case "tecnicas_de_muestreo":
      return (
        <div className="flex flex-row">
          <div className=" basis-1/5 overflow-y-auto ">
            <SideNavbar />
          </div>
          <div className="basis-4/5 overflow-y-auto ">
            <NavBarNivel2 sectionName={sectionName} />
            <RetrieveTecnicaMuestreo />
          </div>
        </div>
      );
      break;
    case "tamano_de_muestra":
      return (
        <div className="flex flex-row">
          <div className=" basis-1/5 overflow-y-auto ">
            <SideNavbar />
          </div>
          <div className="basis-4/5 overflow-y-auto ">
            <NavBarNivel2 sectionName={sectionName} />
            <RetrieveTamanoMuestra />
          </div>
        </div>
      );
      break;
    case "conceptualizacion_de_variables":
      return (
        <div className="flex flex-row">
          <div className=" basis-1/5 overflow-y-auto ">
            <SideNavbar />
          </div>
          <div className="basis-4/5 overflow-y-auto ">
            <NavBarNivel2 sectionName={sectionName} />
            <RetrieveConceptualizacionVariables />
          </div>
        </div>
      );
      break;
    case "operacionalizacion_de_las_variables":
      return (
        <div className="flex flex-row">
          <div className=" basis-1/5 overflow-y-auto ">
            <SideNavbar />
          </div>
          <div className="basis-4/5 overflow-y-auto ">
            <NavBarNivel2 sectionName={sectionName} />
            <RetrieveOperacionalizacionVariables />
          </div>
        </div>
      );
      break;
    case "tecnica_de_recoleccion_de_datos":
      return (
        <div className="flex flex-row">
          <div className=" basis-1/5 overflow-y-auto ">
            <SideNavbar />
          </div>
          <div className="basis-4/5 overflow-y-auto ">
            <NavBarNivel2 sectionName={sectionName} />
            <RetrieveTecnicaRecoleccionDatos />
          </div>
        </div>
      );
      break;
    case "escalas_de_medicion":
      return (
        <div className="flex flex-row">
          <div className=" basis-1/5 overflow-y-auto ">
            <SideNavbar />
          </div>
          <div className="basis-4/5 overflow-y-auto ">
            <NavBarNivel2 sectionName={sectionName} />
            <RetrieveEscalaMedicion />
          </div>
        </div>
      );
      break;
    case "confiabilidad_y_validez_de_las_escalas_de_medicion":
      return (
        <div className="flex flex-row">
          <div className=" basis-1/5 overflow-y-auto ">
            <SideNavbar />
          </div>
          <div className="basis-4/5 overflow-y-auto ">
            <NavBarNivel2 sectionName={sectionName} />
            <RetrieveConfiabilidadValidezEscalasMedicion />
          </div>
        </div>
      );
      break;
    case "metodos_para_el_analisis_de_datos":
      return (
        <div className="flex flex-row">
          <div className=" basis-1/5 overflow-y-auto ">
            <SideNavbar />
          </div>
          <div className="basis-4/5 overflow-y-auto ">
            <NavBarNivel2 sectionName={sectionName} />
            <RetrieveMetodosAnalisisDatos />
          </div>
        </div>
      );
      break;

    case "consolidado":
      return (
        <div className="flex flex-row">
          <div className=" basis-1/5 overflow-y-auto ">
            <SideNavbar />
          </div>
          <div className="basis-4/5 overflow-y-auto ">
            <NavBarNivel2 sectionName={sectionName} />
            <Tesis />
          </div>
        </div>
      );
      break;
    case "instrucciones":
      return (
        <div className="flex flex-row">
          <div className=" basis-1/5 overflow-y-auto ">
            <SideNavbar />
          </div>
          <div className="basis-4/5 overflow-y-auto ">
            <NavBarNivel2 sectionName={sectionName} />
            <Instrucciones />
          </div>
        </div>
      );
      break;

    default:
      return (
        <div>No data</div>
        // <div className="flex flex-row">
        //   <div className=" basis-1/5 overflow-y-auto ">
        //     <SideNavbar />
        //   </div>
        //   <div className="basis-4/5 overflow-y-auto ">
        //     <NavBarNivel2 sectionName={sectionName} />
        //     {/* <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"> */}
        //     <div className=" grid gap-3 ">
        //       {allNotes.map((note: any) => (
        //         <NoteNivel2 note={note} key={note.id} />
        //       ))}
        //       {allNotes.length === 0 && (
        //         <div className=" text-center">
        //           {"You don't have any notes yet. Why don't you create one?"}
        //         </div>
        //       )}
        //     </div>
        //   </div>
        // </div>
      );
  }

  // if (sectionName === "consolidado") {
  //   return (
  //     <div className="flex flex-row">
  //       <div className=" basis-1/5 overflow-y-auto ">
  //         <SideNavbar />
  //       </div>
  //       <div className="basis-4/5 overflow-y-auto ">
  //         <NavBarNivel2 sectionName={sectionName} />
  //         <Tesis />
  //       </div>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div className="flex flex-row">
  //       <div className=" basis-1/5 overflow-y-auto ">
  //         <SideNavbar />
  //       </div>
  //       <div className="basis-4/5 overflow-y-auto ">
  //         <NavBarNivel2 sectionName={sectionName} />
  //         {/* <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"> */}
  //         <div className=" grid gap-3 ">
  //           {allNotes.map((note: any) => (
  //             <NoteNivel2 note={note} key={note.id} />
  //           ))}
  //           {allNotes.length === 0 && (
  //             <div className=" text-center">
  //               {"You don't have any notes yet. Why don't you create one?"}
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
}
