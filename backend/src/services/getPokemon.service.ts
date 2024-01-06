import { IPokemonAbilities, IPokemonAbility} from "../interfaces/index"

const BASE_POKE_API_URL: string = "https://pokeapi.co/api/v2/pokemon/"

interface Input{
    poke_name: string
}

const getPokemonService = async ({poke_name}: Input): Promise<IPokemonAbilities> => {
    try {
        const response = await fetch(`${BASE_POKE_API_URL}${poke_name.toLowerCase()}`);
        
        if (!response.ok) {
            
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const pokemonData = await response.json();

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
    } catch (error: any) {
        
        console.error(`Erro na requisição: ${error.message}`);
        throw error;
    }
}

export { getPokemonService }