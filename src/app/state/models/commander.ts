import { Player } from './player';

/** A commander owned by a player. Partner = a second Commander with the same owner. */
export type Commander = {
    id: string;
    ownerPlayerId: Player['id'];
    tax: number;
};
