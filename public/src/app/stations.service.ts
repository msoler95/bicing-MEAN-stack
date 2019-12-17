import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class StationsService {

  private bicingUrl = 'http://localhost:8080/stations';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { }

  getStations(): Observable<any[]> {
    return this.http.get<any[]>(this.bicingUrl)
      .pipe(
        tap(_ => console.log('fetched stations')),
        catchError(this.handleError<any[]>('getStation', []))
      );
  }

  getStationsByParams(params): Observable<any[]> {
    console.log(this.bicingUrl + params)
    return this.http.get<any[]>(this.bicingUrl + params)
      .pipe(
        tap(_ => console.log('fetched stations')),
        catchError(this.handleError<any[]>('getStation', []))
      );
  }

  getNearestStationWithFreeBikes(params): Observable<any[]> {
    console.log(this.bicingUrl + "/nearestStationWithFreeBikes/" + params)
    return this.http.get<any[]>(this.bicingUrl + "/nearestStationWithFreeBikes/" + params)
      .pipe(
        tap(_ => console.log('fetched stations')),
        catchError(this.handleError<any[]>('getStation', []))
      );
  }

  allStationsWithoutTime(): Observable<any[]> {
    return this.http.get<any[]>(this.bicingUrl + "/allStationsWithoutTime")
      .pipe(
        tap(_ => console.log('fetched stations')),
        catchError(this.handleError<any[]>('getStation', []))
      );
  }

  getStationTimeInformation(id): Observable<any[]> {
    return this.http.get<any[]>(this.bicingUrl + "/timeInformation/" + id)
      .pipe(
        tap(_ => console.log('fetched stations')),
        catchError(this.handleError<any[]>('getStation', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
