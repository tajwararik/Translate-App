import type { ContainerProps } from "./Container";
import { LanguageData } from "./LanguageData";
import Expand from "../../resources/Expand_down.svg?react";

function LanguageOptions({
  isInput,
  inputLanguage,
  outputLanguage,
  visibleOptions,
  expandInputOptions,
  expandOutputOptions,
  handleLanguage,
  handleExpandInputOptions,
  handleExpandOutputOptions,
  addToVisibleOptions,
}: ContainerProps) {
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
              paddingLeft: index === 0 && isInput === false ? "10px" : "12px",
              marginLeft: index === 0 && isInput === false ? "0" : "5px",
              paddingInline: index === 2 ? "4px" : "12px",
              marginRight: index === 2 ? "0" : "5px",
            }}
            onClick={() => handleLanguage(language.code, isInput)}
            className={
              isInput === true && inputLanguage === language.code
                ? "selected"
                : isInput === false && outputLanguage === language.code
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
            isInput ? handleExpandInputOptions : handleExpandOutputOptions
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
