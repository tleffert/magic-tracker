import { patchState, signalStore, withComputed, withMethods } from '@ngrx/signals';
import { v4 as uuid } from 'uuid';
import { addCommanderEntity, withCommanders } from './with-commanders';
import { withCommanderDamage } from './with-commander-damage';
import { addPlayerEnityWithCommanders, addPlayerEntity, withPlayers } from './with-players';
import { withGameState } from './with-game-state';
import { computed } from '@angular/core';
import { Commander } from '../models/commander';
import { Player, PlayerCommanderIds } from '../models/player';
import { getTotalCommanderDamageToPlayer } from '../utils/getTotalCommanderDamageToPlayer.function';
import { createNewCommander } from '../utils/createNewCommader.function';
import { createNewPlayer } from '../utils/createNewPlayer.function';
import { updateEntity } from '@ngrx/signals/entities';
import { GameConfig } from '../models/game-config';

export const PlayerStore = signalStore(
    { providedIn: 'root' },
    withCommanders(),
    withPlayers(),
    withGameState(),
    withCommanderDamage(),
    withComputed((store) => ({
        commandersByOwnerId: computed(() => {
            const playerEntities = store.playerEntities();
            const commanderEntityMap = store.commanderEntityMap();

            const mappings: Record<Player['id'], Commander[]> = {};
            playerEntities.forEach(player => {
                if (player.commanderIds) {
                    const [primaryId, partnerId] = player.commanderIds;
                    const primaryCommander = commanderEntityMap[primaryId];
                    const playerCommanders: Commander[] = [primaryCommander];

                    if (partnerId && player.partnerEnabled) {
                        playerCommanders.push(commanderEntityMap[partnerId])
                    }
                    mappings[player.id] = playerCommanders;
                }
            })

            return mappings;
        })
    })),
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
    })),
    withMethods((store) => ({
        addPlayers(numberOfPlayers: number): void {
            for(let i = 0; i < numberOfPlayers; i++) {
                store.addPlayer();
            }
        }
    })),
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
    })),
    withMethods((store) => ({
        togglePartnerCommander(playerId: Player['id']): void {
            const playerToUpdate = store.playerEntityMap()[playerId];
           const currentValue = playerToUpdate.partnerEnabled;
            patchState(store,
                updateEntity({id: playerId, changes: {partnerEnabled: !currentValue}}, {collection: 'player'})
            );
           if (!currentValue && !playerToUpdate?.commanderIds?.[1]) {
                store.addPartnerCommander(playerId);
           }
        },
    })),
    withMethods((store) => ({
        startNewGame(config: GameConfig): void {
            store.setGameConfig(config);
            store.addPlayers(config.numberOfPlayers);
        }
    })),
    withComputed((store) => ({
        validCommandersByOwnerId: computed(() => {
            const players = store.playerEntities();
            const commanderEntityMap = store.commanderEntityMap;
        }),
    })),
    withComputed((store) => ({
        totalCommanderDamageToPlayerById: computed(() => {
            const byTarget = store.commanderDamageByTarget();
            const totals: Record<Player['id'], number> = {};
            const playerEntityMap = store.playerEntityMap();
            const commanderEntityMap = store.commanderEntityMap();


            for (const playerId of Object.keys(byTarget)) {
                totals[playerId] = getTotalCommanderDamageToPlayer(playerId, byTarget, playerEntityMap, commanderEntityMap);
            }
            console.log("=== totals", totals);
            return totals;
        }),
    }))
);
