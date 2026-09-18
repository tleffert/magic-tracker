import { DEFAULT_PLAYER_STATE, Player } from "../models/player";
import { v4 as uuid } from 'uuid';

export function createNewPlayer(overrides: Partial<Player> = DEFAULT_PLAYER_STATE): Player {

    return {
        ...DEFAULT_PLAYER_STATE,
        ...overrides,
        id: overrides.id ?? uuid()
    }
}