// import makeScopusApiRequest from '../utils/api'; // Adjust path as needed
import makeMendeleyApiRequest from "../../../lib/mendeley";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ResultItem } from "./Item";

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

  // console.log(year);
  console.log(text);
  console.log(area);

  const handleSearch = async () => {
    if (!text) {
      setError("Please enter a search term");
      return;
    }
    const query = `${text}`;
    setIsLoading(true);
    try {
      const data = await makeMendeleyApiRequest(query, token);
      setSearchResults(data);
    } catch (error) {
      setError((error as Error)?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        {/* Search input and button */}
        <div>
          Buscar Reviews o Estados del Arte (con una antigüedad máxima de 10
          años) que tengan en cuenta a estas dos variables.
        </div>
        <br />
        <Input
          // value={input}
          onChange={(e: any) => setText(e.target.value)}
          placeholder="Escribe las variables ..."
          // ref={inputRef}
        />
        <br />

        <Input
          // value={input}
          onChange={(e: any) => setArea(e.target.value)}
          placeholder="Area de Investigacion ..."
          // ref={inputRef}
        />
        <br />
        <div className=" flex justify-center ">
          <Button onClick={() => handleSearch()} disabled={isLoading}>
            {isLoading
              ? "Buscando las mejores respuestas"
              : "Buscar en Mendeley"}{" "}
          </Button>
        </div>

        <br />
        <br />

        {error && <p>Activar Token: {error} </p>}
        {searchResults &&
          searchResults.map((result: any) => (
            <ResultItem key={result?.identifiers?.doi} result={result} />
          ))}
      </div>
      <br />
    </>
  );
};

export default MendeleyRequest;
