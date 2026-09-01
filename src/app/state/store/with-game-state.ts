import { patchState, signalStoreFeature, withComputed, withMethods, withState } from "@ngrx/signals";
import { Player } from "../models/player"
import { computed } from "@angular/core";

export type GameState = {
    assigningCommanderDamage: Player['id'] | undefined
}

const DEFAULT_GAME_STATE: GameState = {
    assigningCommanderDamage: undefined
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
        withComputed((store) => ({
            isAssigningCommanderDamage: computed(() => {
                return !!store.assigningCommanderDamage
            })
        }))
    );
}