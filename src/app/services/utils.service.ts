import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  getParam(route: ActivatedRoute, key = 'id'): string {
    return route.snapshot.paramMap.get(key) || '';
  }

  getHyphened(source: string): string {
    // replace non alphanumeric characters with a hyphen
    return source.toLowerCase().replace(/\W+/g, '-');
  }
}
