"use client"

import { useState } from "react"

interface IPokemonAbility {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}

interface IPokemonAbilities extends Array<IPokemonAbility> {}

export default function Form(){

    const [pokemonName, setPokemonName] = useState("")
    const [pokemonData, setPokemonData] = useState<IPokemonAbilities>()

    async function handleGetPokemonData(event: React.FormEvent){
        event.preventDefault()
        try {
            const response = await fetch(`http://localhost:3333/api/pokemons/${pokemonName}`);
            if (!response.ok) {
                throw new Error('Erro ao obter dados da API');
            }
            const result = await response.json();
            setPokemonData(result)
        } catch (error) {
            console.error('Erro na requisição:', error);
        } finally {
        }
    }

    function handleSetPokemonName(value: string){
        setPokemonName(value)
    }

    return (
        <>
        <form action="" onSubmit={handleGetPokemonData}>
            <input type="text" name="" id="" onChange={(event) => handleSetPokemonName(event.target.value)}/>
            <button type='submit'>Buscar</button>
        </form>
        {pokemonData?.map((pokemonAbilitie) => {
            return <p key={`${pokemonAbilitie.ability.name}`}>{pokemonAbilitie.ability.name}</p>
        })}
        </>
    )
}