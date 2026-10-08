import { useContext } from "react";
import type { ContainerProps } from "../types";
import { LanguageData } from "../data/LanguageData";
import Expand from "../../resources/Expand_down.svg?react";
import { LanguageContext } from "../App";

function LanguageOptions({
  isInput,
  visibleOptions,
  expandInputOptions,
  expandOutputOptions,
}: ContainerProps) {
  const { languageCode, handleLanguage, handleExpand, addToVisibleOptions } =
    useContext(LanguageContext);

  const remainingLanguages = LanguageData.filter(
    (language) =>
      !visibleOptions.some((option) => option.code === language.code),
  );
  return (
    <>
      <div className="language-row">
        {visibleOptions.map((language, index) => (
          <span
            key={language.code}
            style={{
              paddingLeft: index === 0 && !isInput ? "10px" : "12px",
              marginLeft: index === 0 && !isInput ? "0" : "5px",
              paddingInline: index === 2 ? "4px" : "12px",
              marginRight: index === 2 ? "0" : "5px",
            }}
            onClick={() => handleLanguage(language.code, isInput)}
            className={
              isInput && languageCode.input === language.code
                ? "selected"
                : !isInput && languageCode.output === language.code
                  ? "selected"
                  : ""
            }
          >
            {language.name}
          </span>
        ))}

        <Expand
          style={{ color: "#d2d5da", cursor: "pointer" }}
          onClick={
            isInput ? () => handleExpand(isInput) : () => handleExpand(isInput)
          }
        />

        {(expandInputOptions || expandOutputOptions) && (
          <div className="language-dropdown">
            {remainingLanguages.map((language) => (
              <span
                key={language.code}
                onClick={() => addToVisibleOptions(language, isInput)}
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
