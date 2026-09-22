import { Routes } from '@angular/router';
import { GameSetupComponent } from './features/game-setup-component/game-setup-component';
import { GameContainerComponent } from './features/game-container-component/game-container-component';
import { gameConfiguredGuard } from './guards/game-configured.guard';

export const routes: Routes = [
    {
        path: '',
        component: GameSetupComponent
    },
    {
        path: 'game',
        canActivate: [gameConfiguredGuard],
        component: GameContainerComponent 
    }
];
