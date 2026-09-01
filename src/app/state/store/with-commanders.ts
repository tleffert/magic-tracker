import { computed } from '@angular/core';
import { patchState, signalStoreFeature, type, withComputed, withMethods } from '@ngrx/signals';
import { addEntity, entityConfig, updateEntity, withEntities } from '@ngrx/signals/entities';
import { v4 as uuid } from 'uuid';
import { Commander } from '../models/commander';
import { Player } from '../models/player';

export const commanderConfig = entityConfig({
    entity: type<Commander>(),
    collection: 'commander',
    selectId: (commander) => commander.id,
});

export function addCommanderEntity(ownerPlayerId: Player['id']) {
    return addEntity({ id: uuid(), ownerPlayerId, tax: 0 }, commanderConfig);
}

export function withCommanders() {
    return signalStoreFeature(
        withEntities(commanderConfig),
        withComputed((store) => ({
            commandersByOwnerId: computed(() => {
                const byOwner: Record<Player['id'], Commander[]> = {};
                for (const commander of store.commanderEntities()) {
                    (byOwner[commander.ownerPlayerId] ??= []).push(commander);
                }
                return byOwner;
            }),
        })),
        withMethods((store) => ({
            addPartnerCommander(playerId: Player['id']): void {
                patchState(store, addCommanderEntity(playerId));
            },
            updateCommanderTax(commanderId: Commander['id'], tax: number = 0): void {
                patchState(store, updateEntity({
                    id: commanderId,
                    changes: () => ({ tax })
                }, commanderConfig))
            }
        })),
    );
}
