import { patchState, signalStore, withMethods } from '@ngrx/signals';
import { v4 as uuid } from 'uuid';
import { addCommanderEntity, withCommanders } from './with-commanders';
import { withCommanderDamage } from './with-commander-damage';
import { addPlayerEntity, withPlayers } from './with-players';

export const PlayerStore = signalStore(
    { providedIn: 'root' },
    withPlayers(),
    withCommanders(),
    withCommanderDamage(),
    withMethods((store) => ({
        addPlayer(): void {
            const playerId = uuid();
            patchState(
                store,
                addPlayerEntity(playerId),
                addCommanderEntity(playerId),
            );
        },
    })),
);
