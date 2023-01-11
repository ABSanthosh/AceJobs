import FancySelect from "../FancySelect/FancySelect";
import States from "../../utils/States.json";
import { useState } from "react";

export default function StateCity() {
  const [selection, setSelection] = useState({ state: "All", city: "All" });

  return (
    <>
      <FancySelect
        options={Object.keys(States).map((item) => {
          return {
            value: item,
            label: item,
          };
        })}
        onChange={(e) => setSelection({ ...selection, state: e })}
        style={{ width: "100%", fontSize: "16px" }}
      />
      {selection.state !== "All" ? (
        <FancySelect
          options={[{ value: "All", label: "All" }].concat(
            States[selection.state].map((item) => {
              return {
                value: item,
                label: item,
              };
            })
          )}
          defaultValue={selection.city}
          onChange={(e) => setSelection({ ...selection, city: e })}
          style={{ width: "100%", fontSize: "16px" }}
        />
      ) : (
        <FancySelect
          options={[{ value: "All", label: "All" }].concat(
            Object.values(States)
              .flat()
              .sort()
              .map((item) => {
                return {
                  value: item,
                  label: item,
                };
              })
          )}
          defaultValue={selection.city}
          onChange={(e) => setSelection({ ...selection, city: e })}
          style={{ width: "100%", fontSize: "16px" }}
        />
      )}
    </>
  );
}
