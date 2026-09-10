import { CommanderDamageByTarget } from "../models/commander-damage";
import { Player } from "../models/player";

export function getTotalCommanderDamageToPlayer(playerId: Player['id'], damageByTargetMap: CommanderDamageByTarget): number {

    const playerEntries = damageByTargetMap[playerId];

    return Object.values(playerEntries).reduce((total, damage) => {return total+damage}, 0);

}