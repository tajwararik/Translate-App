import React, { useState } from "react";
import { LanguageData } from "./components/LanguageData";
import Logo from "../resources/logo.svg";
import Container from "./components/Container";
import "./App.css";

export type Language = {
  name: string;
  code: string;
};

type Option = {
  inputOptions: Language[];
  outputOptions: Language[];
};

function App() {
  const [inputLanguage, setInputLanguage] = useState<string>("en");
  const [outputLanguage, setOutputLanguage] = useState<string>("fr");

  const [visibleOptions, setVisibleOptions] = useState<Option>({
    inputOptions: LanguageData.slice(0, 3),
    outputOptions: LanguageData.slice(0, 3),
  });

  const [expandInputOptions, setExpandInputOptions] = useState(false);
  const [expandOutputOptions, setExpandOutputOptions] = useState(false);

  const [translatingText, setTranslatingText] = useState<string>(
    "Hello, how are you?",
  );

  const [translatedText, setTranslatedText] = useState<string>(
    "Bonjour, comment allez-vous?",
  );

  const handleLanguage = (code: string, isInput: boolean) => {
    if (isInput) setInputLanguage(code);
    else setOutputLanguage(code);
  };

  const handleExpandInputOptions = () => setExpandInputOptions((prev) => !prev);

  const handleExpandOutputOptions = () =>
    setExpandOutputOptions((prev) => !prev);

  const addToVisibleOptions = (option: Language, isInput: boolean) => {
    if (isInput) {
      setVisibleOptions((prev: Option) => ({
        ...prev,
        inputOptions: [
          ...prev.inputOptions.filter((_, index) => index !== 2),
          option,
        ],
      }));

      setInputLanguage(option.code);
      setExpandInputOptions((prev) => !prev);
    } else {
      setVisibleOptions((prev: Option) => ({
        ...prev,
        outputOptions: [
          ...prev.outputOptions.filter((_, index) => index !== 2),
          option,
        ],
      }));

      setOutputLanguage(option.code);
      setExpandOutputOptions((prev) => !prev);
    }
  };

  const swapLanguages = () => {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);

    setTranslatingText(translatedText);
    setTranslatedText(translatingText);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length == 0) setTranslatedText("");
    setTranslatingText(e.target.value);
  };

  const handleTranslate = () => {
    fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        translatingText,
      )}&langpair=${inputLanguage}|${outputLanguage}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setTranslatedText(data.responseData.translatedText);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCopy = async (text: string) =>
    await navigator.clipboard.writeText(text);

  return (
    <>
      <img src={Logo} alt="Logo" className="logo" />
      <main>
        <Container
          isInput={true}
          inputLanguage={inputLanguage}
          visibleOptions={visibleOptions.inputOptions}
          translatingText={translatingText}
          expandInputOptions={expandInputOptions}
          handleLanguage={handleLanguage}
          handleExpandInputOptions={handleExpandInputOptions}
          addToVisibleOptions={addToVisibleOptions}
          handleChange={handleChange}
          handleTranslate={handleTranslate}
          handleCopy={() => handleCopy(translatingText)}
        />

        <Container
          isInput={false}
          outputLanguage={outputLanguage}
          visibleOptions={visibleOptions.outputOptions}
          translatedText={translatedText}
          expandOutputOptions={expandOutputOptions}
          handleLanguage={handleLanguage}
          handleExpandOutputOptions={handleExpandOutputOptions}
          addToVisibleOptions={addToVisibleOptions}
          handleCopy={() => handleCopy(translatedText)}
          handleSwapLanguages={swapLanguages}
        />
      </main>
    </>
  );
}
export default App;
