import { TestBed } from '@angular/core/testing';
import { signalStore } from '@ngrx/signals';
import { withCommanderDamage } from './with-commander-damage';

describe('withCommanderDamage', () => {
    const Store = signalStore(withCommanderDamage());

    let store: InstanceType<typeof Store>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [Store],
        });
        store = TestBed.inject(Store);
    });

    it('stores damage nested by target player then source commander', () => {
        store.addCommanderDamage('player-a', 'cmd-x', 6);
        store.addCommanderDamage('player-a', 'cmd-y', 3);
        store.addCommanderDamage('player-b', 'cmd-x', 11);

        expect(store.commanderDamageByTarget()).toEqual({
            'player-a': { 'cmd-x': 6, 'cmd-y': 3 },
            'player-b': { 'cmd-x': 11 },
        });
    });

    it('increments an existing source instead of replacing it', () => {
        store.addCommanderDamage('player-a', 'cmd-x', 6);
        store.addCommanderDamage('player-a', 'cmd-x', 2);

        expect(store.commanderDamageByTarget()['player-a']['cmd-x']).toBe(8);
    });
});
