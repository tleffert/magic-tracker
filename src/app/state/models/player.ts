import { Commander } from "./commander";

export type PlayerCommanderIds = [Commander['id'], Commander['id']?];

export type Player = {
    id: string;
    health: number;
    poisonCounters: number;
    partnerEnabled: boolean;
    commanderIds?: PlayerCommanderIds;
};

export const DEFAULT_PLAYER_STATE: Omit<Player, 'id' | 'commanderIds'> = {
    health: 40,
    poisonCounters: 0,
    partnerEnabled: false,
};