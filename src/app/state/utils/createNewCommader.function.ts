import { Commander } from "../models/commander";
import { Player } from "../models/player";
import { DEFAULT_COMMANDER, NewCommander } from "./defaultCommander";
import { v4 as uuid } from 'uuid';

export function createNewCommander(config: {
    ownerPlayerId: Player['id'], 
    overrides?: Partial<Commander>
}): Commander {
    const {ownerPlayerId, overrides} = config;
 return {
    ...DEFAULT_COMMANDER,
    ...overrides,
    ownerPlayerId,
    id: overrides?.id ?? uuid()
 }
}