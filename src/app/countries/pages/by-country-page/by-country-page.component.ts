import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  standalone: false,
  
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {
  countriesCountryPageComponent: Country[] = [];
  initialValue:string = '';
    
  constructor(private countriesService: CountriesService){
  }

  ngOnInit(): void {
    this.countriesCountryPageComponent = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
  }

  searchByCountry(term: string): void{
    this.countriesService.searchCountry(term)
    .subscribe(countries => {
      this.countriesCountryPageComponent = countries;
    });
  }
}
