import { computed, inject } from '@angular/core';
import { patchState, signalStore, signalStoreFeature, SignalStoreFeatureType, type, withComputed, withHooks, withMethods } from '@ngrx/signals';
import { addEntity, entityConfig, EntityMap, updateEntity, withEntities } from '@ngrx/signals/entities';
import { v4 as uuid } from 'uuid';
import { Commander } from '../models/commander';
import { Player } from '../models/player';
import { withPlayers } from './with-players';
import { createNewCommander } from '../utils/createNewCommader.function';
import { DEFAULT_COMMANDER } from '../utils/defaultCommander';



export const commanderConfig = entityConfig({
    entity: type<Commander>(),
    collection: 'commander',
    selectId: (commander) => commander.id,
});

export function addCommanderEntity(ownerPlayerId: Player['id'], overrides: Partial<Commander> = DEFAULT_COMMANDER) {
    return addEntity(createNewCommander({
        ownerPlayerId,
        overrides
    }), commanderConfig);
}

export function withCommanders() {
    return signalStoreFeature(
        withEntities(commanderConfig),
        withMethods((store) => ({
            getCommanderById(id: Commander['id']): Commander {
                return store.commanderEntityMap()[id];
            }
        })),
        withMethods((store) => ({
            updateCommanderTax(commanderId: Commander['id'], tax: number = 0): void {
                patchState(store, updateEntity({
                    id: commanderId,
                    changes: () => ({ tax })
                }, commanderConfig))
            }
        }))
    );
}

export const CommandersStore = signalStore(withCommanders())

export type CommandersFeature = SignalStoreFeatureType<
    typeof withCommanders
>;