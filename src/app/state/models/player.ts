import { Commander } from "./commander";

export type Player = {
    id: string;
    health: number;
    poisonCounters: number;
    partnerEnabled: boolean;
};

export const DEFAULT_PLAYER_STATE: Omit<Player, 'id'> = {
    health: 40,
    poisonCounters: 0,
    partnerEnabled: false,
};