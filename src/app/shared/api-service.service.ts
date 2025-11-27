import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  http = inject(HttpClient);

constructor() { }

get data():any {
  return this.http.get('data/store.json').pipe();
}

}
