import { Request, Response } from "express"
import { getPokemonService } from "../services/getPokemon.service"
import { NotFoundError } from "../errors";

const getPokemonController = async (req: Request, res: Response): Promise<Response | void> => {
    const { poke_name } = req.params

    try {
        const pokemonData = await getPokemonService({ poke_name });
    
        return res.status(200).json(pokemonData);
        
      } catch (error: any) {
        if (error instanceof NotFoundError) {
          const { message, statusCode, errorLocationCode } = error;
    
          return res.status(statusCode).json({
            error: {
              message,
              statusCode,
              errorLocationCode,
            },
          });
        } else {
          console.error(`Erro no servidor: ${error.message}`);
          return res.status(500).json({
            error: {
              message: "Erro interdo do servidor!",
              statusCode: 500,
              errorLocationCode: "backend_src_controllers_getPokemon.controllers.ts",
            },
          });
        }
      }
}

export { getPokemonController }