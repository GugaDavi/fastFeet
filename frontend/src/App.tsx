import React from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

import history from "./services/history";
import Routes from "./routes";

import GlobalStyles from "./styles/global";

import { store, persist } from "./store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persist}>
        <Router history={history}>
          <Routes />
          <GlobalStyles />
          <ToastContainer />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
