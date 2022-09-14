import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Order } from 'src/app/contracts/order/create_order';
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

}