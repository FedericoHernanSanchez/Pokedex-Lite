import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any;
  evolutions: any[] = [];

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService,private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) { 
      this.loadPokemonDetails(id);
    } else {
      console.error('ID de Pokémon no encontrado.');
     
    }
  }

  loadPokemonDetails(id: string): void {
    this.pokemonService.getPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${id}`).subscribe((data: any) => {
      this.pokemon = {
        name: data.name,
        types: data.types.map((type: any) => type.type.name),
        level: data.base_experience,
        abilities: data.abilities.map((ability: any) => ability.ability.name),
        image: data.sprites.other['official-artwork'].front_default 
      };
  
      // Cargar las evoluciones
      this.loadEvolutions(id);
    });
  }

  loadEvolutions(id: string): void {
    this.pokemonService.getPokemonDetails(`https://pokeapi.co/api/v2/pokemon-species/${id}`).subscribe((data: any) => {
      const evolutionChainUrl = data.evolution_chain.url;
      this.pokemonService.getPokemonDetails(evolutionChainUrl).subscribe((chainData: any) => {
        this.evolutions = this.extractEvolutions(chainData);
      });
    });
  }

  extractEvolutions(chainData: any): any[] {
    const evolutions = [];
    let current = chainData.chain;

    while (current) {
      evolutions.push({
        name: current.species.name,
        level: current.evolution_details[0]?.min_level || 'N/A', 
        types: [] 
      });

      
      current = current.evolves_to[0];
    }

    return evolutions;
  }

  logOut() {
    localStorage.removeItem('userId');
    this.router.navigate(['login']);
  }
}