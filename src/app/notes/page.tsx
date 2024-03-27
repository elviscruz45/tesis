import { Metadata } from "next";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db/prisma";
import Note from "@/components/secciones/Notes/Note";
import SideNavbar from "./NavBarSideBar/SideNavbar";
import NavBarInicio from "./NavBarSideBar/NavBarInicio";
import NoteTitulo from "@/components/secciones/Notes/NoteTituloTesis";
import NotePoblacion from "@/components/secciones/Notes/NotePoblacion";

export const metadata: Metadata = {
  title: "Notes",
};

export default async function NotesPages() {
  const { userId } = auth();

  if (!userId) throw new Error("Tu debes estar registrado");

  const TituloUserId = await prisma.note.findMany({
    where: {
      userId: userId,
      Nivel: "0",
      title2: "titulo",
    },
  });

  const TituloGeneral = await prisma.note.findMany({
    where: {
      userId: "todos",
      Nivel: "0",
      title2: "titulo",
    },
  });
  const PoblacionUserId = await prisma.note.findMany({
    where: {
      userId: userId,
      Nivel: "0",
      title2: "poblacion",
    },
  });

  const PoblacionGeneral = await prisma.note.findMany({
    where: {
      userId: "todos",
      Nivel: "0",
      title2: "poblacion",
    },
  });
  const FlujoTrabajoUserId = await prisma.note.findMany({
    where: {
      userId: userId,
      Nivel: "1",
      title2: "plan de tesis",
    },
  });

  const FlujoTrabajoGeneral = await prisma.note.findMany({
    where: {
      userId: "todos",
      Nivel: "1",
      title2: "plan de tesis",
    },
  });
  const FlujoTrabajoTotal = [...FlujoTrabajoGeneral, ...FlujoTrabajoUserId];

  const sortedFlujoTrabajoTotal = FlujoTrabajoTotal.sort((a, b) => {
    const aLista = a.title3 ?? "0";
    const bLista = b.title3 ?? "0";
    return parseInt(aLista) - parseInt(bLista);
  });
  return (
    <div className="flex flex-row">
      <div className=" basis-1/5 overflow-y-auto ">
        <SideNavbar />
      </div>
      <div className="basis-4/5 overflow-y-auto ">
        <NavBarInicio />
        <div>Introduccion</div>

        <div className="grid gap-3 ">
          {TituloUserId.length > 0
            ? TituloUserId.map((note: any) => (
                <NoteTitulo note={note} key={note.id} />
              ))
            : TituloGeneral.map((note: any) => (
                <NoteTitulo note={note} key={note.id} />
              ))}
        </div>
        <div className="grid gap-3 ">
          {PoblacionUserId.length > 0
            ? PoblacionUserId.map((note: any) => (
                <NotePoblacion note={note} key={note.id} />
              ))
            : PoblacionGeneral.map((note: any) => (
                <NotePoblacion note={note} key={note.id} />
              ))}
        </div>
        <div>Flujo de Trabajo</div>
        <div>Plan de Tesis</div>

        <div className="grid gap-3 ">
          {sortedFlujoTrabajoTotal.map((note: any) => (
            <Note note={note} key={note.id} />
          ))}
        </div>

        {/* {tituloUserId.length > 0 ? (
          tituloUserId.map((note: any) => (
            <NoteTitulo note={note} key={note.id} />
          ))
        ) : (
          <NoteTitulo />
        )}
        {poblacionUserId.length > 0 ? (
          poblacionUserId.map((note: any) => (
            <NotePoblacion note={note} key={note.id} />
          ))
        ) : (
          <NotePoblacion />
        )} */}
      </div>
    </div>
  );
}
