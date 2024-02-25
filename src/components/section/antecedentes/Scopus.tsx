// import makeScopusApiRequest from '../utils/api'; // Adjust path as needed
import makeScopusApiRequest from "../../../lib/scopus";
import { useState } from "react";

const ScopusRequest = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState<any>(null);

  const handleSearch = async (query: any) => {
    try {
      const data = await makeScopusApiRequest(query);
      console.log("handleSearch -> data111", data);
      setSearchResults(data);
    } catch (error) {
      setError((error as Error)?.message);
    }
  };

  // ... rest of your component logic

  return (
    <div>
      {/* Search input and button */}
      <button onClick={() => handleSearch("diabetes")}>SCOPUS Search</button>
      {error && <p>Error: {error}</p>}
      {searchResults && (
        // Display search results here, e.g., using dangerouslySetInnerHTML
        <div dangerouslySetInnerHTML={{ __html: searchResults }} />
      )}
    </div>
  );
};

export default ScopusRequest;
