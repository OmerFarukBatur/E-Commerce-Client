import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { List_Order } from 'src/app/contracts/order/list_order';
import { Single_Order } from 'src/app/contracts/order/single_order';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private httpClientServices: HttpClientService) { }

  async create(order : Create_Order): Promise<void>{
    const observable : Observable<any> = this.httpClientServices.post({
        controller: "orders"
    },order);

    await firstValueFrom(observable);
  }

  async getAllOrders(page: number = 0,size: number = 5,successCallBack?: ()=> void,errorCallBack?: (errorMessage: string) => void): Promise<{totalOrderCount: number; orders: List_Order[]}>{
    const observable : Observable<{totalOrderCount: number; orders: List_Order[]}> = this.httpClientServices.get({
        controller: "orders",
        queryString : `page=${page}&size=${size}`
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
    .catch(error => errorCallBack(error))

    return await promiseData ;
  }

  async getOrderById(id: string,successCallBack?: ()=> void,errorCallBack?: (errorMessage: string) => void){
    const observable : Observable<Single_Order> = this.httpClientServices.get<Single_Order>({
      controller: "orders"
    },id);

    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
    .catch(error => errorCallBack(error));

    return await promiseData;
  }

  async completeOrder(id: string,successCallBack?: ()=> void,errorCallBack?: (errorMessage: string) => void){
    const observable : Observable<any> = this.httpClientServices.get({
      controller: "orders",
      action: "complete-order"      
    },id);

    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
      .catch(error => errorCallBack(error));

      return await promiseData;
  }

}