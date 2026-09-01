import { Commander } from './commander';
import { Player } from './player';

/**
 * Damage dealt by one commander to one player.
 * 21 from a single sourceCommanderId is a loss condition (computed later).
 */
export type CommanderDamage = {
    id: string;
    targetPlayerId: Player['id'];
    sourceCommanderId: Commander['id'];
    amount: number;
};

export function commanderDamageId(
    targetPlayerId: Player['id'],
    sourceCommanderId: Commander['id'],
): string {
    return `${targetPlayerId}:${sourceCommanderId}`;
}
