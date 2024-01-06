import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const PokemonNameSchema = z.string().min(2).transform((pokemonName) => pokemonName.toLowerCase());

const validateAndTransformPokemonName = (req: Request, res: Response, next: NextFunction): Response | void => {

  const { poke_name } = req.params;

  try {

    req.params.poke_name = PokemonNameSchema.parse(poke_name);
    next();

  } catch (error) {
    return res.status(400).json({ error: "Nome do Pokémon inválido." });
  }
};

export { validateAndTransformPokemonName };