import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Pokemon } from "../models/Pokemon.model";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    const [pokedex, setPokedex] = useState<Pokemon[]>([]);

    useEffect(() => {
        setTimeout(() => {
            fetch("/api/pokedex")
                .then((res) => res.json())
                .then((res) => setPokedex(res));
        }, 1500);
    }, []);
    return <div>{!pokedex.length && <div className="loader"></div>}</div>;
};

export default Home;
