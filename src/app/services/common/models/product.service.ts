import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Product } from 'src/app/contracts/create_product';
import { List_Product } from 'src/app/contracts/list_product';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientServices: HttpClientService) { }

  create(product:Create_Product, succesCallBack?: () => void, errorCallBack?: (errorMessage: string) => void){
    this.httpClientServices.post({
      controller: "product"
    },product).subscribe(result =>{
      succesCallBack();
    }, (errorResponse: HttpErrorResponse) => {
      const _error: Array<{ key: string, value: Array<string>}> = errorResponse.error;
      let message = "";
      _error.forEach((v, index) => {
        v.value.forEach((_v, _index) => {
          message += `${_v}<br>`;
        });
      });
      errorCallBack(message);
    });
  }

 async read(page: number = 0,size: number = 5,successCallBack?: ()=> void,errorCallBack?: (errorMessage: string) => void) : Promise<{totalCount: number; products: List_Product[]}>{
  const promiseData : Promise<{totalCount: number; products: List_Product[]}> =  this.httpClientServices.get<{totalCount: number; products: List_Product[]}>({
      controller: "product",
      queryString : `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message) );

      return await promiseData;
  }

  async delete(id: string){
    const deleteObservable: Observable<any> = this.httpClientServices.delete<any>({
      controller: "product"
    },id);

    await firstValueFrom(deleteObservable);
  }

  async readImages(id: string, successCallBack?: ()=> void): Promise<List_Product_Image[]>{
    const getObservable: Observable<List_Product_Image[]> = this.httpClientServices.get<List_Product_Image[]>({
      action: "getproductimages",
      controller: "product"
    }, id);

    const images: List_Product_Image[] = await firstValueFrom(getObservable);
    successCallBack();
    return images
  }

  async deleteImage(id: string, imageId: string, successCallBack?: () => void) {
    const deleteObservable = this.httpClientServices.delete({
      action: "deleteproductimage",
      controller: "product",
      queryString: `imageId=${imageId}`
    }, id)
    await firstValueFrom(deleteObservable);
    successCallBack();
  }

  async changeShowCaseImage(imageId:string, productId:string, succesCallBack? : () => void): Promise<void> {

    const changeShowCaseImageObservable = this.httpClientServices.put({
      controller: "product",
      action: "ChangeShowCaseImage",
      queryString : `imageId=${imageId}&productId=${productId}`
    },{});
    await firstValueFrom(changeShowCaseImageObservable);
    succesCallBack();
  }

  async updateStokQRCodeToProduct(productId:string, stock:number, succesCallBack? : () => void): Promise<void>{
    const observable = this.httpClientServices.put({
      controller: "product",
      action: "qrcode"
    },{productId,stock});
    await firstValueFrom(observable);
    succesCallBack();
  }
}
