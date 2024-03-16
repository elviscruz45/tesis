"use client";
import {
  createContentSchema,
  CreateContentSchema,
} from "@/lib/validation/sectionContent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../ui/input";
import { useRouter } from "next/navigation";
import { useChat } from "ai/react";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import { Bot, Trash, XCircle } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { FileUpload } from "../../pdfAnalizer/Upload";
import { useState } from "react";
import axios from "axios";
// import SeccionPreliminar from "./1.seccionesPreliminares/inicio";
// import PlanteamientoProblema from "./2.PlanteamientoDelProblema/inicio";
// import RevisionLiteratura from "./3.RevisionDeLiteratura/inicio";
// import PlanteamientoMetodologico from "./4.PlanteamientoMetodologico/inicio";
import Resultados from "./5.Resultados/inicio";
import Discusion from "./6.Discusión/inicio";
import ConclusionRecomendacion from "./7.ConclusionesRecomendaciones/inicio";
import React from "react";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import Link from "next/link";

interface Informacion {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  contentData?: any;
  sectionName?: any;
}

export default function Tesis({ sectionName }: any) {
  const SeccionesPreliminares = [
    "Resumen",
    "Abstract",
    "Dedicatoria",
    "Agradecimientos",
    "Introduccion",
  ];
  const PlanteamientoDelProblema = [
    "Linea De Investigacion",
    "Descripcion Del Problema",
    "Preguntas De Investigacion",
    "Objetivos Del Proyecto",
    "Justificacion De La Investigacion",
    "Delimitaciones",
  ];
  const RevisionLiteratura = [
    "Antecedentes de la Investigación",
    "Marco Teórico",
    "Desarrollo de las Hipótesis",
  ];

  const PlanteamientoMetodologico = [
    "Diseño General de la Investigación",
    "Unidades de Análisis",
    "Variables",
    "Medición de las Variables",
    "Métodos para el análisis de datos",
  ];

  const Resultados = [
    "Resultados demográficos",
    "Análisis de resultados descriptivos",
    "Prueba de hipótesis",
    "Pruebas adicionales",
  ];

  const Discusion = ["Discusión"];

  const ConclusionesRecomendaciones = ["Conclusiones", "Recomendaciones"];

  // const doneItems = ["Pickup new mix-tape from Beth"];

  const [SeccionesPreliminaresList, SeccionesPreliminaresTodos] =
    useDragAndDrop<HTMLUListElement, string>(SeccionesPreliminares, {
      group: "SeccionesPreliminares",
    });

  const [PlanteamientoDelProblemaList, PlanteamientoDelProblemaTodos] =
    useDragAndDrop<HTMLUListElement, string>(PlanteamientoDelProblema, {
      group: "PlanteamientoDelProblema",
    });

  const [RevisionLiteraturaList, RevisionLiteraturaTodos] = useDragAndDrop<
    HTMLUListElement,
    string
  >(RevisionLiteratura, {
    group: "RevisionLiteratura",
  });

  const [PlanteamientoMetodologicoList, PlanteamientoMetodologicoTodos] =
    useDragAndDrop<HTMLUListElement, string>(PlanteamientoMetodologico, {
      group: "PlanteamientoMetodologico",
    });

  const [ResultadosList, ResultadosTodos] = useDragAndDrop<
    HTMLUListElement,
    string
  >(Resultados, {
    group: "Resultados",
  });

  const [DiscusionList, DiscusionTodos] = useDragAndDrop<
    HTMLUListElement,
    string
  >(Discusion, {
    group: "Discusion",
  });

  const [ConclusionesRecomendacionesList, ConclusionesRecomendacionesTodos] =
    useDragAndDrop<HTMLUListElement, string>(ConclusionesRecomendaciones, {
      group: "ConclusionesRecomendaciones",
    });
  return (
    <>
      <div className="text-4xl">Secciones preliminares</div>

      <div className="kanban-board">
        <ul ref={SeccionesPreliminaresList}>
          {SeccionesPreliminaresTodos.map((todo) => (
            <li className="kanban-item" key={todo}>
              {todo}
            </li>
          ))}
        </ul>
      </div>
      <div className="text-4xl">Capítulo I: Planteamiento del problema </div>

      <div className="kanban-board">
        <ul ref={PlanteamientoDelProblemaList}>
          {PlanteamientoDelProblemaTodos.map((todo) => (
            <li className="kanban-item" key={todo}>
              {todo}
            </li>
          ))}
        </ul>
      </div>
      <div className="text-4xl">Capítulo II: Revisión de literatura </div>
      <div className="kanban-board">
        <ul ref={RevisionLiteraturaList}>
          {RevisionLiteraturaTodos.map((todo) => (
            <li className="kanban-item" key={todo}>
              <Link href={`/notes/${sectionName}/${formatSectionPage(todo)}`}>
                {todo}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="text-4xl">Capítulo III: Planteamiento metodológico </div>
      <div className="kanban-board">
        <ul ref={PlanteamientoMetodologicoList}>
          {PlanteamientoMetodologicoTodos.map((todo) => (
            <li className="kanban-item" key={todo}>
              {todo}
            </li>
          ))}
        </ul>
      </div>
      <div className="text-4xl">Capítulo IV: Resultados </div>

      <div className="kanban-board">
        <ul ref={ResultadosList}>
          {ResultadosTodos.map((todo) => (
            <li className="kanban-item" key={todo}>
              {todo}
            </li>
          ))}
        </ul>
      </div>
      <div className="text-4xl">Capítulo V: Discusión </div>

      <div className="kanban-board">
        <ul ref={DiscusionList}>
          {DiscusionTodos.map((todo) => (
            <li className="kanban-item" key={todo}>
              {todo}
            </li>
          ))}
        </ul>
      </div>
      <div className="text-4xl">
        Capítulo VI: Conclusiones y Recomendaciones
      </div>

      <div className="kanban-board">
        <ul ref={ConclusionesRecomendacionesList}>
          {ConclusionesRecomendacionesTodos.map((todo) => (
            <li className="kanban-item" key={todo}>
              {todo}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
  // return (
  //   <>
  //     <SeccionPreliminar />
  //     <PlanteamientoProblema />
  //     <RevisionLiteratura />
  //     <PlanteamientoMetodologico />
  //     <Resultados />
  //     <Discusion />
  //     <ConclusionRecomendacion />
  //   </>
  // );
}

function formatSectionPage(title: string): string {
  return title
    .trim()
    .replace(/\s+/g, "_")
    .replace(/\./g, "")
    .replace(/á/g, "a")
    .replace(/é/g, "e")
    .replace(/í/g, "i")
    .replace(/ó/g, "o")
    .replace(/ú/g, "u")
    .toLowerCase();
}
