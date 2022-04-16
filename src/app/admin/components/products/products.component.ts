import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpClient: HttpClientService) {
    super(spinner);
   }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);

    
    this.httpClient.get<Product[]>({
      controller: "Product"
    }).subscribe(data => console.log(data));
  
    /*
    this.httpClient.post({
      controller: "Product"
    },{
      name: "Kalem",
      stock: 100,
      price: 15
    }).subscribe();
    */
   /*
    this.httpClient.put({
      controller: "product"
    },{
      id: "b3bad39c-60e7-4c76-be49-a56170947688",
      name: "Renkli Kağıt",
      stock: 1500,
      price: 5.5
    }).subscribe();
    */
   /*
   this.httpClient.delete({
     controller: "product"
   },"b3bad39c-60e7-4c76-be49-a56170947688").subscribe();
   */
   /*
   this.httpClient.get({
     fullEndPoint: "https://jsonplaceholder.typicode.com/posts"
   }).subscribe(data => console.log(data));
   */
  }

}
