import type { ContainerProps } from "./Container";
import { Languages } from "./Languages";
import Expand from "../../resources/Expand_down.svg?react";

function LanguageOptions({ display }: ContainerProps) {
  return (
    <>
      <span
        style={{
          paddingLeft: !display ? "10px" : "12px",
          marginLeft: !display ? "0" : "5px",
        }}
        className="selected"
      >
        English
      </span>
      <span>French</span>
      <span>
        <label htmlFor="chooseLanguage">
          <select id="chooseLanguage">
            {Languages.map((language) => (
              <option key={language.code} value={language.code}>
                {language.name}
              </option>
            ))}
          </select>
        </label>
        <Expand
          style={{ color: "#d2d5da", position: "absolute", right: "20%" }}
        />
      </span>
    </>
  );
}

export default LanguageOptions;
