import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region-type.interface';

@Component({
  selector: 'app-by-region-page',
  standalone: false,
  
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {
  countriesRegionPageComponent: Country[] = [];
  regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  selectedRegion?: Region;
  
  constructor(private countriesService: CountriesService){
  }

  ngOnInit(): void {
    this.countriesRegionPageComponent = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }
  
  searchByRegion(region: Region): void{
    this.selectedRegion = region;
    
    this.countriesService.searchRegion(region)
    .subscribe(countries => {
      this.countriesRegionPageComponent = countries;
    });
  }
}
