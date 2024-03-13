"use client";
import {
  createDedicatoriaSchema,
  CreateDedicatoriaSchema,
} from "@/lib/validation/sectionContent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import LoadingButton from "../ui/loading-button";
import { useRouter } from "next/navigation";
import { Note } from "@prisma/client";
import { useChat } from "ai/react";
import { Button } from "../ui/button";
import { Message } from "ai";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Bot, Trash, XCircle } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import { useState } from "react";

interface Dedicatoria {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  contentData?: any;
}

export default function MarcoTeorico({
  open,
  setOpen,
  contentData,
}: Dedicatoria) {
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

  const router = useRouter();
  const form = useForm<CreateDedicatoriaSchema>({
    resolver: zodResolver(createDedicatoriaSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSave = async () => {
    try {
      if (!contentData) {
        const response = await fetch("/api/section", {
          method: "POST",
          body: JSON.stringify({
            section: match[1],
            content: messages[1]?.content,
          }),
        });
        if (!response.ok) throw new Error("Status Code" + response.status);
      } else {
        const response = await fetch("/api/section", {
          method: "PUT",
          body: JSON.stringify({
            id: contentData?.id,
            section: match[1],
            content: messages[1]?.content,
          }),
        });
        if (!response.ok) throw new Error("Status Code" + response.status);
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Sucedio algo mal, por favor intente de nuevo.");
    }
  };

  return (
    <>
      <div className="underline">Marco Teorico</div>
      <br />

      <form onSubmit={handleSubmit} className="m-3  gap-1">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Palabras Clave..."
        />
        <br />

        <Button type="submit">Preguntar</Button>
      </form>
    </>
  );
}
