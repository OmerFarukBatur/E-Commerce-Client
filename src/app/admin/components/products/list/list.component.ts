import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit{

  constructor(
    private productService: ProductService, 
    spinner: NgxSpinnerService, 
    private alertifyService: AlertifyService,
    private dialogServices: DialogService
    ) {
    super(spinner);
   }
  

  displayedColumns: string[] = ['name', 'stock', 'price','createdDate','updatedDate','photo','edit','delete'];
  dataSource : MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

   async getProducts(){
    this.showSpinner(SpinnerType.BallScaleMultiple);
    const allProducts : {totalCount: number; products: List_Product[]} = await  this.productService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,() => this.hideSpinner(SpinnerType.BallAtom), errorMessage => this.alertifyService.message(errorMessage,{
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.BottomRight
    }));

    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length = allProducts.totalCount;
   }

  //  delete(id,event){
  //    const img: HTMLImageElement = event.srcElement;
  //    $(img.parentElement.parentElement).fadeOut(2000);
  //  }

  addProductImages(id: string){
    this.dialogServices.openDialog({
      componentType: SelectProductImageDialogComponent,
      data: id,
      options: {
        width: "600px"
      }
    });
  }
   async pageChange(){
     await this.getProducts();
   }

  async ngOnInit() {
   await this.getProducts();
  }

}
