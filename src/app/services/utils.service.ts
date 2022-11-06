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

  slugify(source: string): string {
    return source.toLowerCase().replace(/ +/g, '-');
  }
}
