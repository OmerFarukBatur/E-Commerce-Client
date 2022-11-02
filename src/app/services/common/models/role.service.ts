import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClientServices: HttpClientService) { }

  async getRoles(){

  }

  async create(name: string, succesCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){
    const observable: Observable<any> = this.httpClientServices.post({
      controller : "roles",
      action: "create-role"
    },{name: name});

    return await firstValueFrom(observable) as {succeeded: boolean};

  }
}
