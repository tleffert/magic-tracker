import { patchState, signalStoreFeature, type, withMethods, } from '@ngrx/signals';
import { addEntity, entityConfig, EntityState, updateEntity, withEntities } from '@ngrx/signals/entities';
import { DEFAULT_PLAYER_STATE, Player } from '../models/player';
import { Signal } from '@angular/core';
import { Commander } from '../models/commander';

export const playerConfig = entityConfig({
    entity: type<Player>(),
    selectId: (player) => player.id,
});

export function addPlayerEntity(playerId: Player['id']) {
    return addEntity({ id: playerId, ...DEFAULT_PLAYER_STATE }, playerConfig);
}

export function withPlayers() {
    return signalStoreFeature(
        {
            methods: type<{addPartnerCommander(playerId: Player['id']): void}>(),
            props: type<{
                commandersByOwnerId: Signal<Record<string, Commander[]>>;
            }>()
        },
        withEntities(playerConfig),
        withMethods((store) => ({            
            
            incrementHealth(playerId: Player['id'], amount: number): void {
                patchState(
                    store,
                    updateEntity(
                        {
                            id: playerId,
                            changes: (player) => ({ health: player.health + amount }),
                        },
                        playerConfig,
                    ),
                );
            },
            decrementHealth(playerId: Player['id'], amount: number): void {
                patchState(
                    store,
                    updateEntity(
                        {
                            id: playerId,
                            changes: (player) => ({ health: player.health - amount }),
                        },
                        playerConfig,
                    ),
                );
            },
            togglePartner(playerId: Player['id']): void {
                let player = store.entityMap()[playerId];
                if (!player) {
                    return;
                }
                const playerCommanders = store.commandersByOwnerId()[playerId];
                const willPartnerBeEnabled = !player.partnerEnabled;

                patchState(
                    store,
                    updateEntity(
                        {
                            id: playerId,
                            changes: () => ({ partnerEnabled: willPartnerBeEnabled }),
                        },
                        playerConfig,
                    )
                );
                
                if (willPartnerBeEnabled && playerCommanders.length < 2) {
                    store.addPartnerCommander(playerId);
                } 
            }
        })),
    );
}
