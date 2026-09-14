import {Factory} from 'rosie';
import { Player } from '../models/player';
import { Commander } from '../models/commander';
import { getTotalCommanderDamageToPlayer } from './getTotalCommanderDamageToPlayer.function';
import { EntityMap } from '@ngrx/signals/entities';
import { CommanderDamageByTarget } from '../models/commander-damage';

const PlayerFactory = Factory.define<Player>('player');
const CommanderFactory = Factory.define<Commander>('commander');


describe('getTotalCommanderDamageToPlayer', () => {
    let player1: Player;
    let player2: Player;
    let player1Commander: Commander;
    let player2Commander: Commander
    let playerEntityMap: EntityMap<Player>;
    let commanderEntityMap: EntityMap<Commander>;

    beforeEach(() => {
        player1 = PlayerFactory.build({
            id: 'player1',
        });
    
        player1Commander = CommanderFactory.build({
            id: 'player1Commadner',
            ownerPlayerId: player1.id,
        })
    
        player2 = PlayerFactory.build({
            id: 'player2',
        });
    
        player2Commander = CommanderFactory.build({
            id: 'player2Commadner',
            ownerPlayerId: player1.id,
        })
    
        playerEntityMap = {
            [player1.id]: player1,
            [player2.id]: player2
        }
    
        commanderEntityMap = {
            [player1Commander.id]: player1Commander,
            [player2Commander.id]: player2Commander
        }
    });

    it('correctly calculate when no commander damage entries exist', () => {
        const result = getTotalCommanderDamageToPlayer(player1.id, {}, playerEntityMap,  commanderEntityMap);
        expect(result).toBe(0)
    });

    describe('no partners', () => {
        it('correctly calculate damage to player', () => {
            const damageEntryMapping = {
                [player1.id]: {
                    [player2Commander.id]: 1
                }
            }
            const result = getTotalCommanderDamageToPlayer(player1.id, damageEntryMapping, playerEntityMap,  commanderEntityMap);
            expect(result).toBe(1)
        });

        it('correctly calcuate damage to player with multiple opponents', () => {
            const player3 = PlayerFactory.build({
                id: 'player3'
            });

            const player3Commander = CommanderFactory.build({
                id: 'player3Commander',
                ownerPlayerId: player3.id
            });

            playerEntityMap[player3.id] = player3;
            commanderEntityMap[player3Commander.id] = player3Commander;
            const damageEntryMapping = {
                [player1.id]: {
                    [player2Commander.id]: 1,
                    [player3Commander.id]: 4
                }
            }
            const result = getTotalCommanderDamageToPlayer(player1.id, damageEntryMapping, playerEntityMap,  commanderEntityMap);
            expect(result).toBe(5)
        });
    })

    describe('with partners', () => {
        let player2CommanderPartner: Commander;
        let commanderEntityMapWithParther: EntityMap<Commander>;
        let damageEntryMapping: CommanderDamageByTarget;

        beforeEach(() => {
            player2CommanderPartner = CommanderFactory.build({
                id: 'player2Partner',
                ownerPlayerId: player2.id,
                isPartner: true
            });
            commanderEntityMapWithParther = {
                ...commanderEntityMap,
                [player2CommanderPartner.id]: player2CommanderPartner
            }
            damageEntryMapping = {
                [player1.id]: {
                    [player2Commander.id]: 1,
                    [player2CommanderPartner.id]: 2
                }
            }
        })

        it('calculate damage totals include partners', () => {
            player2.partnerEnabled = true;
            const result = getTotalCommanderDamageToPlayer(player1.id, damageEntryMapping, playerEntityMap,  commanderEntityMapWithParther);
            expect(result).toBe(3)
        })

        it('ignore partners if existing when partners are not enabled for owner', () => {
            player2.partnerEnabled = false;
            const result = getTotalCommanderDamageToPlayer(player1.id, damageEntryMapping, playerEntityMap,  commanderEntityMapWithParther);
            expect(result).toBe(1)
        })
        
    })
});