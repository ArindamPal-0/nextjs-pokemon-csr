/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Details.module.css";
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

  return (
    <div>
      <Head>
        <title>{pokemon?.name}</title>
      </Head>
      <div>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
        <div className={styles.layout}>
          <div>
            <img
              className={styles.picture}
              src={`https://arindampal-0.github.io/pokemon-api/${pokemon?.image}`}
              alt={pokemon?.name}
            />
          </div>
          <div>
            <div className={styles.name}>{pokemon?.name}</div>
            <div className={styles.type}>{pokemon?.type.join(", ")}</div>
            <table>
              <thead className={styles.header}>
                <tr>
                  <th>Name</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {pokemon?.stats.map(({ name, value }: Stat) => (
                  <tr key={name}>
                    <td className={styles.attribute}>{name}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
