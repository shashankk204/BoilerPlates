import React, { useState } from "react";

interface PokemonImageProps {
  imageUrl: string;
}

export const PokemonImage: React.FC<PokemonImageProps> = ({ imageUrl }) => {
  const [src, setSrc] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg'
  );

  return (
    <img
      src={src}
      alt="Pokemon"
      className="size-64"
      onLoad={() =>
        setSrc(
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${imageUrl}.png`
        )
      }
      onError={(e) => {
        (e.target as HTMLImageElement).src =
          'https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg';
      }}
    />
  );
};