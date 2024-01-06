import { IPokemonAbilities, IPokemonAbility} from "../interfaces/index"
import { NotFoundError } from "../errors/index"
import { redis } from "../lib/redis"

const BASE_POKE_API_URL: string = "https://pokeapi.co/api/v2/pokemon/"

interface Input{
    poke_name: string
}

const getPokemonService = async ({poke_name}: Input): Promise<IPokemonAbilities> => {
    
    const cachedPokemon = await redis.get(poke_name)

    if(cachedPokemon){
        console.log(`Esse console será exibido para informar que os dados do pokemon ${poke_name} foram buscados no cache.`)
        const updatedCachedPokemon: IPokemonAbilities = JSON.parse(cachedPokemon)
        return updatedCachedPokemon
    }

    const response = await fetch(`${BASE_POKE_API_URL}${poke_name}`);
    
    if (!response.ok) {
        throw new NotFoundError({
            errorLocationCode: "backend_src_services_getPokemon.service.ts",
            statusCode: 404,
            message: "Pokémon não encontrado"
        })
    }

    console.log(`Esse console será exibido caso o pokemon ${poke_name} não esteja no cache`)

    const pokemonData = await response.json();

    const pokemonAbilities = sortAlphabetically(pokemonData)

    await redis.set(poke_name, JSON.stringify(pokemonAbilities))

    return pokemonAbilities    
    
}

export function sortAlphabetically(pokemonData: any){
    const pokemonAbilities: IPokemonAbilities = pokemonData.abilities.sort((a: IPokemonAbility, b: IPokemonAbility) => {
        const nameA = a.ability.name.toLowerCase();
        const nameB = b.ability.name.toLowerCase()

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    })
        
    return pokemonAbilities
}

export { getPokemonService }