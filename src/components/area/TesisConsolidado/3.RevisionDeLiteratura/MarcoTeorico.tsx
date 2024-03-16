"use client";
// import {
//   createDedicatoriaSchema,
//   CreateDedicatoriaSchema,
// } from "@/lib/validation/sectionContent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/buttonsmall";
import { cn } from "@/lib/utils";
// import { Bot, Trash, XCircle } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import AddEditNoteDialogNivel5 from "@/components/AddEditNoteDialogNivel5";
import { MarcoTeoricoItem } from "./MarcoTeoricoItem";

import {
  Bot,
  Save,
  NotebookPen,
  Brain,
  Undo2,
  FileCode,
  SendHorizontal,
  DatabaseBackup,
  RefreshCw,
} from "lucide-react";
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
  console.log("totalContent1111", totalContent);
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
  const [showEditDialog, setShowEditDialog] = useState(false);

  const pathname = usePathname();
  const regex = /\/([^\/]+)$/;
  const match = pathname?.match(regex) || [];

  const router = useRouter();
  // const form = useForm<CreateDedicatoriaSchema>({
  //   resolver: zodResolver(createDedicatoriaSchema),
  //   defaultValues: {
  //     content: "",
  //   },
  // });

  const refresh = async () => {
    console.log("aaaa");
    router.refresh();
    console.log("bbbb");
  };
  const edit = async () => {
    setShowEditDialog(true);
  };
  return (
    <>
      {totalContent?.map((result: any, index: any) => (
        <div className="mb-4 rounded-lg  border-gray-300 p-6  shadow-md">
          <MarcoTeoricoItem result={result} index={index} />
        </div>
      ))}
      <div className="flex items-center justify-center">
        <Button
          size="sm"
          className="m-3"
          onClick={() => refresh()}
          // disabled={loading1}
        >
          <RefreshCw size={20} />
        </Button>
      </div>
    </>
  );
}
