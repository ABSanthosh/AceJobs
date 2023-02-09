import React, { useState } from "react";
import "./ChipInput.scss";

function ChipInput({ chips, onChange, onRemove }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="ChipInputWrapper">
      <div className="ChipInputWrapper__chips">
        {chips.length > 0 ? (
          chips.map((chip, index) => (
            <div className="ChipInputWrapper__chips--chip" key={index}>
              <span>{chip}</span>
              <button
                data-icon={String.fromCharCode(58829)}
                onClick={() => {
                  onRemove(index);
                }}
              />
            </div>
          ))
        ) : (
          <h4>
            <i>No Experiences</i>
          </h4>
        )}
      </div>
      <input
        className="ChipInputWrapper__input"
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onChange(inputValue);
            setInputValue("");
          }
        }}
      />
    </div>
  );
}

export default ChipInput;
