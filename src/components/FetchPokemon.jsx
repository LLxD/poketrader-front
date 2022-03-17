import React, { useState, useEffect } from "react";
import axios from "axios";
import TradeArea from "../components/TradeArea";
import Pokemon from "./Pokemon";
import ReactModal from "react-modal";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";

const getSumFromArray = (array) => {
  const experienceArray = array.map((pokemon) => pokemon.baseExperience);
  const sum = experienceArray.reduce((pv, cv) => pv + cv, 0);
  return sum;
};

const FetchPokemon = () => {
  const [pokemonArray, setPokemonArray] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tradeAreaA, setTradeAreaA] = useState([]);
  const [tradeAreaB, setTradeAreaB] = useState([]);
  const [target, setTarget] = useState("A");
  const [isFair, setIsFair] = useState(true);
  const alert = useAlert();

  useEffect(() => {
    const sumA = getSumFromArray(tradeAreaA);
    const sumB = getSumFromArray(tradeAreaB);
    Math.abs(sumA - sumB) < 0.1 * (sumA + sumB)
      ? setIsFair(true)
      : setIsFair(false);
  }, [tradeAreaA, tradeAreaB]);

  const loadPokemons = () => {
    axios
      .get(import.meta.env.VITE_URL, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        setPokemonArray(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const sendToDatabase = () => {
    axios
      .post(
        import.meta.env.VITE_URL + "/addTrade",
        {
          pokemons_side_A: tradeAreaA,
          pokemons_side_B: tradeAreaB,
          isItFair: isFair,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  const addPokemon = (pokemon, tradeArea, target) => {
    if (tradeArea.length < 6 && target === "A") {
      setTradeAreaA([...tradeArea, pokemon]);
      setIsModalOpen(false);
    } else if (tradeArea.length < 6) {
      setTradeAreaB([...tradeArea, pokemon]);
      setIsModalOpen(false);
    }
  };

  const removePokemon = (pokemon, team) => {
    switch (team) {
      case "A":
        setTradeAreaA((tradeAreaA) =>
          tradeAreaA.filter(function (el) {
            return el.name != pokemon.name;
          })
        );
        break;
      case "B":
        setTradeAreaB((tradeAreaB) =>
          tradeAreaB.filter(function (el) {
            return el.name != pokemon.name;
          })
        );
        break;
      default:
        break;
    }
  };

  return (
    <>
      <TradeArea
        setIsModalOpen={setIsModalOpen}
        pokemonArrayA={tradeAreaA}
        pokemonArrayB={tradeAreaB}
        setTarget={setTarget}
        removePokemon={removePokemon}
      />
      <ReactModal
        className="mx-auto grid max-h-screen grid-flow-row overflow-auto overflow-y-auto  sm:grid-cols-2 lg:grid-cols-6"
        isOpen={isModalOpen}
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
        onRequestClose={() => setIsModalOpen(false)}
        ariaHideApp={false}
      >
        {pokemonArray.map((pokemon) => {
          return (
            <Pokemon
              key={pokemon.name}
              pokemon={pokemon}
              addPokemon={addPokemon}
              tradeAreaA={tradeAreaA}
              tradeAreaB={tradeAreaB}
              target={target}
              modal
            />
          );
        })}
      </ReactModal>
      <h4 className="mt-4 text-center text-2xl text-gray-200">
        {isFair ? "Troca justa! :D" : "Troca injusta! :("}
      </h4>
      <div className="flex items-center justify-center ">
        <button
          onClick={() => {
            sendToDatabase();
            alert.success("Troca confirmada!");
          }}
          className="mt-4 rounded-sm border p-4 text-gray-200"
        >
          Confirmar Troca
        </button>
      </div>
      <div className="flex items-center justify-center ">
        <Link to="/trades">
          <button className="mt-4 rounded-sm border p-4 text-gray-200">
            Ver Trocas
          </button>
        </Link>
      </div>
    </>
  );
};

export default FetchPokemon;
