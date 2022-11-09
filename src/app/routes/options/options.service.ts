import { Injectable } from '@angular/core';
import { Option } from '@models/option.interface';
import { ApiService } from '@services/api.service';

@Injectable()
export class OptionsService {
  constructor(private api: ApiService) {}

  getOptionsForEndPoint$(endPoint: string) {
    return this.api.getOptions$(endPoint);
  }
  saveOption$(endpoint: string, option: Partial<Option>) {
    return this.api.postOption$(endpoint, option);
  }
  deleteOption$(endpoint: string, option: Partial<Option>) {
    return this.api.deleteOption$(endpoint, option.id || '');
  }
}
