import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const PokemonNameSchema = z.string().min(2).transform((pokemonName) => pokemonName.toLowerCase());

const validateAndTransformPokemonName = (req: Request, res: Response, next: NextFunction): void => {

  const { poke_name } = req.params;

  try {

    req.params.poke_name = PokemonNameSchema.parse(poke_name);
    next();

  } catch (error) {
    res.status(400).json({ error: "Nome do Pokémon inválido." });
  }
};

export { validateAndTransformPokemonName };