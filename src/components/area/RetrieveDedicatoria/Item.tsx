"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Bot,
  Save,
  NotebookPen,
  Brain,
  Undo2,
  FileCode,
  SendHorizontal,
  DatabaseBackup,
} from "lucide-react";
import AddEditNoteDialogNivel5 from "@/components/AddEditNoteDialogNivel5";
import { Input } from "@/components/ui/input";

export const ResultItem = ({
  result,
  allInfo,
  index,
  titulo,
  chatGPTresult,
  userId,
}: any) => {
  const [newData, setNewData] = useState<string>("");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [newQuery, setNewQuery] = useState(false);
  const [text, setText] = useState("");

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);
  const [activateActualizar, setActivateActualizar] = useState(false);
  const [newTextSaved, setNewTextSaved] = useState("");
  const [disabledSave, setDisabledSave] = useState(false);
  const router = useRouter();

  const guardar = async () => {
    console.log("result", result);
    try {
      setLoading3(true);

      const response = await fetch("/api/section", {
        method: "POST",
        body: JSON.stringify({
          title: "no hay titulo",
          title4: "dedicatoria",
          Nivel: "5",
          content: newData === "" ? chatGPTresult : newData,
          section: "dedicatoria",
          area: "dedicatoria",
        }),
      });
      if (!response.ok) throw new Error("Status Code" + response.status);
      // if (area === "Antecedentes") {
      //   setSavingAntecedentes(false);
      //   setIsSaved(true);
      // } else {
      //   setSavingMarcoTeorico(false);
      //   setIsSaved(true);
      // }
      setNewTextSaved(newData);
      setNewData("");
      setNewQuery(false);
      setLoading3(false);
      setActivateActualizar(true);
      setDisabledSave(true);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Sucedio algo mal, por favor intente de nuevo.");
    }
  };

  // const parafrasear = async () => {
  //   try {
  //     setLoading1(true);
  //     const systemMessage: any = {
  //       role: "system",
  //       content:
  //         "Eres un especialista en crear tesis para graduados profesionales. Tus respuestas deben estar diseñadas para ser incluidas en el documento de tesis. Usa adjetivos no comunes para que el texto sea original , tener muy en cuenta que el texto no debe ser detectable por turnitin",
  //     };
  //     const userAssitantMessage: any = [
  //       {
  //         role: "user",
  //         content: `Mejora, parafrasea y añade mas informacion para que sea mas original y no sea detectable por turnitin sobre el siguiente texto: ${result?.content}. Incluir datos numericos,estadisticos y la referencia en formato APA`,
  //       },
  //     ];

  //     const response = await fetch("/api/openai", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         model: "gpt-3.5-turbo",
  //         stream: true,
  //         messages: [systemMessage, ...userAssitantMessage],
  //       }),
  //     });

  //     const data = await response.json();
  //     console.log(data);
  //     setNewData(data);
  //     setLoading1(false);
  //   } catch (error) {
  //     console.error("Error sending chat message:", error);
  //     // setErrores("An error occurred.");
  //   }
  // };

  const mostrarConsultarGPT = async () => {
    setNewQuery((item) => !item);
  };
  const edit = async () => {
    setShowEditDialog(true);
  };
  // const estandarizar = async () => {
  //   try {
  //     setLoading2(true);

  //     const systemMessage: any = {
  //       role: "system",
  //       content:
  //         "Eres un especialista en crear tesis para graduados profesionales. Tus respuestas deben estar diseñadas para ser incluidas en el documento de tesis. Usa adjetivos no comunes para que el texto sea original , tener muy en cuenta que el texto no debe ser detectable por turnitin",
  //     };
  //     const userAssitantMessage: any = [
  //       // {
  //       //   role: "user",
  //       //   content: `Mejora, parafrasea y añade mas informacion para que sea mas original y no sea detectable por turnitin sobre el siguiente texto: ${result?.content}`,
  //       // },
  //       {
  //         role: "user",
  //         content: `Reescribe, mejora, parafrasea este parrafo: ${result?.content} manteniendo la misma tonalidad y estilo de redaccion de este parrafo : ${allInfo[0]?.content} y añade mas informacion para que sea mas original y no sea detectable por turnitin. Incluir datos numericos,estadisticos y la referencia en formato APA`,
  //       },
  //     ];

  //     const response = await fetch("/api/openai", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         model: "gpt-3.5-turbo",
  //         stream: true,
  //         messages: [systemMessage, ...userAssitantMessage],
  //       }),
  //     });

  //     const data = await response.json();
  //     console.log(data);
  //     setNewData(data);
  //     setLoading2(false);
  //   } catch (error) {
  //     console.error("Error sending chat message:", error);
  //     // setErrores("An error occurred.");
  //   }
  // };

  const regresar = async () => {
    console.log("regresar");
    setNewData("");
    setNewTextSaved("");
  };

  const consultarGPT = async () => {
    try {
      setLoading4(true);
      const systemMessage: any = {
        role: "system",
        content: `. Eres un especialista en crear tesis para graduados profesionales. Tus respuestas deben estar diseñadas para ser incluidas en el documento de tesis. Usa adjetivos no comunes para que el texto sea original , tener muy en cuenta que el texto no debe ser detectable por turnitin. `,
      };
      const userAssitantMessage: any = [
        {
          role: "user",
          content: `Tienes el siguiente texto:${chatGPTresult} , se quiere modificarlo de la siguiente manera:${text}`,
        },
        // {
        //   role: "assistant",
        //   content:
        //     "indicame cual es tu carrera profesional que terminaste para hacer la dedicatoria mas personalizada",
        // },
      ];

      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          stream: true,
          messages: [systemMessage, ...userAssitantMessage],
        }),
      });

      const data = await response.json();
      console.log(data);
      setNewData(data);
      setLoading4(false);
    } catch (error) {
      console.error("Error sending chat message:", error);
      // setErrores("An error occurred.");
    }
  };
  // const consolidado = async () => {
  //   try {
  //     console.log("consolidado 11111");
  //     const response = await fetch("/api/section", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         title: result?.title,
  //         title4: "informacion_guardada_antecedentes",
  //         Nivel: "5",
  //         content: result?.content,
  //         section: "marco_teorico",
  //         area: "marco_teorico",
  //       }),
  //     });
  //     if (!response.ok) throw new Error("Status Code" + response.status);
  //     setLoading5(true);
  //     console.log("consolidado 222");
  //   } catch (error) {
  //     console.error(error);
  //     alert("Sucedio algo mal, por favor intente de nuevo.");
  //   }
  // };
  return (
    <div className="mb-2 border border-white">
      <div>
        <div
          // key={result?.title}
          className="flex text-xl"
        >
          <Button
            size="sm"
            className="m-3 "
            onClick={() => guardar()}
            disabled={loading3}
          >
            <DatabaseBackup size={20} />
          </Button>
          {/* {result.title} */}

          {/* <Button
            size="sm"
            className="m-3"
            onClick={() => parafrasear()}
            disabled={loading1}
          >
            <Bot size={20} />
          </Button> */}
          <Button
            size="sm"
            className="m-3"
            onClick={() => mostrarConsultarGPT()}
          >
            <FileCode size={20} />
          </Button>

          <Button
            disabled={!activateActualizar}
            size="sm"
            className="m-3"
            onClick={() => edit()}
          >
            <NotebookPen size={20} />
          </Button>
          {/* {index !== 0 && (
            <Button
              size="sm"
              className="m-3"
              onClick={() => estandarizar()}
              disabled={loading2}
            >
              <Brain size={20} />
            </Button>
          )} */}

          <Button size="sm" className="m-3 " onClick={() => regresar()}>
            <Undo2 size={20} />
          </Button>
          {/* <Button
            size="sm"
            className="m-3 "
            onClick={() => consolidado()}
            disabled={loading5}
          >
            <DatabaseBackup size={20} />
          </Button> */}
        </div>
      </div>
      <div>
        <br />
      </div>
      {newData && <div className="mx-4 text-red-500">Version Original</div>}
      {newTextSaved ? (
        <div className="mx-4">{newTextSaved}</div>
      ) : (
        <div className="mx-4">{chatGPTresult}</div>
      )}
      <br />
      <br />

      {newQuery && (
        <div className="mx-4 flex items-start text-xl">
          <Input
            // value={input}
            onChange={(e: any) => setText(e.target.value)}
            placeholder="Modificar..."
            // ref={inputRef}
          />
          <Button
            size="sm"
            className="m-3 "
            onClick={() => consultarGPT()}
            disabled={loading4}
          >
            <SendHorizontal size={20} />
          </Button>
        </div>
      )}

      {newData && (
        <>
          <div className="mx-4 text-green-500"> Nueva Version</div>
          <div className="mx-4">{newData}</div>
        </>
      )}

      <AddEditNoteDialogNivel5
        open={showEditDialog}
        setOpen={setShowEditDialog}
        setNewTextSaved={setNewTextSaved}
        noteToEdit={{
          id: "prueba",
          title: "no hay titulo",
          title2: "",
          title3: null,
          title4: null,
          title5: null,
          title6: null,
          title7: null,
          title8: null,
          Nivel: "5",
          content: newTextSaved ? newTextSaved : chatGPTresult,
          userId: userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        }}
      />
    </div>
  );
};
