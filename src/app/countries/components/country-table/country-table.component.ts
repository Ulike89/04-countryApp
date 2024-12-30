import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-table',
  standalone: false,
  
  templateUrl: './country-table.component.html',
  styles: `
  img {
    width: 25px;
  }
  `
})
export class CountryTableComponent {
  @Input()
  countriesTableComponent: Country[] = [];
}
