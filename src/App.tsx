import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import NativeForms from "./pages/NativeForms";
import { mainRoutes } from "./const/routes";
import { Header } from "./components/organisms/Header/Header";
import { Box } from "@mui/material";
import { Nav } from "./components/organisms/Nav/Nav";
import { FinalForm } from "./pages/FinalForm";
import { ReactFeatures } from "./pages/ReactFeatures/ReactFeatures";
import { Mobx } from "./pages/Mobx/Mobx";
import { GraphQl } from "./pages/GraphQl/GrapthQL";
import { DOM } from "./pages/DOM";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Header />
      <Nav routes={mainRoutes} />
      <main style={{ padding: "16px", width: "100%", height: "100%" }}>
        <Routes>
          <Route path={mainRoutes.home} element={<Home />} />
          <Route path={mainRoutes.nativeForms} element={<NativeForms />} />
          <Route path={mainRoutes.finalForm} element={<FinalForm />} />
          <Route
            path={`${mainRoutes.reactFeatures}/*`}
            element={<ReactFeatures />}
          />
          <Route path={mainRoutes.mobx} element={<Mobx />} />
          <Route path={`${mainRoutes.graphql}/*`} element={<GraphQl />} />
          <Route path={mainRoutes.dom} element={<DOM />} />
        </Routes>
      </main>
    </Box>
  );
}

export default App;
