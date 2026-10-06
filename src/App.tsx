import React, { useState, createContext } from "react";
import type {
  Language,
  Option,
  LanguageCode,
  Expand,
  Text,
  LanguageContextType,
} from "./types";
import { LanguageData } from "./data/LanguageData";
import Logo from "../resources/logo.svg";
import Container from "./components/Container";
import "./App.css";

export const LanguageContext = createContext<LanguageContextType>({
  languageCode: {
    input: "",
    output: "",
  },
  handleLanguage: () => {},
  handleExpand: () => {},
  addToVisibleOptions: () => {},
});

function App() {
  const [languageCode, setLanguageCode] = useState<LanguageCode>({
    input: "en",
    output: "fr",
  });

  const [visibleOptions, setVisibleOptions] = useState<Option>({
    inputOptions: LanguageData.slice(0, 3),
    outputOptions: LanguageData.slice(0, 3),
  });

  const [expand, setExpand] = useState<Expand>({
    input: false,
    output: false,
  });

  const [text, setText] = useState<Text>({
    inputText: "Hello, how are you?",
    outputText: "Bonjour, comment allez-vous?",
  });

  const handleLanguage = (code: string, isInput: boolean) => {
    if (isInput) setLanguageCode((prev) => ({ ...prev, input: code }));
    else setLanguageCode((prev) => ({ ...prev, output: code }));
  };

  const handleExpand = (isInput: boolean) => {
    if (isInput) setExpand((prev) => ({ ...prev, input: !prev.input }));
    else setExpand((prev) => ({ ...prev, output: !prev.output }));
  };

  const addToVisibleOptions = (option: Language, isInput: boolean) => {
    if (isInput) {
      setVisibleOptions((prev: Option) => ({
        ...prev,
        inputOptions: [
          ...prev.inputOptions.filter((_, index) => index !== 2),
          option,
        ],
      }));

      setLanguageCode((prev) => ({ ...prev, input: option.code }));
      setExpand((prev) => ({ ...prev, input: !prev.input }));
    } else {
      setVisibleOptions((prev: Option) => ({
        ...prev,
        outputOptions: [
          ...prev.outputOptions.filter((_, index) => index !== 2),
          option,
        ],
      }));

      setLanguageCode((prev) => ({ ...prev, output: option.code }));
      setExpand((prev) => ({ ...prev, output: !prev.output }));
    }
  };

  function compareArray(input: Language[], output: Language[]) {
    return (
      input.length === output.length &&
      input.every((value, index) => value.code === output[index].code)
    );
  }

  const swapLanguages = () => {
    const areSame = compareArray(
      visibleOptions.inputOptions,
      visibleOptions.outputOptions,
    );

    if (!areSame) {
      alert("Available language options on both sides should be same!!!");

      return;
    }

    setLanguageCode((prev) => ({
      input: prev.output,
      output: prev.input,
    }));

    setText((prev) => ({
      inputText: prev.outputText,
      outputText: prev.inputText,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length == 0)
      setText((prev) => ({ ...prev, inputText: "" }));
    setText((prev) => ({ ...prev, inputText: e.target.value }));
  };

  const handleTranslate = () => {
    fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text.inputText,
      )}&langpair=${languageCode.input}|${languageCode.output}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setText((prev) => ({
          ...prev,
          outputText: data.responseData.translatedText,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleListen = (isInput: boolean) => {
    window.speechSynthesis.cancel();

    const speech = isInput
      ? new SpeechSynthesisUtterance(text.inputText)
      : new SpeechSynthesisUtterance(text.outputText);
    speech.lang = isInput ? languageCode.input : languageCode.output;
    window.speechSynthesis.speak(speech);
  };

  const handleCopy = async (text: string) =>
    await navigator.clipboard.writeText(text);

  return (
    <>
      <img src={Logo} alt="Logo" className="logo" />
      <main>
        <LanguageContext
          value={{
            languageCode,
            handleLanguage,
            handleExpand,
            addToVisibleOptions,
          }}
        >
          <Container
            isInput={true}
            visibleOptions={visibleOptions.inputOptions}
            translatingText={text.inputText}
            expandInputOptions={expand.input}
            handleChange={handleChange}
            handleTranslate={handleTranslate}
            handleListen={handleListen}
            handleCopy={() => handleCopy(text.inputText)}
          />

          <Container
            isInput={false}
            visibleOptions={visibleOptions.outputOptions}
            translatedText={text.outputText}
            expandOutputOptions={expand.output}
            handleSwapLanguages={swapLanguages}
            handleListen={handleListen}
            handleCopy={() => handleCopy(text.outputText)}
          />
        </LanguageContext>
      </main>
    </>
  );
}
export default App;
