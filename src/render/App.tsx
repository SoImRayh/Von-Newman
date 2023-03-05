import Routes from "./Routes";
import { store, persistor } from "@redux/index";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
        <Routes />
    </Provider>
  );
};

export default App;
