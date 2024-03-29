import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Order } from 'src/app/contracts/order/list_order';
import { OrderDetailDialogComponent, OrderDetailDialogState } from 'src/app/dialogs/order-detail-dialog/order-detail-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderService } from 'src/app/services/common/models/order.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(
    private orderService: OrderService, 
    spinner: NgxSpinnerService, 
    private alertifyService: AlertifyService,
    private dialogService: DialogService
    ) {
    super(spinner);
   }
  

  displayedColumns: string[] = ['orderCode', 'userName', 'totalPrice','createdDate','viewDetail','completed','delete'];
  dataSource : MatTableDataSource<List_Order> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

   async getAllOrders(){
    this.showSpinner(SpinnerType.BallScaleMultiple);
    const allOrders : {totalOrderCount: number; orders: List_Order[]} =
       await  this.orderService.getAllOrders(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,
          () => this.hideSpinner(SpinnerType.BallAtom), (errorMessage: any) => this.alertifyService.message(errorMessage.message,{
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.BottomRight
    }));

    this.dataSource = new MatTableDataSource<List_Order>(allOrders.orders);
    this.paginator.length = allOrders.totalOrderCount;
   }

   async pageChange(){
     await this.getAllOrders();
   }

  async ngOnInit() {
   await this.getAllOrders();
  }

  showDetail(id: string){
    this.dialogService.openDialog({
      componentType: OrderDetailDialogComponent,
      data: id,
      options:{
        width: "750px"
      }
    })
  }

}
