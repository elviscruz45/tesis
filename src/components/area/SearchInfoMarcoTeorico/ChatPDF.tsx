import React, { useState } from "react";
import axios from "axios";
import { set } from "zod";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Bot, Save } from "lucide-react";
import SubItemChatWithPdf from "./ChatPDFSubItem";

const ChatWithPdf = ({
  sourceId,
  prompt,
  setSchemaMarcoTeorico,
}: {
  sourceId: string;
  prompt?: any;
  setSchemaMarcoTeorico?: any;
}) => {
  // const [sourceId, setSourceId] = useState(""); // Replace with actual source ID
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<string>("");
  const [errores, setErrores] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState(
    "Crea subtitulos de cada seccion y resume cada sección (incluyendo las referencias que consideres necesarias para este resumen, no hace falta mencionar a todas) y las cifras (si es que las hay)",
  );

  const [customizedPrompt, setCustomizedPrompt] = useState("");

  const lines = response?.split("\n") || [];

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    setErrores(null);

    try {
      const response = await axios.post(
        "https://api.chatpdf.com/v1/chats/message",
        {
          sourceId,
          messages: [
            // {
            //   role: "user",
            //   content:
            //     "podrias predecir con datos especificos que podria escribir para el dia 24 de febrero iterando los datos de los dias anteriores ",
            // },
            {
              role: "user",
              content: prompt ?? initialPrompt,
            },
          ],
        },
        {
          headers: {
            "x-api-key": "sec_CGNMZENbOBE46FZvWlGfmGCLoqy9vgiI", // Replace with your actual API key
            "Content-Type": "application/json",
          },
        },
      );

      setResponse(response.data.content);
      setSchemaMarcoTeorico(response.data.content);
    } catch (error) {
      console.error("Error sending chat message:", error);
      setErrores("An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  // const onSave = async () => {
  //   try {

  //     // if (!contentData) {
  //     //   const response = await fetch("/api/antecedentes", {
  //     //     method: "POST",
  //     //     body: JSON.stringify({
  //     //       section: match[1],
  //     //       content: messages[1]?.content,
  //     //     }),
  //     //   });
  //     //   if (!response.ok) throw new Error("Status Code" + response.status);
  //     // } else {
  //     //   const response = await fetch("/api/antecedentes", {
  //     //     method: "PUT",
  //     //     body: JSON.stringify({
  //     //       id: contentData?.id,
  //     //       section: match[1],
  //     //       content: messages[1]?.content,
  //     //     }),
  //     //   });
  //     //   if (!response.ok) throw new Error("Status Code" + response.status);
  //     // }

  //     // // form.reset();
  //     // // }
  //     // // handleSubmit(input);
  //     // router.refresh();

  //     // setOpen(false);
  //   } catch (error) {
  //     console.error(error);
  //     alert("Sucedio algo mal, por favor intente de nuevo.");
  //   }
  // };
  // const askPdf = async (line: string) => {
  //   try {
  //     const response = await axios.post(
  //       "https://api.chatpdf.com/v1/chats/message",
  //       {
  //         sourceId,
  //         messages: [
  //           // {
  //           //   role: "user",
  //           //   content:
  //           //     "podrias predecir con datos especificos que podria escribir para el dia 24 de febrero iterando los datos de los dias anteriores ",
  //           // },
  //           {
  //             role: "user",
  //             content: `Completar y parafrasear los siguiente: ${line}`,
  //           },
  //         ],
  //       },
  //       {
  //         headers: {
  //           "x-api-key": "sec_CGNMZENbOBE46FZvWlGfmGCLoqy9vgiI", // Replace with your actual API key
  //           "Content-Type": "application/json",
  //         },
  //       },
  //     );

  //     setResponse(response.data.content);
  //     setSchemaMarcoTeorico(response.data.content);
  //   } catch (error) {
  //     console.error("Error sending chat message:", error);
  //     setErrores("An error occurred.");
  //   }
  // };

  return (
    <>
      <form onSubmit={handleSubmit} className="m-3  gap-1">
        <br />
        <br />

        <div className="text-center  underline">{prompt ?? initialPrompt}</div>

        <br />
        <div className="text-center  underline">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Pensado para Responder..." : "Generar Resultado"}
          </Button>
        </div>
        <br />
        <br />

        {errores && <p className="error">{errores}</p>}
      </form>
      {response &&
        lines?.map((line: string) => {
          return (
            <div className="">
              <div className="text-xl">{line}</div>
              {line.length > 2 && line.match(/(\d+\.)/) && (
                <SubItemChatWithPdf sourceId={sourceId} line={line} />
              )}
            </div>
          );
        })}
    </>
  );
};

export default ChatWithPdf;
