// import makeScopusApiRequest from '../utils/api'; // Adjust path as needed
import makeMendeleyApiRequest from "../../../../../lib/mendeley";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ResultItem } from "./Item";
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
const MendeleyRequest = ({
  token,
  sectionName,
}: {
  token: string;
  sectionName: string;
}) => {
  const [searchResults, setSearchResults] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  // const [year, setYear] = useState("2019-01-01");
  const [text, setText] = useState("");
  const [area, setArea] = useState("any area");
  const [isLoading, setIsLoading] = useState(false);
  // const [saveSearch, setSaveSearch] = useState<any>([]);

  const handleSearch = async () => {
    if (!text) {
      setError("Ingresa una consulta para buscar...");
      return;
    }
    const query = `${text}`;
    setIsLoading(true);
    try {
      const data = await makeMendeleyApiRequest(query, token);

      setSearchResults(data);
      console.log("error11111", data);
    } catch (error) {
      console.log("error11111", error);
      setError((error as Error)?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // const saveToMongoDB = async (result: any) => {

  //   try {

  //     const response = await fetch("/api/saveInformation", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         title: result?.title,
  //         content: result,
  //       }),
  //     });
  //     if (!response.ok) throw new Error("Status Code" + response.status);
  //   } catch (error) {
  //     console.error(error);
  //     alert("Sucedio algo mal, por favor intente de nuevo.");
  //   }
  // };

  // const handleSaveSearch = (item: any) => {
  //   setSaveSearch(() => [...saveSearch, item]);
  // };

  // const goToSCIHUB = (doi: string) => {
  //   // window.location.href = `https://sci-hub.se/${doi}`;
  //   window.open(`https://sci-hub.se/${doi}`, "_blank");
  // };

  return (
    <>
      <div>
        {/* Search input and button */}
        <div>
          Buscar investigaciones con una antigüedad máxima de 10 años que tengan
          en cuenta a estas dos variables . investigaciones que se hayan hecho
          en el sector
        </div>
        <br />
        {/* <Input
          value={year}
          type="date"
          onChange={(e: any) => setYear(e.target.value)}
          // onChange={(e: any) => setYear(new Date(e.target.value))}
          placeholder="Años de Antiguedad..."
          // ref={inputRef}
        /> */}
        <div className="flex items-start text-xl">
          <Input
            className="border-gray-300"
            // value={input}
            onChange={(e: any) => setText(e.target.value)}
            placeholder="Escribe el tema..."
            // ref={inputRef}
          />
          <Button
            size="sm"
            className="m-3 "
            onClick={() => handleSearch()}
            disabled={isLoading}
          >
            <SendHorizontal size={20} />
          </Button>
        </div>

        {/* 
        <Input
          // value={input}
          onChange={(e: any) => setArea(e.target.value)}
          placeholder="Area de Investigacion ..."
          // ref={inputRef}
        /> */}
        {/* <div className=" flex justify-center ">
          <Button onClick={() => handleSearch()} disabled={isLoading}>
            {isLoading
              ? "Buscando las mejores respuestas"
              : "Buscar en Mendeley"}
          </Button>
        </div> */}

        {error && <p className="text-red-500">{error}... </p>}
        {searchResults &&
          searchResults.map((result: any) => (
            <ResultItem key={result?.identifiers?.doi} result={result} />
          ))}
        {/* {searchResults &&
          searchResults.map((result: any) => {
            const [isSaved, setIsSaved] = useState(false);

            return (
              <div key={result?.identifiers?.doi} className=" ">
                Titulo: {result.title}
                <br />
                DOI: {result?.identifiers?.doi}
                <br />
                Tipo: {result.type}
                <br />
                Recurso: {result.source}
                <br />
                Año:{result.year}
                <br />
                <a href={result.link} target="_blank" rel="noopener noreferrer">
                  {result.link}
                </a>
                <br />
                <Button onClick={() => goToSCIHUB(result?.identifiers.doi)}>
                  Ver en Sci-Hub
                </Button>
                <br />
                <br />
                <Button
                  onClick={() => {
                    saveToMongoDB(result);
                    setIsSaved(true);
                  }}
                  disabled={isSaved}
                >
                  {isSaved ? "Guardado" : "Guardar"}
                </Button>
                <br />
                <br />
                <br />
              </div>
            );
          })} */}
      </div>
      <br />
    </>
  );
};

export default MendeleyRequest;