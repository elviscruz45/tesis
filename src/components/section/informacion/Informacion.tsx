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
import MendeleyRequest from "./Mendeley";
import { useState } from "react";
import axios from "axios";

interface Informacion {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  contentData?: any;
  sectionName?: any;
}

export default function Informacion({
  open,
  setOpen,
  contentData,
  sectionName,
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

  const ActivateToken = async () => {
    setIsActivated(true);
    try {
      const response = await axios.post(
        "https://api.mendeley.com/oauth/token",
        new URLSearchParams({
          grant_type: "client_credentials",
          scope: "all",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from("17791:3WY9BgHN0GMKxjEI").toString("base64")}`,
          },
        },
      );
      setData(response.data);
      setToken(response.data.access_token);
      console.log("TOKENNNNN", response.data);
    } catch (errors) {
      setErrors(errors);
      console.log("TOKENNNNNERROR", errors);
    } finally {
      setTimeout(() => {
        setIsActivated(false);
      }, 3600 * 1000);
    }
  };

  return (
    <>
      <div className=" text-center text-2xl ">Informacion</div>

      <br />
      <br />
      <div> Crear Nuevo Token</div>
      {/* <Input
        // value={input}
        onChange={(e: any) => setNewMendeleyToken(e.target.value)}
        placeholder="Area de Investigacion ..."
        // ref={inputRef}
      /> */}
      <br />

      <Button onClick={() => ActivateToken()} disabled={isActivated}>
        {isActivated ? " Token Activado" : " Activar Token"}
      </Button>
      <br />
      <br />

      <div className="font-bold"> Busqueda de Informacion</div>
      <br />

      <MendeleyRequest token={token} sectionName={sectionName} />
      <br />
      <br />
      <br />
    </>
  );
}
