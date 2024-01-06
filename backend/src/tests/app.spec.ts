import request from "supertest"
import { app } from "../app"

describe("Test the main API route using pikachu", () => {

    it("Should return pokemon data successfully", async () => {
        const testResponse = await request(app).get("/api/pokemons/pikachu")
        expect(testResponse.statusCode).toBe(200)
        expect(testResponse.body).toBeInstanceOf(Array);
        expect(testResponse.body.length).toBeGreaterThan(0);
    })

    it("Should return Pokemon with ability 'lightning-rod'", async () => {
        const testResponse = await request(app).get("/api/pokemons/pikachu");
        expect(testResponse.statusCode).toBe(200);
        expect(testResponse.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    ability: {
                        name: "lightning-rod",
                        url: "https://pokeapi.co/api/v2/ability/31/"
                    },
                    is_hidden: true,
                    slot: 3
                })
            ])
        );
    });

    it("Should return Pokemon with ability 'static'", async () => {
        const testResponse = await request(app).get("/api/pokemons/pikachu");
        expect(testResponse.statusCode).toBe(200);
        expect(testResponse.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    ability: {
                        name: "static",
                        url: "https://pokeapi.co/api/v2/ability/9/"
                    },
                    is_hidden: false,
                    slot: 1
                })
            ])
        );
    });
})

describe("Test the main API route using a non exist pokemon name", () => {
    it("Should return 404 for invalid Pokemon name", async () => {
        const invalidPokemonName = "invalidpokemonname";
        const testResponse = await request(app).get(`/api/pokemons/${invalidPokemonName}`);
        
        expect(testResponse.statusCode).toBe(404);
        expect(testResponse.body).toHaveProperty("error");
        expect(testResponse.body.error).toHaveProperty("message", "Pokémon não encontrado");
        expect(testResponse.body.error).toHaveProperty("errorLocationCode", "backend_src_services_getPokemon.service.ts");
    });
})