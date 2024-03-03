import React, { useState } from "react";
import axios from "axios";
import { set } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

// const CustomizedChatWithPdf = ({
//   sourceId,
//   prompt,
// }: {
//   sourceId: string;
//   prompt?: any;
// }) => {

const CustomizedChatWithPdf = ({ sourceId }: { sourceId: string }) => {
  // const [sourceId, setSourceId] = useState(""); // Replace with actual source ID
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [errores, setErrores] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState(
    "En 500 palabras, crea subtitulos de cada seccion y resume cada sección (incluyendo las referencias que consideres necesarias para este resumen, no hace falta mencionar a todas) y las cifras (si es que las hay)",
  );
  const [customizedPrompt, setCustomizedPrompt] = useState("");
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
    } catch (error) {
      console.error("Error sending chat message:", error);
      setErrores("An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Input
      type="text"
      id="message"
      placeholder="Pregunta sobre el Archivo..."
      value={message}
      onChange={(e) => setCustomizedPrompt(e.target.value)}
    />
  );
};

export default CustomizedChatWithPdf;
