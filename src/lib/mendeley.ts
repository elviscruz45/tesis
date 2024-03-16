import axios from "axios";

import xml2js from "xml2js";

const makeMendeleyApiRequest = async (query: any, token: string) => {
  const url = `https://api.mendeley.com/search/catalog`;
  //   const apiKey = token;
  const apiKey =
    "MSwxNzEwNTY5OTAyNDU5LCwxNzc5MSxhbGwsLFNiQXMxUnNmUWVGMUgtdnloNkN3ZVRRUzRPRQ";

  try {
    const response = await axios.get(url, {
      params: {
        query,
        limit: 10,
        max_year: 2019,
      },
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/vnd.mendeley-document.1+json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching Mendeley documents:", error);
    // Handle error appropriately
    return null; // Or throw an error
  }
};

export default makeMendeleyApiRequest;
