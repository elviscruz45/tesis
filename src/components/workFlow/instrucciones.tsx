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
import {
  Save,
  NotebookPen,
  Brain,
  Undo2,
  FileCode,
  SendHorizontal,
  DatabaseBackup,
} from "lucide-react";
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

export default function Instrucciones({ sectionName }: any) {
  const [nombre, setNombre] = useState("");

  return (
    <div className=" items-start text-xl">
      <div className="rounded-md  bg-slate-300 p-6 shadow-md">
        <div className=" text-gray-900">Instrucciones al Sistema:</div>
        <br />
        <ul className="list-inside list-disc space-y-2 text-gray-700">
          <li>
            Eres un especialista en crear tesis para graduados profesionales.
            Tus respuestas deben estar diseñadas para ser incluidas en el
            documento de tesis. Usa adjetivos no comunes para que el texto sea
            original , tener muy en cuenta que el texto no debe ser detectable
            por turnitin.
          </li>

          <li>
            No utilices las palabras crucial, reto, desafío, subrayar u otras
            palabras que deriven de éstas, como "subrayando".
          </li>
          <li>
            Emplea un lenguaje plano con pocos adjetivos, en tercera person y no
            pongas innecesariamente más de un verbo en una misma oración.
          </li>
          <li>
            Para evitar que el software antiplagio marque el texto como copia
            por coincidencias de 5 palabras o más, menciona las variables y
            conceptos específicos solo una vez (en la medida de lo posible).
            Después, refiérete a ellos usando pronombres como "éstas" o de
            manera indirecta. Evita repetir palabras académicas comunes.
          </li>
          <li>
            No utilices mayúsculas de forma innecesaria, ni tampoco comillas. El
            nombre de las variables va en minúscula, salvo que sean SIGLAS.
          </li>
        </ul>
      </div>
      <br />

      <div className="flex items-start text-xl">
        <Input
          className="border-gray-300"
          // value={input}
          // onChange={(e: any) => setCarrera(e.target.value)}
          placeholder="Carrera..."
          // ref={inputRef}
        />
        <Button
          size="sm"
          className="m-3 "
          // onClick={() => consultarGPT()}
          // disabled={loading4}
        >
          <SendHorizontal size={20} />
        </Button>
      </div>
    </div>
  );
}
