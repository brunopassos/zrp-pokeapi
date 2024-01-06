import { Redis} from "ioredis"

// A chave está pública por questões acadêmicas. Não replique em produção.
const REDIS_URL = "rediss://default:7d7f47be93e64390b176fe8cfe3796ad@feasible-hare-42486.upstash.io:42486"

export const redis = new Redis(REDIS_URL)