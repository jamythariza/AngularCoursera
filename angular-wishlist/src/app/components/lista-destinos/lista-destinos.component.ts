import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoViaje} from './../../models/destino-viaje.model'
import { DestinosApiClient } from '../../models/destinos-api-client.model';
import { Store, State } from '@ngrx/store';
import { AppState } from '../../app.module';
import { ajax } from 'rxjs/ajax';
import { ElegidoFavoritoAction, NuevoDestinoAction } from '../../models/destinos-viajes-state.model';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css'],
  providers: [DestinosApiClient]
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded : EventEmitter<DestinoViaje>;
  updates: string[]
  all;

  constructor(public destinosApiClient:DestinosApiClient, private store: Store<AppState>) {
    this.onItemAdded = new EventEmitter(); 
    this.updates = [];
    this.store.select(state => state.destinos.favorito)
      .subscribe(d => {
        if (d != null) {
          this.updates.push('Se eligió: ' + d.nombre);
        }
      });
     store.select(State => State.destinos.items).subscribe(items => this.all = items);

   }

  ngOnInit(): void {

  }

  agregado(d: DestinoViaje) {
    this.destinosApiClient.add(d);
   this.onItemAdded = new EventEmitter(); 
  }

  elegido(e:DestinoViaje){
    this.destinosApiClient.elegir(e);
  }

  getAll(){

  }
}
