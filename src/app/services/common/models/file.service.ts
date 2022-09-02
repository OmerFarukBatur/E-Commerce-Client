
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { BaseURL } from 'src/app/contracts/base_url';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private httpClientServices: HttpClientService) { }

  async getBaseStorageUrl() : Promise<BaseURL>{
    const getObservable : Observable<BaseURL> = this.httpClientServices.get<BaseURL>({
        controller: "files",
        action : "GetBaseStorageUrl"
    });

    return await firstValueFrom(getObservable);    
  }
}