import { Router } from "express"
import { getPokemonController } from "../controllers/getPokemon.controllers"
import { validateAndTransformPokemonName } from "../middleware/validateAndTransformPokemonName.middleware"

const pokemonRoutes: Router = Router()

pokemonRoutes.get("/pokemons/:poke_name", validateAndTransformPokemonName, getPokemonController)

export {pokemonRoutes}