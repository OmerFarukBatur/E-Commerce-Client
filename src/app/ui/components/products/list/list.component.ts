import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseURL } from 'src/app/contracts/base_url';
import { List_Product } from 'src/app/contracts/list_product';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private productService : ProductService, private activatedRoute : ActivatedRoute, private fileService : FileService) { }

  currentPageNo : number;
  totalProductCount : number;
  totalPageCount : number;
  pageSize : number = 9;
  pageList : number[] = [];
  baseUrl : BaseURL;

  products : List_Product[];

  async ngOnInit() {

    this.baseUrl = await this.fileService.getBaseStorageUrl();

    this.activatedRoute.params.subscribe(async params => {

      this.currentPageNo = parseInt(params["pageNo"] ?? 1);

      const data : {totalCount: number, products : List_Product[]} = await this.productService.read(this.currentPageNo - 1,this.pageSize,()=>{

      },
      errorMessage => {
  
      }
      )
      this.products = data.products;

      this.products = this.products.map<List_Product>( p => {
        const listProduct : List_Product = {
          name : p.id,
          id : p.id,
          price : p.price,
          stock : p.stock,
          createdDate : p.createdDate,
          updatedDate : p.updatedDate,
          imagePath : p.productImageFiles.length ? p.productImageFiles?.find(p => p.showCase).path : ""  ,
          productImageFiles : p.productImageFiles
        } ;
        return listProduct;
      })

      this.totalProductCount = data.totalCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);

      this.pageList = [];

      if (this.currentPageNo -3 <= 0) {
        for (let i = 1; i <= 7; i++) {
          if (i>0) {
            this.pageList.push(i);
         }
          
        }        
      }
      else if (this.currentPageNo + 3 >= this.totalPageCount) {
        for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++) {
          if (i>0) {
            this.pageList.push(i);
         }
          
        }
      }
      else{
        for (let i = this.totalPageCount - 3; i <= this.currentPageNo + 3; i++) {
          if (i>0) {
             this.pageList.push(i);
          }        
          
        }
      }

    }
    );

   } 

}
