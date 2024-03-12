import React, { useState } from "react";
import axios from "axios";
import { set } from "zod";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
// import CustomizedChatWithPdf from "./CustomizedChatPDF";
import { Bot, Save } from "lucide-react";

const OptionList = ({
  sourceId,
  prompt,
  setSchemaMarcoTeorico,
}: {
  sourceId?: string;
  prompt?: any;
  setSchemaMarcoTeorico?: any;
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  const options = ["Option 1", "Option 2", "Option 3"];

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      {/* <label htmlFor="select">Choose an option:</label> */}
      <p> Guardar en: {selectedOption}</p>

      <select id="select" value={selectedOption} onChange={handleChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OptionList;
