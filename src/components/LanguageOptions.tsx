import { useState } from "react";
import type { ContainerProps } from "./Container";
import { Languages } from "./Languages";
import Expand from "../../resources/Expand_down.svg?react";

function LanguageOptions({
  display,
  handleInputLanguage,
  handleOutputLanguage,
}: ContainerProps) {
  const [expand, setExpand] = useState(false);

  const [selectedInputLanguage, setSelectedInputLanguage] =
    useState<string>("en");

  const [selectedOutputLanguage, setSelectedOutputLanguage] =
    useState<string>("fr");

  const defaultLanguages = Languages.slice(0, 3);
  const remainingLanguages = Languages.slice(3);

  const handleExpand = () => setExpand((prev) => !prev);

  const handleLanguage = (code: string) => {
    if (display) handleInputLanguage?.(code);
    else handleOutputLanguage?.(code);
  };

  const handleSelected = (code: string) => {
    if (display) setSelectedInputLanguage(code);
    else setSelectedOutputLanguage(code);
  };

  return (
    <>
      <div className="language-row">
        {defaultLanguages.map((language, index) => (
          <span
            key={language.code}
            style={{
              paddingLeft: index === 0 && !display ? "10px" : "12px",
              marginLeft: index === 0 && !display ? "0" : "5px",
            }}
            onClick={() => {
              handleLanguage(language.code);
              handleSelected(language.code);
            }}
            className={
              display && selectedInputLanguage === language.code
                ? "selected"
                : !display && selectedOutputLanguage === language.code
                  ? "selected"
                  : ""
            }
          >
            {language.name}
          </span>
        ))}

        <Expand
          style={{ color: "#d2d5da", cursor: "pointer" }}
          onClick={handleExpand}
        />

        {expand && (
          <div className="language-dropdown">
            {remainingLanguages.map((language) => (
              <span key={language.code}>{language.name}</span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default LanguageOptions;
