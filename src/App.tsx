import { TitleProvider } from "./hooks/useTitle";
import { Routes } from "./routes";
import "./styles/global.scss";

function App() {
  return (
    <>
      <TitleProvider>
        <Routes />;
      </TitleProvider>
    </>
  );
}

export default App;
