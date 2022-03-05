/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { Pokemon } from "../models/Pokemon.model";

import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
    const [pokedex, setPokedex] = useState<Pokemon[]>([]);

    const [paginatedPokedex, setPaginatedPokedex] = useState<Pokemon[][]>([[]]);
    const [currentPage, setCurrentPage] = useState(0);

    const isFirstPage = useMemo(() => currentPage === 0, [currentPage]);
    const isLastPage = useMemo(() => currentPage === (paginatedPokedex.length - 1), [currentPage, paginatedPokedex.length]);


    const paginate = (pokedex: Pokemon[], itemsPerPage: number = 20) => {
        const paginated: Pokemon[][] = [];
        for (let i = 0; i < pokedex.length / itemsPerPage; i++) {
            const start = i * itemsPerPage;
            const end = (i + 1) * itemsPerPage;
            const page = pokedex.slice(start, end);
            paginated.push(page);
        }
        setPaginatedPokedex(paginated);
    };

    useEffect(() => {
        paginate(pokedex.filter(pokemon => pokemon.type.includes("Grass")));
    }, [pokedex]);

    useEffect(() => {
        setTimeout(() => {
            fetch("/api/pokedex")
                .then((res) => res.json())
                .then((res) => setPokedex(res));
        }, 500);
    }, []);

    const nextPage = () => {
        setCurrentPage((prev) => prev + 1);
    };

    const prevPage = () => {
        setCurrentPage((prev) => prev - 1);
    };

    const getImgSrc = (id: number) => {
        let src = "data/images/";
        const length = id.toString().length;
        if (length === 1) {
            return src + "00" + id + ".png";
        } else if (length === 2) {
            return src + "0" + id + ".png";
        } else {
            return src + id + ".png";
        }
    };

    return (
        <div className={styles.pagination}>
            <button disabled={isFirstPage} onClick={() => prevPage()}>{"<"}</button>
            <div className={styles.container}>
                {!pokedex.length && <div className="loader"></div>}
                {paginatedPokedex[currentPage] &&
                    paginatedPokedex[currentPage].map((pokemon, index) => (
                        <div key={index} className={styles.pokedex}>
                            <h3 className={styles.pokedex__name}>
                                {pokemon.name.english}
                            </h3>
                            <img
                                className={styles.pokedex__image}
                                src={getImgSrc(pokemon.id)}
                                alt={pokemon.name.english}
                            />
                            <div className={styles.pokedex__types}>
                                <strong>Types:</strong>
                                <ul>
                                    {pokemon.type.map((type) => (
                                        <li key={index + "-" + type}>{type}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
            </div>
            <button disabled={isLastPage} onClick={() => nextPage()}>{">"}</button>
        </div>
    );
};

export default Home;
