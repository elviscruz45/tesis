import React, { useState } from "react";
import axios from "axios";
import { set } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const ChatWithPdf = ({ sourceId }: { sourceId: string }) => {
  // const [sourceId, setSourceId] = useState(""); // Replace with actual source ID
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [errores, setErrores] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState(
    "En 500 palabras, crea subtitulos de cada seccion y resume cada sección (incluyendo las referencias que consideres necesarias para este resumen, no hace falta mencionar a todas) y las cifras (si es que las hay)",
  );

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
              content: initialPrompt,
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
      // setError({ message: error });
      setErrores("An error occurred.");
      // setErrores(error?.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="m-3  gap-1">
      <br />

      <br />
      <div>{initialPrompt}</div>
      <br />
      <label htmlFor="message">Cambiar Prompt:</label>
      <br />

      <Input
        type="text"
        id="message"
        placeholder="Preguntar sobre el Archivo..."
        value={message}
        onChange={(e) => setInitialPrompt(e.target.value)}
      />
      <br />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Pensado para Responder..." : "Generar Resumen"}
      </Button>
      <br />
      <div>Respuesta:</div>
      {response && <p> {response}</p>}
      {errores && <p className="error">{errores}</p>}
    </form>
  );
};

export default ChatWithPdf;
