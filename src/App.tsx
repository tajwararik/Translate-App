import Logo from "../resources/logo.svg";
import Container from "./components/Container";
import "./App.css";

function App() {
  const display: boolean = true;

  return (
    <>
      <img src={Logo} alt="Logo" />
      <main>
        <Container display={display} />
        <Container display={!display} />
      </main>
    </>
  );
}
export default App;
