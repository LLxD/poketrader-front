import React from "react";
import FetchPokemon from "./components/FetchPokemon";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

function App() {
  return (
    <div className="min-h-screen bg-green-700">
      <h1 className="py-4 text-center text-6xl text-gray-100">Poketrade</h1>
      <AlertProvider template={AlertTemplate}>
        <FetchPokemon />
      </AlertProvider>
    </div>
  );
}
export default App;
