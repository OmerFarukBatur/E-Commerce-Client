import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { Single_Order } from 'src/app/contracts/order/single_order';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { BaseDialog } from '../base/base-dialog';
import { CompleteOrderDialogComponent, CompleteOrderState } from '../complete-order-dialog/complete-order-dialog.component';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss']
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit {

  constructor(
    dialogRef: MatDialogRef<OrderDetailDialogComponent>,    
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string,
    private orderService: OrderService,
    private dialogService: DialogService,
    private spinner : NgxSpinnerService,
    private alertifyService : AlertifyService
  ) { 
    super(dialogRef);
  }

  singleOrder: Single_Order;

  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  totalPrice : number;


  async ngOnInit(): Promise<void> {
    this.singleOrder = await this.orderService.getOrderById(this.data as string);
    this.dataSource = this.singleOrder.basketItems;

    this.totalPrice = this.singleOrder.basketItems.map((basketItem,index)=> basketItem.price * basketItem.quantity).reduce((price,current)=> price+current);
  }

  completeOrder(){
    this.dialogService.openDialog({
      componentType: CompleteOrderDialogComponent,
      data: CompleteOrderState.Yes,
      afterClosed: async ()=>{
        this.spinner.show(SpinnerType.BallAtom);
        await this.orderService.completeOrder(this.data as string);
        this.spinner.hide(SpinnerType.BallAtom);
        this.alertifyService.message("İşlem Başarıyla Gerçekleştirildi.",{
          messageType: MessageType.Success,
          position: Position.BottomRight
        })
      }
    });
  }

}

export enum OrderDetailDialogState{
  Close,
  OrderComplete
}


