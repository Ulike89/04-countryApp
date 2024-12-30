import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  standalone: false,
  
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {
  countriesCapitalPageComponent: Country[] = [];
  isLoading: boolean = false;
  initialValue:string = '';
  
  constructor(private countriesService: CountriesService){
  }
  ngOnInit(): void {
    this.countriesCapitalPageComponent = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  searchByCapital(capitalName: string): void{
    this.isLoading = true;
    this.countriesService.searchCapital(capitalName)
    .subscribe(countries => {
      this.countriesCapitalPageComponent = countries;
      this.isLoading = false
    });
  }
}
