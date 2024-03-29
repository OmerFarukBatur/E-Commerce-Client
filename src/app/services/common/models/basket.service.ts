import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update_basket_item';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  constructor(private httpClientServices: HttpClientService) { }
  
  async get() : Promise<List_Basket_Item[]>{
    const observable : Observable<List_Basket_Item[]> = this.httpClientServices.get({
        controller: "baskets"
    });
    return await firstValueFrom(observable);
  }

  async add(basketItem : Create_Basket_Item): Promise<void> {
    const observable: Observable<any> = this.httpClientServices.post({
        controller: "baskets"
    },basketItem);
    return await firstValueFrom(observable);
  }

  async updateQuantity(basketItem: Update_Basket_Item): Promise<void> {
    const observable : Observable<any> = this.httpClientServices.put({
        controller: "baskets"
    },basketItem);
    await firstValueFrom(observable);
  }

  async remove(basketItemId : string) : Promise<void>{
    const observable : Observable<any> = this.httpClientServices.delete({
        controller: "baskets"
    },basketItemId);

    await firstValueFrom(observable);
  }
  
}