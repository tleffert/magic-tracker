import { patchState, signalStoreFeature, type, withMethods } from "@ngrx/signals";
import { addCommanderEntity, CommandersFeature } from "../store/with-commanders";
import { addPlayerEntity, PlayersFeature } from "../store/with-players";
import { GameStateFeature } from "../store/with-game-state";
import { createNewCommander } from "../utils/createNewCommader.function";
import { createNewPlayer } from "../utils/createNewPlayer.function";

export function addPlayerMethod() {
    return signalStoreFeature(
        type<CommandersFeature & PlayersFeature & GameStateFeature>(),
        withMethods((store) => ({
            addPlayer(): void {
                const startingLife = store.gameConfig().startingLife;
                const newPlayer = createNewPlayer({health: startingLife});
                const playerCommander = createNewCommander({ownerPlayerId: newPlayer.id});
                newPlayer.commanderIds = [playerCommander.id];            
                patchState(
                    store,
                    addPlayerEntity(newPlayer),
                    addCommanderEntity(newPlayer.id, playerCommander),
                );
            },
        }))
    )
}