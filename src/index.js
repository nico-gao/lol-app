import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";
import { ChampionContextProvider } from "./store/champion-context";

ReactDom.render(
  <ChampionContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ChampionContextProvider>,
  document.getElementById("root")
);
