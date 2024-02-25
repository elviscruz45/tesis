// import makeScopusApiRequest from '../utils/api'; // Adjust path as needed
import makeMendeleyApiRequest from "../../../lib/mendeley";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const MendeleyRequest = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState<any>(null);

  // const handleSearch = async (query: any) => {
  //   try {
  //     const data = await makeMendeleyApiRequest(query,token);
  //     setSearchResults(data);
  //   } catch (error) {
  //     setError((error as Error)?.message);
  //   }
  // };

  // ... rest of your component logic
  return (
    <div>
      {/* Search input and button */}
      {/* <Button onClick={() => handleSearch("caballos")}> MENDELEY Search</Button> */}
      {error && <p>Error: {error}</p>}
      {searchResults && (
        // Display search results here, e.g., using dangerouslySetInnerHTML
        <div dangerouslySetInnerHTML={{ __html: searchResults }} />
      )}
    </div>
  );
};

export default MendeleyRequest;
