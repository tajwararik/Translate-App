import type React from "react";
import type { Language } from "../App";
import Listen from "../../resources/sound_max_fill.svg";
import Copy from "../../resources/Copy.svg";
import SortAlfa from "../../resources/Sort_alfa.svg";
import swapOptions from "../../resources/Horizontal_top_left_main.svg";
import LanguageOptions from "./LanguageOptions";

export type ContainerProps = {
  isInput: boolean;
  inputLanguage?: string;
  outputLanguage?: string;
  visibleOptions: Language[];
  translatingText?: string;
  translatedText?: string;
  expandInputOptions?: boolean;
  expandOutputOptions?: boolean;
  handleLanguage: (code: string, isInput: boolean) => void;
  handleExpandInputOptions?: () => void;
  handleExpandOutputOptions?: () => void;
  addToVisibleOptions: (option: Language, isInput: boolean) => void;
  handleChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  handleTranslate?: () => void;
  handleCopy?: () => void;
  handleSwapLanguages?: () => void;
};

function Container({
  isInput,
  inputLanguage,
  outputLanguage,
  visibleOptions,
  translatingText,
  translatedText,
  expandInputOptions,
  expandOutputOptions,
  handleLanguage,
  handleExpandInputOptions,
  handleExpandOutputOptions,
  addToVisibleOptions,
  handleChange,
  handleTranslate,
  handleCopy,
  handleSwapLanguages,
}: ContainerProps) {
  return (
    <section>
      <div>
        <div style={{ paddingLeft: isInput === false ? "0" : "10px" }}>
          {isInput === true ? (
            <p style={{ paddingRight: "15px" }}>Detect Language</p>
          ) : null}

          <LanguageOptions
            isInput={isInput}
            inputLanguage={inputLanguage}
            outputLanguage={outputLanguage}
            visibleOptions={visibleOptions}
            expandInputOptions={expandInputOptions}
            expandOutputOptions={expandOutputOptions}
            handleLanguage={handleLanguage}
            handleExpandInputOptions={handleExpandInputOptions}
            handleExpandOutputOptions={handleExpandOutputOptions}
            addToVisibleOptions={addToVisibleOptions}
          />

          {isInput === false ? (
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
          value={isInput === true ? translatingText : translatedText}
          onChange={handleChange}
          readOnly={isInput === false}
        ></textarea>
      </form>

      <p style={{ visibility: isInput === true ? "visible" : "hidden" }}>
        {translatingText?.length}/500
      </p>

      <div>
        <div>
          <img src={Listen} alt="listen" className="icons" />
          <img src={Copy} alt="copy" className="icons" onClick={handleCopy} />
        </div>

        {isInput === true ? (
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
