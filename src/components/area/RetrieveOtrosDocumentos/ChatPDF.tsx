import React, { useState } from "react";
import axios from "axios";
import { set } from "zod";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
// import CustomizedChatWithPdf from "./CustomizedChatPDF";
import { Bot, Save } from "lucide-react";
import OptionList from "./ListOptions";

const ChatWithPdf = ({
  sourceId,
  prompt,
  setSchemaMarcoTeorico,
  categoryList,
}: {
  sourceId: string;
  prompt?: any;
  setSchemaMarcoTeorico?: any;
  categoryList?: any;
}) => {
  // const [sourceId, setSourceId] = useState(""); // Replace with actual source ID
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [errores, setErrores] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [option, setOption] = useState("");
  const [guardadoExitoso, setGuardadoExitoso] = useState(false);
  const [isLoadingguardadoExitoso, setIsLoadingguardadoExitoso] =
    useState(false);

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
              content: `En un parrafo con maxima cantidad de palabras posibles,
               resumir en el idioma español el siguiente tema del archivo: ${prompt}.
             Incluir datos numericos,estadisticos y la referencia en formato APA`,
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
      setResponse(response.data.content.split("\n\n"));
      console.log("response", response.data.content);
    } catch (error) {
      console.log(error);

      setErrores("An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  const onSave = async () => {
    const area = "antecedentes";
    const content = response[0] || "";
    try {
      setIsLoadingguardadoExitoso(true);

      const response = await fetch("/api/section", {
        method: "POST",
        body: JSON.stringify({
          title: prompt,
          title4: option,
          content: content,
          section: "anonimo",
          area: "anonimo",
          Nivel: "4",
        }),
      });
      if (!response.ok) throw new Error("Status Code" + response.status);
      setIsLoadingguardadoExitoso(false);

      setGuardadoExitoso(true);
    } catch (error) {
      console.error(error);
      alert("Sucedio algo mal, por favor intente de nuevo.");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="m-3  gap-1">
        {/* {true && <CustomizedChatWithPdf sourceId={sourceId} />} */}

        <br />
        <div className="text-center  underline">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Pensando..." : "Preguntar"}
          </Button>
        </div>
        <br />
        <br />

        {/* <div className="text-center  underline">Respuesta:</div> */}
        {response && <p> {response}</p>}
        {errores && <p className="error">{errores}</p>}
      </form>
      {response && (
        <OptionList categoryList={categoryList} setOption={setOption} />
      )}
      {response && option && (
        <Button
          size="sm"
          className="m-3 "
          onClick={() => onSave()}
          disabled={isLoadingguardadoExitoso || guardadoExitoso}
        >
          <Save size={20} />
        </Button>
      )}
      {guardadoExitoso && (
        <p className="text-center text-green-500">Guardado Exitoso</p>
      )}
    </>
  );
};

export default ChatWithPdf;
