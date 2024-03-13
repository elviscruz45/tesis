"use client";
import {
  createDedicatoriaSchema,
  CreateDedicatoriaSchema,
} from "@/lib/validation/sectionContent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useChat } from "ai/react";
import { cn } from "@/lib/utils";
import { Bot, Trash, XCircle } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";

interface Informacion {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  contentData?: any;
  sectionName?: any;
  totalContent?: any;
}

export default function MarcoTeorico({
  open,
  setOpen,
  contentData,
  sectionName,
  totalContent,
}: Informacion) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat();

  const [newMendeleyToken, setNewMendeleyToken] = useState("");
  const [data, setData] = useState<any>(null);
  const [token, setToken] = useState<string>("");
  const [errors, setErrors] = useState<any>(null);
  const [isActivated, setIsActivated] = useState(false);
  const [urlPDF, setUrlPDF] = useState<string>("");
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savingMarcoTeorico, setSavingMarcoTeorico] = useState(false);
  const [fileName, setFileName] = useState<string>("");

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
  return (
    <>
      {totalContent.map((result: any) => (
        <>
          <div>
            <br />
          </div>
          <div key={result?.title} className="text-xl">
            {result.title}
          </div>
          <div key={result?.content} className="">
            {result.content}
          </div>
        </>
      ))}
    </>
  );
}
