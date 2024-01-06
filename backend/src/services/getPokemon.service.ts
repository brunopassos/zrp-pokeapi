import { IPokemonAbilities, IPokemonAbility} from "../interfaces/index"
import { NotFoundError } from "../errors/index"

const BASE_POKE_API_URL: string = "https://pokeapi.co/api/v2/pokemon/"

interface Input{
    poke_name: string
}

const getPokemonService = async ({poke_name}: Input): Promise<IPokemonAbilities> => {
    
    const response = await fetch(`${BASE_POKE_API_URL}${poke_name}`);
    
    if (!response.ok) {
        throw new NotFoundError({
            errorLocationCode: "backend_src_services_getPokemon.service.ts",
            statusCode: 404,
            message: "Pokémon não encontrado"
        })
    }

    const pokemonData = await response.json();

    const pokemonAbilities = sortAlphabetically(pokemonData)

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