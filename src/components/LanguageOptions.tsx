import { useState } from "react";
import type { ContainerProps } from "./Container";
import { LanguageData } from "./LanguageData";
import Expand from "../../resources/Expand_down.svg?react";

type LanguageData = {
  name: string;
  code: string;
};

function LanguageOptions({
  display,
  handleInputLanguage,
  handleOutputLanguage,
}: ContainerProps) {
  const [visibleOptions, setVisibleOptions] = useState<LanguageData[]>(
    LanguageData.slice(0, 3),
  );

  const [remainingLanguages, setRemainingLanguages] = useState<LanguageData[]>(
    LanguageData.slice(3),
  );

  const [expand, setExpand] = useState(false);

  const [selectedInputLanguage, setSelectedInputLanguage] =
    useState<string>("en");

  const [selectedOutputLanguage, setSelectedOutputLanguage] =
    useState<string>("fr");

  const handleExpand = () => setExpand((prev) => !prev);

  const handleLanguage = (code: string) => {
    if (display) handleInputLanguage?.(code);
    else handleOutputLanguage?.(code);
  };

  const handleSelected = (code: string) => {
    if (display) setSelectedInputLanguage(code);
    else setSelectedOutputLanguage(code);
  };

  const addToVisibleOptions = (option: LanguageData) => {
    setRemainingLanguages((prev) => [...prev, visibleOptions[2]]);
    setVisibleOptions((prev) => prev.filter((_, index) => index !== 2));
    setVisibleOptions((prev) => [...prev, option]);
    handleLanguage(option.code);
    handleSelected(option.code);
    setRemainingLanguages((prev) =>
      prev.filter((language) => language.name !== option.name),
    );
    setExpand((prev) => !prev);
  };

  return (
    <>
      <div className="language-row">
        {visibleOptions.map((language, index) => (
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
              <span
                key={language.code}
                onClick={() => addToVisibleOptions(language)}
              >
                {language.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default LanguageOptions;
