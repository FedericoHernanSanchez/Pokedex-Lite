import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  pokemons: any[] = [];
  offset: number = 0;
  limit: number = 100; 
  canGoBack: boolean = false; 
  


  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.pokemonService.getPokemons(this.offset, this.limit).subscribe((data: any) => {
      
      const pokemonRequests = data.results.map((pokemon: any) => this.pokemonService.getPokemonDetails(pokemon.url));
      
      forkJoin(pokemonRequests).subscribe((pokemonDetails: any) => {
        this.pokemons = pokemonDetails
          .filter((details: any) => details) 
          .map((details: any) => ({
            name: details.name,
            types: details.types.map((type: any) => type.type.name), 
            level: details.base_experience, 
            abilities: details.abilities.map((ability: any) => ability.ability.name),
            id: details.id 
          }));
        this.canGoBack = this.offset > 0; 
      });
    });
  }

  loadMore(): void {
    this.offset += this.limit; 
    this.loadPokemons();
  }

  goBack(): void {
    if (this.offset > 0) {
      this.offset -= this.limit; 
      this.loadPokemons();
    }
  }

  logOut() {
    localStorage.removeItem('userId');
    this.router.navigate(['login']);
  }

  viewDetails(pokemonId: number): void {
    this.router.navigate(['pokemon', pokemonId]); 
  }
}