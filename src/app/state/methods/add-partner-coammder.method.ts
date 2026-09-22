import { patchState, signalStoreFeature, type, withMethods } from "@ngrx/signals";
import { addCommanderEntity, CommandersFeature } from "../store/with-commanders";
import { PlayersFeature } from "../store/with-players";
import { updateEntity } from "@ngrx/signals/entities";
import { Player } from "../models/player";
import { createNewCommander } from "../utils/createNewCommader.function";

export function addPartnerCommanderMethod() {
    return signalStoreFeature(
        type<CommandersFeature & PlayersFeature >(),
        withMethods((store) => ({
            addPartnerCommander(playerId: Player['id']): void {
                const playerPartnerCommander = createNewCommander({ownerPlayerId: playerId});
                const playerCommanders = store.playerEntityMap()[playerId].commanderIds;
                if (playerCommanders) {
                    playerCommanders[1] = playerPartnerCommander.id;
                    patchState(store, 
                        updateEntity({id: playerId, changes: {commanderIds: playerCommanders}}, {collection: 'player'}),
                        addCommanderEntity(playerId, {...playerPartnerCommander, isPartner: true})
                    );
                }
               // Possible error handling
               // Error state being that we are trying to add a partner commander to player without previously establishing a primary commander
            },
        }))
    )
}