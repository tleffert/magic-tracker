import { Commander } from './commander';
import { Player } from './player';

export type CommanderDamageByTarget = Record<
    Player['id'],
    Record<Commander['id'], number>
>;

export type CommanderDamage = {
    sourceCommanderId: Commander['id'];
    amount: number;
};
