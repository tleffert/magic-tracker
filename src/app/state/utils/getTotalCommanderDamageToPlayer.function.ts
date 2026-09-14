import { EntityMap } from "@ngrx/signals/entities";
import { CommanderDamageByTarget } from "../models/commander-damage";
import { Player } from "../models/player";
import { Commander } from "../models/commander";

export function getTotalCommanderDamageToPlayer(playerId: Player['id'], damageByTargetMap: CommanderDamageByTarget, playerEntityMap: EntityMap<Player>, commanderEntityMap: EntityMap<Commander>): number {

    const playerEntries = damageByTargetMap[playerId];

    if (!playerEntries) {
        return 0;
    }

    return Object.entries(playerEntries).reduce((total, [commanderId, damage]) => {
        const commander = commanderEntityMap[commanderId];
        const commanderOwner = playerEntityMap[commander.ownerPlayerId];
        if (!commanderOwner.partnerEnabled && commander.isPartner) {
            return total;
        }
        return total+damage;
    }, 0);

}