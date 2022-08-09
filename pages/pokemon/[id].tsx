import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface Stat {
  name: string;
  value: number;
}

interface PokemonDetails {
  name: string;
  type: Array<string>;
  stats: Array<Stat>;
  image: string;
}

export default function Details() {
  const {
    query: { id },
  } = useRouter();

  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    async function getPokemonDetail() {
      const resp = await fetch(
        `https://arindampal-0.github.io/pokemon-api/pokemon/${id}.json`
      );
      setPokemon((await resp.json()) as PokemonDetails);
    }

    if (id) {
      getPokemonDetail();
    }
  }, [id]);

  return <div>{JSON.stringify(pokemon)}</div>;
}
