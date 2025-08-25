import { Route, Routes } from "react-router";
import { General } from "./General/General";
import { Nav } from "../../components/organisms/Nav/Nav";
import { mainRoutes } from "../../const/routes";
import { addPrefixToRoutes } from "../../utils/addPrefixToRoutes";
import { Mutations } from "./Mutations/Mutations";
import { Builder } from "./Builder/Builder";

const routes = {
  general: "general",
  mutations: "mutations",
  builder: "builder",
};

export const GraphQl = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Nav routes={addPrefixToRoutes(routes, mainRoutes.graphql)} />
      <Routes>
        <Route path={routes.general} element={<General />} />
        <Route path={routes.mutations} element={<Mutations />} />
        <Route path={routes.builder} element={<Builder />} />
      </Routes>
    </div>
  );
};
