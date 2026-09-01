import { useState, useEffect } from "react";
import Listen from "../../resources/sound_max_fill.svg";
import Copy from "../../resources/Copy.svg";
import SortAlfa from "../../resources/Sort_alfa.svg";
import switchOption from "../../resources/Horizontal_top_left_main.svg";
import LanguageOptions from "./LanguageOptions";

export type ContainerProps = {
  display: boolean;
};

function Container({ display }: ContainerProps) {
  const [translatingText, setTranslatingText] = useState<string>(
    "Hello, how are you?",
  );

  const [translatedText, setTranslatedText] = useState<string>("");

  useEffect(() => {
    fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        translatingText,
      )}&langpair=en|fr`,
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.responseData.translatedText);
        setTranslatedText(data.responseData.translatedText);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [translatingText]);

  return (
    <section>
      <div>
        <div style={{ paddingLeft: !display ? "0" : "10px" }}>
          {display ? (
            <p style={{ paddingRight: "15px" }}>Detect Language</p>
          ) : null}

          <LanguageOptions display={display} />

          {!display ? (
            <img src={switchOption} alt="switch option" className="icons" />
          ) : null}
        </div>

        <hr />
      </div>

      <form action="">
        <textarea
          name=""
          id=""
          rows={6}
          maxLength={500}
          defaultValue={display ? translatingText : translatedText}
          readOnly={!display}
        ></textarea>
      </form>

      <p style={{ visibility: display ? "visible" : "hidden" }}>19/500</p>

      <div>
        <div>
          <img src={Listen} alt="listen" className="icons" />
          <img src={Copy} alt="copy" className="icons" />
        </div>

        {display ? (
          <div className="translate-button">
            <img src={SortAlfa} alt="character" />
            <p>Translate</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default Container;
