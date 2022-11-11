import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationEndpointService {

  constructor(private httpClientServices: HttpClientService) { }


  async assignRoleEndpoint(roles: string[],code: string,menu:string,succesCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){
    const observable: Observable<any> = this.httpClientServices.post({
      controller : "AuthorizationEndpoints",
      action: "assignroleendpoint"
    },{roles: roles, code: code, menu: menu});

    const promiseData = observable.subscribe({
      next: succesCallBack,
      error: errorCallBack
    });

    await promiseData;
  }

  async getRolesToEndpoint(code: string, menuName: string,succesCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){
    const observable: Observable<any> = this.httpClientServices.post({
      controller : "AuthorizationEndpoints",
      action: "get-roles-to-endpoint"
    },{code: code,menu: menuName}
    );

    const promiseData = firstValueFrom(observable);
    promiseData.then(succesCallBack)
    .catch(errorCallBack);

    return (await promiseData).roles;
  }
}
