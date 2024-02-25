import axios from "axios";

import xml2js from "xml2js";

const makeScopusApiRequest = async (query: any) => {
  const url = `https://api.elsevier.com/content/search/scopus?query=${query}`;
  const apiKey = "fd66baea8ca0cae118a67c51763cece0";

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/xml",
        "X-ELS-APIKey": apiKey,
      },
    });

    if (response.status === 200) {
      //   return response.data; // Assuming XML data

      const parser = new xml2js.Parser();
      const parsedData = await parser.parseStringPromise(response.data);

      // Access and process the parsed data here:
      console.log("parsedData", parsedData);
      //   console.log(parsedData); // Example: log the parsed data

      // Return the parsed data to your component
      return parsedData;
    } else {
      throw new Error(`API request failed: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    throw error; // Re-throw for handling in your component
  }
};

export default makeScopusApiRequest;
