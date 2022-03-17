import React from "react";

const Pokemon = ({
  pokemon,
  addPokemon,
  tradeAreaA,
  tradeAreaB,
  target,
  modal,
  removePokemon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={
          removePokemon === undefined
            ? () =>
                addPokemon(
                  pokemon,
                  target === "A" ? tradeAreaA : tradeAreaB,
                  target
                )
            : () => removePokemon(pokemon, target)
        }
      >
        <img src={pokemon.imgUrl}></img>
        <h1
          className={`text-center capitalize text-${
            modal ? "black" : "gray"
          }-300`}
        >
          {pokemon.name}
        </h1>
        <h2
          className={`text-center text-sm capitalize text-${
            modal ? "black" : "gray"
          }-300`}
        >
          EXP: {pokemon.baseExperience}
        </h2>
      </button>
    </div>
  );
};

export default Pokemon;
