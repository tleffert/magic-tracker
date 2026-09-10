import { computed, Signal } from '@angular/core';
import { patchState, signalStoreFeature, type, withComputed, withMethods, withState } from '@ngrx/signals';
import { Commander } from '../models/commander';
import { CommanderDamage, CommanderDamageByTarget } from '../models/commander-damage';
import { Player } from '../models/player';
import { updateEntity } from '@ngrx/signals/entities';
import { getTotalCommanderDamageToPlayer } from '../utils/getTotalCommanderDamageToPlayer.function';

export type CommanderDamageState = {
    commanderDamageByTarget: CommanderDamageByTarget;
};

const DEFAULT_COMMANDER_DAMAGE_STATE: CommanderDamageState = {
    commanderDamageByTarget: {},
};

export function withCommanderDamage() {
    return signalStoreFeature(
        {
            state: type<{
                assigningCommanderDamage: Player['id'] | undefined
            }>()
        },
        withState(DEFAULT_COMMANDER_DAMAGE_STATE),
        withComputed((store) => ({
            totalCommanderDamageToPlayerById: computed(() => {
                const byTarget = store.commanderDamageByTarget();
                const totals: Record<Player['id'], number> = {};

                for (const playerId of Object.keys(byTarget)) {
                    totals[playerId] = getTotalCommanderDamageToPlayer(playerId, byTarget);
                }
                return totals;
            }),
        })),
        withMethods((store) => ({
            addCommanderDamage(
                targetPlayerId: Player['id'],
                sourceCommanderId: Commander['id'],
                amount: number,
            ): void {
                const byTarget = store.commanderDamageByTarget();
                const forPlayer = byTarget[targetPlayerId] ?? {};
                patchState(store, {
                    commanderDamageByTarget: {
                        ...byTarget,
                        [targetPlayerId]: {
                            ...forPlayer,
                            [sourceCommanderId]: (forPlayer[sourceCommanderId] ?? 0) + amount,
                        },
                    },
                });
            },
            getCommanderDamageByAssigningPlayer(): Signal<Record<Commander['id'], number>> {
                return computed(() => {
                    const currentAssigningPlayer = store.assigningCommanderDamage();
                    if (!currentAssigningPlayer) {
                        return {};
                    }
                    return store.commanderDamageByTarget()[currentAssigningPlayer] ?? {};
                })
            },
        })),
    );
}
