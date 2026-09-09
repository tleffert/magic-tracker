import { computed } from '@angular/core';
import { patchState, signalStoreFeature, type, withComputed, withMethods } from '@ngrx/signals';
import { addEntity, entityConfig, updateEntity, withEntities } from '@ngrx/signals/entities';
import { Commander } from '../models/commander';
import { CommanderDamage, commanderDamageId } from '../models/commander-damage';
import { Player } from '../models/player';

export const commanderDamageConfig = entityConfig({
    entity: type<CommanderDamage>(),
    collection: 'commanderDamage',
    selectId: (damage) => damage.id,
});

export function withCommanderDamage() {
    return signalStoreFeature(
        withEntities(commanderDamageConfig),
        withComputed((store) => ({
            commanderDamageByCommanderByPlayerId: computed(() => {
                const byTarget: Record<Player['id'], CommanderDamage[]> = {};
                for (const damage of store.commanderDamageEntities()) {
                    (byTarget[damage.targetPlayerId] ??= []).push(damage);
                }
                return byTarget;
            }),
        })),
        withComputed((store) => ({
            totalCommanderDamageToPlayerById: computed(() => {
                const damageByPlayer: Record<Player['id'], number> = {};
                const playerCommanderDamagebyCommander = store.commanderDamageByCommanderByPlayerId();
                // nested loop not the best looking
                for(const [playerId, commanderDamages] of Object.entries(playerCommanderDamagebyCommander)) {
                   const totalForPlayer = commanderDamages.reduce<number>((totalDamage: number, commanderDamage: CommanderDamage) => {
                        return totalDamage + commanderDamage.amount;
                    }, 0);

                    damageByPlayer[playerId] = totalForPlayer ?? 0;
                }
                return damageByPlayer;
            })
        })),
        withMethods((store) => ({
            addCommanderDamage(
                targetPlayerId: Player['id'],
                sourceCommanderId: Commander['id'],
                amount: number,
            ): void {
                const id = commanderDamageId(targetPlayerId, sourceCommanderId);
                const existing = store.commanderDamageEntityMap()[id];

                if (existing) {
                    patchState(
                        store,
                        updateEntity(
                            { id, changes: { amount: existing.amount + amount } },
                            commanderDamageConfig,
                        ),
                    );
                    return;
                }

                patchState(
                    store,
                    addEntity(
                        { id, targetPlayerId, sourceCommanderId, amount },
                        commanderDamageConfig,
                    ),
                );
            },
        })),
    );
}
