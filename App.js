import React from "react";
import Navigation from "./navigation";
import { Provider } from "react-redux";
import { store } from "./src/Store";

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
