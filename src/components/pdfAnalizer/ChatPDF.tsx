import React, { useState } from "react";
import axios from "axios";
import { set } from "zod";

const ChatWithPdf = ({ sourceId }: { sourceId: string }) => {
  // const [sourceId, setSourceId] = useState(""); // Replace with actual source ID
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [errores, setErrores] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
              content: message,
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

      setResponse(response.data.content);
    } catch (error) {
      console.error("Error sending chat message:", error);
      // setError({ message: error });
      setErrores("An error occurred.");
      // setErrores(error?.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="sourceId">Source ID:</label>
      <input
        type="text"
        id="sourceId"
        value={sourceId}
        // onChange={(e) => setSourceId(e.target.value)}
      />
      <label htmlFor="message">Message:</label>
      <input
        type="text"
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send Chat Message"}
      </button>
      {response && <p>Chat response: {response}</p>}
      {errores && <p className="error">{errores}</p>}
    </form>
  );
};

export default ChatWithPdf;
