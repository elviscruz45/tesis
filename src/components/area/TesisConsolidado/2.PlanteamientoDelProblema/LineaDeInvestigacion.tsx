// "use client";
// import {
//   createDedicatoriaSchema,
//   CreateDedicatoriaSchema,
// } from "@/lib/validation/sectionContent";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import { useChat } from "ai/react";
// import { cn } from "@/lib/utils";
// import { Bot, Trash, XCircle } from "lucide-react";
// import { usePathname, useSearchParams } from "next/navigation";
// import { useState } from "react";
// import axios from "axios";

// interface Informacion {
//   open?: boolean;
//   setOpen?: (open: boolean) => void;
//   contentData?: any;
//   sectionName?: any;
// }

// export default function LineaDeInvestigacion({
//   open,
//   setOpen,
//   contentData,
//   sectionName,
// }: Informacion) {
//   const {
//     messages,
//     input,
//     handleInputChange,
//     handleSubmit,
//     setMessages,
//     isLoading,
//     error,
//   } = useChat();

//   const [newMendeleyToken, setNewMendeleyToken] = useState("");
//   const [data, setData] = useState<any>(null);
//   const [token, setToken] = useState<string>("");
//   const [errors, setErrors] = useState<any>(null);
//   const [isActivated, setIsActivated] = useState(false);
//   const [urlPDF, setUrlPDF] = useState<string>("");
//   const [isSaved, setIsSaved] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [savingMarcoTeorico, setSavingMarcoTeorico] = useState(false);
//   const [fileName, setFileName] = useState<string>("");

//   const pathname = usePathname();
//   const regex = /\/([^\/]+)$/;
//   const match = pathname?.match(regex) || [];

//   const router = useRouter();
//   const form = useForm<CreateDedicatoriaSchema>({
//     resolver: zodResolver(createDedicatoriaSchema),
//     defaultValues: {
//       content: "",
//     },
//   });

//   const saveToMongoDB = async (area: string) => {
//     setSaving(true);

//     try {
//       const response = await fetch("/api/saveInformation", {
//         method: "POST",
//         body: JSON.stringify({
//           title: fileName,
//           content: {
//             link: urlPDF,
//             identifier: { doi: "No DOI" },
//             source: "No Source",
//             type: "No Type",
//             year: 2000,
//           },
//           PDFlink: urlPDF,
//           area: area,
//         }),
//       });
//       if (!response.ok) throw new Error("Status Code" + response.status);
//       setSaving(false);
//       setIsSaved(true);
//     } catch (error) {
//       console.error(error);
//       alert("Sucedio algo mal, por favor intente de nuevo.");
//     }
//   };
//   return (
//     <>
//       <div className="text-xl">1.1. Línea de investigación</div>
//     </>
//   );
// }
