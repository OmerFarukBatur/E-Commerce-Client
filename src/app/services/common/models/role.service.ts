import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClientServices: HttpClientService) { }

  async getRoles(page: number, size: number,succesCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){
    const observable: Observable<any> = this.httpClientServices.get({
      controller : "roles",
      action: "get-all-roles",
      queryString: `page:${ page}&size:${size}`
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(succesCallBack)
    .catch(errorCallBack);

    return await promiseData;
  }

  async create(name: string, succesCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){
    const observable: Observable<any> = this.httpClientServices.post({
      controller : "roles",
      action: "create-role"
    },{name: name});

    const promiseData = firstValueFrom(observable);
    promiseData.then(succesCallBack)
    .catch(errorCallBack);

    return await promiseData as {succeeded: boolean};
  }
}
