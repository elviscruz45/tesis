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

  return (
    <>
      <div className="text-4xl">Secciones preliminares</div>
      <Link href={`/notes/${sectionName}/hola`}>
        <div>Resumen</div>
      </Link>
      <Link href={`/notes/${sectionName}/hola`}>
        <div>Abstract</div>
      </Link>
      <Link href={`/notes/consolidado/consolidado/consolidado/dedicatoria`}>
        <div>Dedicatoria</div>
      </Link>
      <Link href={`/notes/${sectionName}/hola`}>
        <div>Agradecimientos</div>
      </Link>
      <Link href={`/notes/${sectionName}/hola`}>
        <div>Introduccion</div>
      </Link>
      <div className="text-4xl">Capítulo I: Planteamiento del problema </div>
      <Link href={`/notes/${sectionName}/hola`}>
        <div>Linea De Investigacion</div>
      </Link>
      <Link href={`/notes/${sectionName}/hola`}>
        <div>Descripcion Del Problema</div>
      </Link>
      <Link href={`/notes/${sectionName}/hola`}>
        <div>Preguntas De Investigacion</div>
      </Link>
      <Link href={`/notes/${sectionName}/hola`}>
        <div>Objetivos Del Proyecto</div>
      </Link>
      <Link href={`/notes/${sectionName}/hola`}>
        <div>Justificacion De La Investigacion</div>
      </Link>
      <Link href={`/notes/${sectionName}/hola`}>
        <div>Delimitaciones</div>
      </Link>
      <div className="text-4xl">Capítulo II: Revisión de literatura </div>
      <Link
        href={`/notes/consolidado/consolidado/consolidado/informacion_guardada_antecedentes`}
      >
        <div>Antecedentes de la Investigación</div>
      </Link>
      <Link
        href={`/notes/consolidado/consolidado/consolidado/informacion_guardada_marco_teorico`}
      >
        <div>Marco Teórico</div>
      </Link>
      <Link href={`/notes/${sectionName}/hola`}>
        <div>Desarrollo de las Hipótesis</div>
      </Link>
      <div className="text-4xl">Capítulo III: Planteamiento Metodologico </div>
      <Link href={`/notes/${sectionName}/hola`}>
        <div>Diseño General de la Investigación</div>
      </Link>
      <Link href={`/notes/${sectionName}/hola`}>
        <div>Unidades de Análisis</div>
      </Link>
      <Link href={`/notes/${sectionName}/hola`}>
        <div>Variables</div>
      </Link>
      <Link href={`/notes/${sectionName}/hola`}>
        <div>Medición de las Variables</div>
      </Link>
      <Link href={`/notes/${sectionName}/hola`}>
        <div>Métodos para el análisis de datos</div>
      </Link>
      <div className="text-4xl">Capítulo IV: Resultados </div>
      <Link href={`/notes/${sectionName}/hola`}>
        <div>Resultados demográficos</div>
      </Link>
      <Link href={`/notes/${sectionName}/hola`}>
        <div>Análisis de resultados descriptivos</div>
      </Link>
      <Link href={`/notes/${sectionName}/hola`}>
        <div>Prueba de hipótesis</div>
      </Link>
      <Link href={`/notes/${sectionName}/hola`}>
        <div>Pruebas adicionales</div>
      </Link>
      <div className="text-4xl">Capítulo V: Discusión </div>
      <Link href={`/notes/${sectionName}/hola`}>
        <div>Discusión</div>
      </Link>
      <div className="text-4xl">
        Capítulo VI: Conclusiones y Recomendaciones
      </div>
      <Link href={`/notes/${sectionName}/hola`}>
        <div>Conclusiones</div>
      </Link>
      <Link href={`/notes/${sectionName}/hola`}>
        <div>Recomendaciones</div>
      </Link>
    </>
  );
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
