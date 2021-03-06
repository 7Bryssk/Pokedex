import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PokeapiService } from 'pokedata';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit, OnDestroy {
  isAlive = true;
  pokemonNumber: number;
  pokemon: any = {};

  constructor(
    private activateRoute: ActivatedRoute,
    private pokeApi: PokeapiService
  ) { }

  ngOnInit() {
    this.activateRoute.params
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((params: any) => {
        this.pokemonNumber = parseInt(params['number'], 10);
        this.getPokemon();
      })
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  getPokemon() {
    this.pokeApi.getPokemon(this.pokemonNumber)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe(response => {
        this.pokemon = response
      })
  }

}
