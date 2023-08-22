import {
  Route,
  HashRouter as Router,
  Routes as Switch,
  Navigate,
} from "react-router-dom";
import RouterPaths from "@/render/utils/routes.json";
import HomePage from "@/render/containers/HomePage";
import {VMPage} from "@containers/VMPage/VMPage";
import {CompiladorPage} from "@containers/CompiladorPage/CompiladorPage";
import { ConfigContainer } from "@containers/ConfigPage/ConfigContainer";

const Routes = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route
            caseSensitive
            path="/"
            element={<Navigate replace to={RouterPaths.HOME} />}
          />
          <Route caseSensitive path={RouterPaths.HOME} element={<HomePage />} />
          <Route caseSensitive path={'/maquina'} element={<VMPage/>}/>
          <Route caseSensitive path={'/compilador'} element={<CompiladorPage/>}/>
          <Route caseSensitive path={'/propriedades'} element={<ConfigContainer/>}/>
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
