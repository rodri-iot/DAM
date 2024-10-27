import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { ListadoDispositivosComponent } from './listado-dispositivos/listado-dispositivos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CreditCardComponent, ListadoDispositivosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-standalone';
  // código de componente
}
