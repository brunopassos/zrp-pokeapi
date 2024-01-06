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
        event.preventDefault();
        if(pokemonName.length < 3){
            toast.error("Nome do pokémon inválido. Digite ao menos 3 caracteres!")
        } else{
            setIsLoading(true)
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
      }

    function handleSetPokemonName(value: string){
        setPokemonName(value)        
    }


return (
        <section className="flex">
            <section className="flex bg-[#292929] w-[540px] h-[186px] rounded-md mt-32 mr-8">
                <form action="" onSubmit={handleGetPokemonData} className="m-6">
                    <h1 className="text-gray-100 font-roboto text-base font-normal leading-6 mb-2">Quero saber mais sobre...</h1>
                    <input 
                        placeholder="Nome do pokémon"
                        type="text" 
                        onChange={(event) => handleSetPokemonName(event.target.value)} 
                        className="flex p-3 items-center gap-2 self-stretch rounded-md bg-yellow-200 w-[492px] h-[46px] mb-4"
                        />
                    
                    <button 
                    type='submit'
                    className="w-[492px] h-[46px] bg-[#DE9400] rounded-md text-white"
                    >
                        {isLoading ? "Carregando..." : "Buscar pokémon"}
                    </button>            
                </form>
            </section>
            <aside className="min-w-[540px] min-h-[300px]  pl-10 bg-[#292929] rounded-md">
                <h2 className="text-gray-100 font-roboto text-[24px] font-normal leading-160 mt-6">Informações do pokémon</h2>
                <p className="text-gray-100 font-roboto text-[14px] font-normal leading-160 my-9">Habilidades</p>
                {pokemonData?.map((pokemonAbilitie) => {
                    return <p className=" flex items-center text-base pl-2 text-white border border-gray-700 w-[460px] h-[46px] mb-6" key={`${pokemonAbilitie.ability.name}`}>{pokemonAbilitie.ability.name}</p>
                })}
            </aside>
        </section>
    )
}