export interface IPokemonAbility {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}

export interface IPokemonAbilities extends Array<IPokemonAbility> {}