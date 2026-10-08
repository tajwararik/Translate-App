import type { ContainerProps } from "../types";
import Listen from "../../resources/sound_max_fill.svg";
import Copy from "../../resources/Copy.svg";
import SortAlfa from "../../resources/Sort_alfa.svg";
import swapOptions from "../../resources/Horizontal_top_left_main.svg";
import LanguageOptions from "./LanguageOptions";

function Container({
  isInput,
  translatingText,
  translatedText,
  expandInputOptions,
  expandOutputOptions,
  handleChange,
  handleTranslate,
  handleSwapLanguages,
  handleListen,
  handleCopy,
}: ContainerProps) {
  return (
    <section>
      <div>
        <div style={{ paddingLeft: !isInput ? "0" : "10px" }}>
          {isInput ? (
            <p style={{ paddingRight: "15px" }}>Detect Language</p>
          ) : null}

          <LanguageOptions
            isInput={isInput}
            expandInputOptions={expandInputOptions}
            expandOutputOptions={expandOutputOptions}
          />

          {!isInput ? (
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
          value={isInput ? translatingText : translatedText}
          onChange={handleChange}
          readOnly={!isInput}
        ></textarea>
      </form>

      <p style={{ visibility: isInput ? "visible" : "hidden" }}>
        {translatingText?.length}/500
      </p>

      <div>
        <div>
          <img
            src={Listen}
            alt="listen"
            className="icons"
            onClick={() => handleListen?.(isInput)}
          />
          <img src={Copy} alt="copy" className="icons" onClick={handleCopy} />
        </div>

        {isInput ? (
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
