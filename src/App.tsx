import { useState, useEffect } from "react";
import Logo from "../resources/logo.svg";
import Container from "./components/Container";
import "./App.css";

function App() {
  const display: boolean = true;

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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setTranslatingText(e.target.value);

  return (
    <>
      <img src={Logo} alt="Logo" className="logo" />
      <main>
        <Container
          display={display}
          translatingText={translatingText}
          handleChange={handleChange}
        />
        <Container display={!display} translatedText={translatedText} />
      </main>
    </>
  );
}
export default App;
