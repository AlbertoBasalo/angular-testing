import { Injectable } from '@angular/core';
import { ApiService } from '@services/api.service';

@Injectable()
export class OptionsService {
  constructor(private api: ApiService) {}
}
