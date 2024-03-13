import React, { useState } from "react";
import axios from "axios";
import { set } from "zod";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Bot, Save } from "lucide-react";

const SubItemChatWithPdf = ({
  sourceId,
  prompt,
  setSchemaMarcoTeorico,
  line,
}: {
  sourceId: string;
  prompt?: any;
  setSchemaMarcoTeorico?: any;
  line: string;
}) => {
  // const [sourceId, setSourceId] = useState(""); // Replace with actual source ID
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<string>("");
  const [errores, setErrores] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState(
    "En 500 palabras, crea subtitulos de cada seccion y resume cada sección (incluyendo las referencias que consideres necesarias para este resumen, no hace falta mencionar a todas) y las cifras (si es que las hay)",
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
  const onSave = async () => {
    const area = "marco_teorico";
    const content = response;

    try {
      const response = await fetch("/api/section", {
        method: "POST",
        body: JSON.stringify({
          title: line,
          content: content,
          section: "marco_teorico",
          area: area,
        }),
      });
      if (!response.ok) throw new Error("Status Code" + response.status);
    } catch (error) {
      console.error(error);
      alert("Sucedio algo mal, por favor intente de nuevo.");
    }
  };
  const askPdf = async () => {
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
              content: `Este texto estara en el marco teorico de una tesis cientifica, Completar y parafrasear lo siguiente : ${line} , incluir datos o cifras si hubiese y la referencia y si es posible en formato APA`,
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
    }
  };

  return (
    <>
      <div>
        <Button size="sm" className="m-3" onClick={() => askPdf()}>
          <Bot size={20} />
        </Button>
        <Button size="sm" className="m-3 " onClick={() => onSave()}>
          <Save size={20} />
        </Button>
      </div>

      {response && <div>{response}</div>}
    </>
  );
};

export default SubItemChatWithPdf;