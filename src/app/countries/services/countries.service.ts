import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region-type.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private serviceUrl:   string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital:   { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion:    { region: '', countries: [] },
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem( 'cacheStore', JSON.stringify( this.cacheStore ));
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  searchCapital(capitalName: string): Observable<Country[]> {
    const url = `${this.serviceUrl}/capital/${capitalName}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byCapital = {term: capitalName,countries}),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchCountry(countryName: string): Observable<Country[]> {
    const url = `${this.serviceUrl}/name/${countryName}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byCountries = {term: countryName,countries}),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchRegion(regionName: Region): Observable<Country[]> {
    const url = `${this.serviceUrl}/region/${regionName}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byRegion = {region: regionName,countries}),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {

    const url = `${ this.serviceUrl }/alpha/${code}`;

    return this.http.get<Country[]>(url)
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null ),
        catchError(() => of(null))
      );
  }

  private getCountriesRequest( url: string ): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError( () => of([]) )
      );
  }
}
