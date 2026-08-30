import type { ContainerProps } from "./Container";
import Expand from "../../resources/Expand_down.svg?react";

function LanguageOptions({ display }: ContainerProps) {
  return (
    <>
      <span style={{ paddingLeft: !display ? "0" : "15px" }}>English</span>
      <span>French</span>
      <span>
        Spanish
        <Expand style={{ color: "#d2d5da" }} />
      </span>
    </>
  );
}

export default LanguageOptions;
