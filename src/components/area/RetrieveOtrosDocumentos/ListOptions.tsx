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
  categoryList,
  setOption,
}: {
  sourceId?: string;
  prompt?: any;
  setSchemaMarcoTeorico?: any;
  categoryList?: any;
  setOption?: any;
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  let options: [] = categoryList.map((item: any) =>
    item.title
      .trim()
      .replace(/\s+/g, "_")
      .replace(/\./g, "")
      .replace(/á/g, "a")
      .replace(/é/g, "e")
      .replace(/í/g, "i")
      .replace(/ó/g, "o")
      .replace(/ú/g, "u")
      .toLowerCase(),
  );

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
    setOption(event.target.value);
  };

  return (
    <div>
      {/* <label htmlFor="select">Choose an option:</label> */}
      <p> Guardar en: {selectedOption}</p>

      <select id="select" value={selectedOption} onChange={handleChange}>
        <option value="">Selecciona la ubicacion en el documento</option>

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
