import { Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { HomePageComponent } from './home-page/home-page.component';
import { authGuard } from './auth/auth.guard';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';


export const routes: Routes = [
    {path :'login',component : LogInComponent},
    {path:'',component: HomePageComponent, canActivate: [authGuard]},
    {path:"pokemon/:id",component: PokemonDetailComponent},
]
