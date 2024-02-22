import React, { useState } from "react";
import axios from "axios";
import ChatWithPdf from "./ChatPDF";

const UploadPdfByUrl = ({ url }: { url: string }) => {
  // const [pdfUrl, setPdfUrl] = useState("");
  const [sourceId, setSourceId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);
    console.log("url", url);

    try {
      const response = await axios.post(
        "https://api.chatpdf.com/v1/sources/add-url",
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
        {/* <label htmlFor="pdfUrl">Enter PDF URL:</label> */}
        {/* <input
        type="text"
        id="pdfUrl"
        value={pdfUrl}
        onChange={(e) => setPdfUrl(e.target.value)}
      /> */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Analizar PDF"}
        </button>
        {sourceId && (
          <p>
            Source ID: {sourceId} {typeof sourceId}
          </p>
        )}
        {error && <p className="error">{error}</p>}
      </form>

      <ChatWithPdf sourceId={sourceId} />
    </>
  );
};

export default UploadPdfByUrl;
