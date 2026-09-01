import { patchState, signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { addEntity, entityConfig, updateEntity, withEntities } from '@ngrx/signals/entities';
import { DEFAULT_PLAYER_STATE, Player } from '../models/player';

export const playerConfig = entityConfig({
    entity: type<Player>(),
    selectId: (player) => player.id,
});

export function addPlayerEntity(playerId: Player['id']) {
    return addEntity({ id: playerId, ...DEFAULT_PLAYER_STATE }, playerConfig);
}

export function withPlayers() {
    return signalStoreFeature(
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
        })),
    );
}
