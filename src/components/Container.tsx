import Listen from "../../resources/sound_max_fill.svg";
import Copy from "../../resources/Copy.svg";
import SortAlfa from "../../resources/Sort_alfa.svg";
import swapOptions from "../../resources/Horizontal_top_left_main.svg";
import LanguageOptions from "./LanguageOptions";
import type React from "react";

export type ContainerProps = {
  display: boolean;
  translatingText?: string;
  translatedText?: string;
  inputLanguage?: string;
  outputLanguage?: string;
  handleChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  handleTranslate?: () => void;
  handleCopy?: () => void;
  handleInputLanguage?: (code: string) => void;
  handleOutputLanguage?: (code: string) => void;
  handleSwapLanguages?: () => void;
};

function Container({
  display,
  translatingText,
  translatedText,
  inputLanguage,
  outputLanguage,
  handleChange,
  handleTranslate,
  handleCopy,
  handleInputLanguage,
  handleOutputLanguage,
  handleSwapLanguages,
}: ContainerProps) {
  return (
    <section>
      <div>
        <div style={{ paddingLeft: !display ? "0" : "10px" }}>
          {display ? (
            <p style={{ paddingRight: "15px" }}>Detect Language</p>
          ) : null}

          <LanguageOptions
            display={display}
            inputLanguage={inputLanguage}
            outputLanguage={outputLanguage}
            handleInputLanguage={handleInputLanguage}
            handleOutputLanguage={handleOutputLanguage}
          />

          {!display ? (
            <img
              src={swapOptions}
              alt="swap options"
              className="icons"
              onClick={handleSwapLanguages}
            />
          ) : null}
        </div>

        <hr />
      </div>

      <form>
        <textarea
          id="input-field"
          name="input-field"
          rows={6}
          maxLength={500}
          value={display ? translatingText : translatedText}
          onChange={handleChange}
          readOnly={!display}
        ></textarea>
      </form>

      <p style={{ visibility: display ? "visible" : "hidden" }}>
        {translatingText?.length}/500
      </p>

      <div>
        <div>
          <img src={Listen} alt="listen" className="icons" />
          <img src={Copy} alt="copy" className="icons" onClick={handleCopy} />
        </div>

        {display ? (
          <div className="translate-button" onClick={handleTranslate}>
            <img src={SortAlfa} alt="character" />
            <p>Translate</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default Container;
