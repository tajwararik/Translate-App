import React, { useState } from "react";
import Logo from "../resources/logo.svg";
import Container from "./components/Container";
import "./App.css";

function App() {
  const display: boolean = true;

  const [translatingText, setTranslatingText] = useState<string>(
    "Hello, how are you?",
  );

  const [translatedText, setTranslatedText] = useState<string>(
    "Bonjour, comment allez-vous?",
  );

  const [inputLanguage, setInputLanguage] = useState<string>("en");
  const [outputLanguage, setOutputLanguage] = useState<string>("fr");

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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length == 0) setTranslatedText("");
    setTranslatingText(e.target.value);
  };

  const handleCopy = async (text: string) =>
    await navigator.clipboard.writeText(text);

  const handleInputLanguage = (code: string) => {
    setInputLanguage(code);
  };

  const handleOutputLanguage = (code: string) => {
    setOutputLanguage(code);
  };

  return (
    <>
      <img src={Logo} alt="Logo" className="logo" />
      <main>
        <Container
          display={display}
          translatingText={translatingText}
          handleChange={handleChange}
          handleTranslate={handleTranslate}
          handleCopy={() => handleCopy(translatingText)}
          handleInputLanguage={handleInputLanguage}
        />

        <Container
          display={!display}
          translatedText={translatedText}
          handleCopy={() => handleCopy(translatedText)}
          handleOutputLanguage={handleOutputLanguage}
        />
      </main>
    </>
  );
}
export default App;
