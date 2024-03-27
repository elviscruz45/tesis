"use client";
import {
  createContentSchema,
  CreateContentSchema,
} from "@/lib/validation/sectionContent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { useChat } from "ai/react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Bot, Trash, XCircle } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { FileUpload } from "../pdfAnalizer/Upload";
import { useState } from "react";
import axios from "axios";
// import SeccionPreliminar from "./1.seccionesPreliminares/inicio";
// import PlanteamientoProblema from "./2.PlanteamientoDelProblema/inicio";
// import RevisionLiteratura from "./3.RevisionDeLiteratura/inicio";
// import PlanteamientoMetodologico from "./4.PlanteamientoMetodologico/inicio";
import React from "react";
import Link from "next/link";

interface Informacion {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  contentData?: any;
  sectionName?: any;
}

export default function Tesis({ sectionName }: any) {
  return (
    <>
      <div className="text-4xl">Secciones preliminares</div>
      <Link href={`/notes/consolidado/consolidado/consolidado/resumen`}>
        <div>Resumen</div>
      </Link>
      <Link href={`/notes/consolidado/consolidado/consolidado/abstract`}>
        <div>Abstract</div>
      </Link>
      <Link href={`/notes/consolidado/consolidado/consolidado/dedicatoria`}>
        <div>Dedicatoria</div>
      </Link>
      <Link href={`/notes/consolidado/consolidado/consolidado/agradecimientos`}>
        <div>Agradecimientos</div>
      </Link>
      <Link href={`/notes/consolidado/consolidado/consolidado/introduccion`}>
        <div>Introduccion</div>
      </Link>
      <div className="text-4xl">Capítulo I: Planteamiento del problema </div>
      <Link
        href={`/notes/consolidado/consolidado/consolidado/linea_de_investigacion`}
      >
        <div>Linea De Investigacion</div>
      </Link>
      <Link
        href={`/notes/consolidado/consolidado/consolidado/descripcion_del_problema`}
      >
        <div>Descripcion Del Problema</div>
      </Link>
      <Link
        href={`/notes/consolidado/consolidado/consolidado/preguntas_de_investigacion`}
      >
        <div>Preguntas De Investigacion</div>
      </Link>
      <Link
        href={`/notes/consolidado/consolidado/consolidado/objetivos_del_proyecto`}
      >
        <div>Objetivos Del Proyecto</div>
      </Link>
      <Link
        href={`/notes/consolidado/consolidado/consolidado/justificacion_de_la_investigacion`}
      >
        <div>Justificacion De La Investigacion</div>
      </Link>
      <Link href={`/notes/consolidado/consolidado/consolidado/delimitaciones`}>
        <div>Delimitaciones</div>
      </Link>
      <Link href={`/notes/consolidado/consolidado/consolidado/viabilidad`}>
        <div>Viabilidad</div>
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
      <Link
        href={`/notes/consolidado/consolidado/consolidado/desarrollo_de_la_hipotesis`}
      >
        <div>Desarrollo de las Hipótesis</div>
      </Link>
      <div className="text-4xl">Capítulo III: Planteamiento Metodologico </div>
      <Link
        href={`/notes/consolidado/consolidado/consolidado/diseno_general_de_la_investigacion`}
      >
        <div>Diseño General de la Investigación</div>
      </Link>
      <Link
        href={`/notes/consolidado/consolidado/consolidado/unidades_de_analisis`}
      >
        <div>Unidades de Análisis</div>
      </Link>
      <Link
        href={`/notes/consolidado/consolidado/consolidado/tecnicas_de_muestreo`}
      >
        <div>Tecnicas de Muestreo</div>
      </Link>
      <Link
        href={`/notes/consolidado/consolidado/consolidado/tamano_de_muestra`}
      >
        <div>Tamaño de Muestra</div>
      </Link>
      {/* <Link href={`/notes/consolidado/consolidado/consolidado/variables`}>
        <div>Variables</div>
      </Link> */}
      <Link
        href={`/notes/consolidado/consolidado/consolidado/conceptualizacion_de_variables`}
      >
        <div>Conceptualización de variables</div>
      </Link>
      <Link
        href={`/notes/consolidado/consolidado/consolidado/medicion_de_las_variables`}
      >
        <div>Medición de las Variables</div>
      </Link>
      <Link
        href={`/notes/consolidado/consolidado/consolidado/metodos_para_el_analisis_de_datos`}
      >
        <div>Métodos para el análisis de datos</div>
      </Link>
      <div className="text-4xl">Capítulo IV: Resultados </div>
      <Link
        href={`/notes/consolidado/consolidado/consolidado/resultados_demograficos`}
      >
        <div>Resultados demográficos</div>
      </Link>
      <Link
        href={`/notes/consolidado/consolidado/consolidado/analisis_de_resultados_descriptivos`}
      >
        <div>Análisis de resultados descriptivos</div>
      </Link>
      <Link
        href={`/notes/consolidado/consolidado/consolidado/pruebas_de_hipotesis`}
      >
        <div>Prueba de hipótesis</div>
      </Link>
      <Link
        href={`/notes/consolidado/consolidado/consolidado/pruebas_adicionales`}
      >
        <div>Pruebas adicionales</div>
      </Link>
      <div className="text-4xl">Capítulo V: Discusión </div>
      <Link href={`/notes/consolidado/consolidado/consolidado/discusion`}>
        <div>Discusión</div>
      </Link>
      <div className="text-4xl">
        Capítulo VI: Conclusiones y Recomendaciones
      </div>
      <Link href={`/notes/consolidado/consolidado/consolidado/conclusiones`}>
        <div>Conclusiones</div>
      </Link>
      <Link href={`/notes/consolidado/consolidado/consolidado/recomendaciones`}>
        <div>Recomendaciones</div>
      </Link>
    </>
  );
}
