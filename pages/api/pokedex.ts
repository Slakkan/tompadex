// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Pokemon } from "../../models/Pokemon.model";

import { pokedex } from "../../public/data/pokedex";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Pokemon[]>
) {
    res.status(200).json(pokedex);
}
