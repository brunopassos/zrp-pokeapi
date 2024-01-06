import { Router } from "express"
import { getPokemonController } from "../controllers/getPokemon.controllers"

const pokemonRoutes: Router = Router()

pokemonRoutes.get("/api/pokemons/:poke_name", getPokemonController)

export {pokemonRoutes}