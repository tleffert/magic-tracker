import { patchState, signalStoreFeature, SignalStoreFeatureType, type, withMethods, } from '@ngrx/signals';
import { addEntity, entityConfig, EntityState, updateEntity, withEntities } from '@ngrx/signals/entities';
import { DEFAULT_PLAYER_STATE, Player, PlayerCommanderIds } from '../models/player';

export const playerConfig = entityConfig({
    entity: type<Player>(),
    collection: 'player',
    selectId: (player) => player.id,
});

export function addPlayerEntity(player: Player) {
    return addEntity(player, playerConfig);
}

export function addPlayerEnityWithCommanders(playerId: Player['id'], commanderIds: PlayerCommanderIds) {
    return addEntity({ ...DEFAULT_PLAYER_STATE, id: playerId, commanderIds }, playerConfig);
}


export function withPlayers() {
    return signalStoreFeature(
        withEntities(playerConfig),
        withMethods((store) => ({
            selectPlayerById(id: Player['id']): Player {
                return store.playerEntityMap()[id];
            }
        })),
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
        })),
    );
}

export type PlayersFeature = SignalStoreFeatureType<
    typeof withPlayers
>;
