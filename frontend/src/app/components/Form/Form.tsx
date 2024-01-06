"use client"

import { useEffect, useState } from "react"
import { toast } from "react-toastify"

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
    const [pokemonData, setPokemonData] = useState<IPokemonAbilities | null>()
    const [isLoading, setIsLoading] = useState(false)

    async function handleGetPokemonData(event: React.FormEvent) {
        setIsLoading(true)
        event.preventDefault();
        try {
          const response = await fetch(`http://localhost:3333/api/pokemons/${pokemonName}`);
          if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.error.message;
            throw new Error(`${errorMessage}`);
          }
          const result = await response.json();
          setPokemonData(result);
          setIsLoading(false)
        } catch (error: any) {
            toast.error(error.message);
            setIsLoading(false)
        } 
      }

    function handleSetPokemonName(value: string){
        if(value.length < 3) {
            setPokemonData(null)
        }else{
            setPokemonName(value)
        }
    }

return (
    <section className="flex">
        <form action="" onSubmit={handleGetPokemonData} className="m-2">
            <h1 className="text-xl mb-2">Digite abaixo o nome do pokemon</h1>
            <input 
                placeholder="pikachu"
                type="text" 
                name="" 
                id="" 
                onChange={(event) => handleSetPokemonName(event.target.value)} 
                className="h-12 w-64 pl-2 bg-slate-700 rounded-l-md text-white outline-none"
            />
             
            <button 
            type='submit'
            className="h-12 w-36 bg-[#1276DF] rounded-r-md text-white"
            >
                {isLoading ? "Carregando..." : "Buscar"}
            </button>            
        </form>
        <div className="w-96 flex flex-col items-start justify-center pl-10">
            {pokemonData && 
                <h2 className="text-xl">Habilidades:</h2>
            }
            {pokemonData?.map((pokemonAbilitie) => {
                return <p className="text-base pl-2" key={`${pokemonAbilitie.ability.name}`}>{pokemonAbilitie.ability.name}</p>
            })}
        </div>
    </section>
    )
}