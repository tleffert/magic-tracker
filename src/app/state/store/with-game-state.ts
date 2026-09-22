import { patchState, signalStoreFeature, SignalStoreFeatureType, withComputed, withMethods, withState } from "@ngrx/signals";
import { Player } from "../models/player"
import { computed } from "@angular/core";
import { DEFAULT_GAME_CONFIG } from "../utils/default-game-setup";
import { GameConfig } from "../models/game-config";

export type GameState = {
    assigningCommanderDamage: Player['id'] | undefined,
    gameConfig: GameConfig, // maybe separate slice
    hasBeenConfigured: boolean
}

const DEFAULT_GAME_STATE: GameState = {
    assigningCommanderDamage: undefined,
    gameConfig: {...DEFAULT_GAME_CONFIG},
    hasBeenConfigured: false
}

export function withGameState() {
    return signalStoreFeature(
        withState(DEFAULT_GAME_STATE),
        withMethods((store) => ({
            setAssigningCommanderDamage(playerId: Player['id']): void {
                patchState(store, {assigningCommanderDamage: playerId})
            },
            clearAssigningCommadanderDamage(): void {
                patchState(store, {assigningCommanderDamage: undefined})
            }
        })),
        withMethods((store) => ({
            setGameConfig(config: GameConfig): void {
                patchState(store, {gameConfig: {...config}, hasBeenConfigured: true})
            },
            resetGame(): void {
                patchState(store, {...DEFAULT_GAME_STATE})
            }
        })),
        withComputed((store) => ({
            isAssigningCommanderDamage: computed(() => {
                return !!store.assigningCommanderDamage()
            })
        }))
    );
}


export type GameStateFeature = SignalStoreFeatureType<
    typeof withGameState
>;
