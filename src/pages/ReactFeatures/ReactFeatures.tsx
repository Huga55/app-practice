import { Route, Routes } from "react-router";
import { Nav } from "../../components/organisms/Nav/Nav";
import { ReactContextWrapper } from "./ReactContext/ReactContext";
import { ReactRenderProps } from "./ReactRenderProps/ReactRenderProps";
import { ReactLazy } from "./ReactLazy/ReactLazy";
import { mainRoutes } from "../../const/routes";
import { ReactHOC } from "./ReactHOC/ReactHOC";
import { addPrefixToRoutes } from "../../utils/addPrefixToRoutes";

const reactRoutes = {
  lazy: "lazy",
  renderProps: "render-props",
  context: "context",
  hoc: "hoc",
};

export const ReactFeatures = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Nav routes={addPrefixToRoutes(reactRoutes, mainRoutes.reactFeatures)} />

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path={reactRoutes.lazy} element={<ReactLazy />} />
          <Route
            path={reactRoutes.renderProps}
            element={<ReactRenderProps />}
          />
          <Route path={reactRoutes.context} element={<ReactContextWrapper />} />
          <Route path={reactRoutes.hoc} element={<ReactHOC />} />
        </Routes>
      </div>
    </div>
  );
};
