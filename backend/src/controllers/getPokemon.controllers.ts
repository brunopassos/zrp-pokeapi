import { Request, Response } from "express"
import { getPokemonService } from "../services/getPokemon.service"

const getPokemonController = async (req: Request, res: Response): Promise<Response> => {
    const { poke_name } = req.params

    const pokemonData = await getPokemonService({poke_name})

    return res.status(200).json(pokemonData)
}

export { getPokemonController }