import React, { useState } from "react";
import axios from "axios";
import ChatWithPdf from "./ChatPDF";
import { Button } from "../../ui/button";
// import CustomizedChatWithPdf from "./CustomizedChatPDF";

// type FileUploadProps = {
//   analizar: boolean;
//   resumir: boolean;
//   prompts: any;
// };
const UploadPdfByUrl = ({
  url,
  analizar,
  resumir,
  prompts,
  setSchemaMarcoTeorico,
}: {
  url: string;
  analizar: boolean;
  resumir: boolean;
  prompts?: any;
  setSchemaMarcoTeorico?: any;
}) => {
  // const [pdfUrl, setPdfUrl] = useState("");
  const [sourceId, setSourceId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);
    console.log("url", url);

    // const prueba =
    //   "https://link.springer.com/content/pdf/10.1007/s00445-019-1336-3.pdf";

    try {
      const response = await axios.post(
        "https://api.chatpdf.com/v1/sources/add-url",
        // { url: prueba },
        { url: url },

        {
          headers: {
            "x-api-key": "sec_CGNMZENbOBE46FZvWlGfmGCLoqy9vgiI", // Replace with your actual API key
            "Content-Type": "application/json",
          },
        },
      );

      setSourceId(response.data.sourceId);
    } catch (error: any) {
      console.error("Error adding PDF:", error);
      setError(error.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {analizar && (
          <Button type="submit" disabled={isLoading || !!sourceId}>
            {isLoading
              ? "Uploading..."
              : !!sourceId
                ? "Analisis Completado"
                : "Analizar PDF"}
          </Button>
        )}

        {error && <p className="error">{error}</p>}
      </form>
      {/* {resumir && <ChatWithPdf sourceId={sourceId} />} */}
      <br />
      {/* {resumir && <CustomizedChatWithPdf sourceId={sourceId} />} */}

      {resumir && (
        <>
          <ChatWithPdf
            sourceId={sourceId}
            prompt={prompts?.titulo}
            setSchemaMarcoTeorico={setSchemaMarcoTeorico}
          />
        </>
      )}
    </>
  );
};

export default UploadPdfByUrl;
