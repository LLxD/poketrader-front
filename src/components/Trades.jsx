import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Trades = () => {
  const [tradesArray, setTradesArray] = useState([]);
  axios
    .get(import.meta.env.URL + "/allTrades", {
      headers: { "Content-Type": "application/json" },
    })
    .then(function (response) {
      setTradesArray(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  return (
    <div className="min-h-screen bg-green-700">
      {tradesArray.map((trade) => {
        const html = (
          <div className="mb-2 rounded border py-3 text-center capitalize text-white">
            <h3 className={`text-${trade.isItFair ? "white" : "red"}-600`}>
              Troca
              {trade.isItFair ? " Justa" : " Injusta"}
            </h3>
            <h3>Lado A</h3>
            <h3>
              {trade.pokemons_side_A.map((pokemon) => pokemon.name + "\n")}
            </h3>
            <h3>Lado B</h3>
            <h3>
              {trade.pokemons_side_B.map((pokemon) => pokemon.name + "\n")}
            </h3>
          </div>
        );
        return html;
      })}
      <div className="flex items-center justify-center ">
        <Link to="/">
          <button className="mt-4 rounded-sm border p-4 text-gray-200">
            Voltar
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Trades;
