"use client";
import {
  createDedicatoriaSchema,
  CreateDedicatoriaSchema,
} from "@/lib/validation/dedicatoria";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import LoadingButton from "./ui/loading-button";
import { useRouter } from "next/navigation";
import { Note } from "@prisma/client";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Message } from "ai";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Bot, Trash, XCircle } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import { useState } from "react";
import { FileUpload } from "./Upload";
// import FileUpload from "./FilesUpload";

interface Antedentes {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  // setSectionPageName: () => void;
  contentData?: any;
  // noteToEdit?: Note;
}

export default function Antecedentes({
  open,
  setOpen,
  contentData,
  // setSectionPageName,
}: Antedentes) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat();
  const pathname = usePathname();
  const regex = /\/([^\/]+)$/; // Match anything after the last slash
  const match = pathname?.match(regex) || [];
  console.log("match1111", match[1]);
  console.log("messages[1]?.content", messages);

  // let sectionPageName
  // if (match) {
  //   const dedicatoria = match[1];
  //   console.log("pathname", dedicatoria);
  // }

  // const { user } = useUser();
  // const searchParams = useSearchParams();
  // const sectionPageName: any = searchParams.get("sectionPage");
  // // setSectionPageName(sectionPageName || "");

  const router = useRouter();
  const form = useForm<CreateDedicatoriaSchema>({
    resolver: zodResolver(createDedicatoriaSchema),
    defaultValues: {
      content: "",
    },
  });
  // async function onSubmit(input: CreateDedicatoriaSchema) {
  //   console.log("1111");
  //   console.log("noteToEdit");
  // }

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   console.log("input", input);
  //   e.preventDefault();
  // };

  // async function onSubmit(input: CreateDedicatoriaSchema) {
  //   console.log("noteToEdit", noteToEdit);

  //   try {
  //     // if (noteToEdit) {
  //     //   const response = await fetch("/api/section", {
  //     //     method: "PUT",
  //     //     body: JSON.stringify({
  //     //       id: noteToEdit.id,
  //     //       ...input,
  //     //     }),
  //     //   });
  //     //   if (!response.ok) throw Error("Status code: " + response.status);
  //     // } else {
  //     const response = await fetch("/api/section", {
  //       method: "POST",
  //       body: JSON.stringify(input),
  //     });

  //     if (!response.ok) throw new Error("Status Code" + response.status);
  //     form.reset();
  //     // }
  //     // handleSubmit(input);
  //     router.refresh();
  //     // setOpen(false);
  //   } catch (error) {
  //     console.error(error);
  //     alert("Something went wrong , please try again later.");
  //   }

  //   // alert(JSON.stringify(input));
  // }

  const onSave = async () => {
    try {
      console.log("onsave111");

      if (!contentData) {
        const response = await fetch("/api/antecedentes", {
          method: "POST",
          body: JSON.stringify({
            section: match[1],
            content: messages[1]?.content,
          }),
        });
        if (!response.ok) throw new Error("Status Code" + response.status);
      } else {
        const response = await fetch("/api/antecedentes", {
          method: "PUT",
          body: JSON.stringify({
            id: contentData?.id,
            section: match[1],
            content: messages[1]?.content,
          }),
        });
        if (!response.ok) throw new Error("Status Code" + response.status);
      }

      // form.reset();
      // }
      // handleSubmit(input);
      router.refresh();

      // setOpen(false);
    } catch (error) {
      console.error(error);
      alert("Sucedio algo mal, por favor intente de nuevo.");
    }
  };

  return (
    <>
      <div className="underline">Antecedentes</div>
      <br />

      <form onSubmit={handleSubmit} className="m-3  gap-1">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Palabras Clave..."
          // ref={inputRef}
        />
        <br />

        <Button type="submit">Preguntar</Button>
      </form>
      <br />

      <br />
      {contentData &&
        contentData.content.split("\\n\\n").map((line: any, index: any) => (
          <div key={index} className="m-3  gap-1">
            {line}
            <br />
            <br />
          </div>
        ))}

      {messages[1]?.content.split("\\n\\n").map((line, index) => (
        <div key={index} className="m-3  gap-1">
          {line}
          <br />
          <br />
        </div>
      ))}
      {messages[1]?.content && (
        <Button className="m-3  gap-1" type="submit" onClick={() => onSave()}>
          Guardar Respuesta
        </Button>
      )}
      <FileUpload />
    </>
  );
}
