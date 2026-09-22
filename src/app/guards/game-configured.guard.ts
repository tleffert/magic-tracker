import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PlayerStore } from '../state/store/player.store';

export const gameConfiguredGuard: CanActivateFn = () => {
  const store = inject(PlayerStore);
  const router = inject(Router);

  if (store.hasBeenConfigured()) {
    return true;
  } else {
    return router.createUrlTree(['']); 
  }
};