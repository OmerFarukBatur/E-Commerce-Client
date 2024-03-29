import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_User } from 'src/app/contracts/users/create_user';
import { List_User } from 'src/app/contracts/users/list_user';
import { User } from 'src/app/entities/user';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService { 
  constructor(
    private httpClientServices: HttpClientService
  ) { }

  async create(user: User): Promise<Create_User>{
    const observable: Observable<Create_User | User> = this.httpClientServices.post<Create_User | User>({
      controller:"users"
    },user);

    return await firstValueFrom(observable) as Create_User;
  }

  async updatePassword(userId: string, resetToken: string, password: string, passwordConfirm: string, successCallBack?: ()=> void, errorCallBack?: (error)=> void){
    const observable: Observable<any> = this.httpClientServices.post({
      controller:"users",
      action: "update-password"
    },{
      userId: userId,
      resetToken: resetToken,
      password: password,
      passwordConfirm: passwordConfirm
    });

    const promiseData : Promise<any> = firstValueFrom(observable);
    promiseData.then(value => successCallBack()).catch(error => errorCallBack(error));
    await promiseData;
  }

  async getAllUsers(page: number = 0,size: number = 5,successCallBack?: ()=> void,errorCallBack?: (errorMessage: string) => void): Promise<{totalUsersCount: number; users: List_User[]}>{
    const observable : Observable<{totalUsersCount: number; users: List_User[]}> = this.httpClientServices.get({
        controller: "users",
        queryString : `page=${page}&size=${size}`
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
    .catch(error => errorCallBack(error))

    return await promiseData ;
  }

  async assignRoleToUser(id:string, roles: string[], successCallBack?: ()=> void, errorCallBack?: (errorMessage: string) => void){
    const observable : Observable<any> =this.httpClientServices.post({
        controller: "users",
        action: "assign-role-to-user"
      },{
        userId: id,
        roles: roles
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
    .catch(error => errorCallBack(error))

    await promiseData ;
  }

  async getRolesToUser(userId: string, successCallBack?: ()=> void, errorCallBack?: (errorMessage: string) => void): Promise<string[]>{
    const observable : Observable<{userRoles:string[]}> = this.httpClientServices.get({
      controller: "users",
      action: "get-roles-to-user"
  },userId);

  const promiseData = firstValueFrom(observable);
  promiseData.then(value => successCallBack())
  .catch(error => errorCallBack(error))

  return (await promiseData).userRoles ;
  }
}
