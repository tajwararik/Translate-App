import Logo from "../resources/logo.svg";
import Container from "./components/Container";
import "./App.css";

function App() {
  return (
    <>
      <img src={Logo} alt="Logo" />
      <main>
        <Container />
        <Container />
      </main>
    </>
  );
}
export default App;
