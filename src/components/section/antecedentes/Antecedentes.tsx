"use client";
import {
  createDedicatoriaSchema,
  CreateDedicatoriaSchema,
} from "@/lib/validation/dedicatoria";
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
import ScopusRequest from "./Scopus";
import MendeleyRequest from "./Mendeley";

interface Antedentes {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  contentData?: any;
}

export default function Antecedentes({
  open,
  setOpen,
  contentData,
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
  const regex = /\/([^\/]+)$/;
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

      form.reset();
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Sucedio algo mal, por favor intente de nuevo.");
    }
  };

  return (
    <>
      <div className=" text-center text-2xl ">Antecedentes</div>
      <MendeleyRequest />

      <br />
      <br />
      {/* <FileUpload /> */}
      <br />
    </>
  );
}
