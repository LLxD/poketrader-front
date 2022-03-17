import React, { useState, useEffect } from "react";
import Pokemon from "./Pokemon";
import SkeletonButton from "./SkeletonButton";

const TradeArea = ({
  pokemonArrayA,
  pokemonArrayB,
  setIsModalOpen,
  setTarget,
  removePokemon,
}) => {
  return (
    <div className="grid grid-flow-row grid-cols-2">
      <div className="flex h-80 flex-wrap justify-center border-4 border-r-4 border-solid border-green-500 bg-green-900">
        <h2 className="w-full text-center text-xl text-gray-300">1</h2>
        {pokemonArrayA.map((pokemon, index) => (
          <Pokemon
            pokemon={pokemon}
            key={index}
            removePokemon={removePokemon}
            target="A"
          />
        ))}
        {pokemonArrayA.length < 6 && (
          <SkeletonButton
            setIsModalOpen={setIsModalOpen}
            setTarget={setTarget}
            target={"A"}
          />
        )}
      </div>
      <div className="flex h-80 flex-wrap justify-center border-4 border-r-4 border-solid border-green-500 bg-green-900">
        <h2 className="w-full text-center text-xl text-gray-300">2</h2>
        {pokemonArrayB.map((pokemon, index) => (
          <Pokemon
            pokemon={pokemon}
            key={index}
            removePokemon={removePokemon}
            target="B"
          />
        ))}
        {pokemonArrayB.length < 6 && (
          <SkeletonButton
            setIsModalOpen={setIsModalOpen}
            setTarget={setTarget}
            target={"B"}
          />
        )}
      </div>
    </div>
  );
};

export default TradeArea;
