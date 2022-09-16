import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

declare var $: any;

@Component({
  selector: 'app-basket-item-remove-dialog',
  templateUrl: './basket-item-remove-dialog.component.html',
  styleUrls: ['./basket-item-remove-dialog.component.scss']
})
export class BasketItemRemoveDialogComponent extends BaseDialog<BasketItemRemoveDialogComponent> implements OnDestroy {

  constructor(
    dialogRfe : MatDialogRef<BasketItemRemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BasketItemDeleteState
    ) 
  {
    super(dialogRfe);
   }
  ngOnDestroy(): void {
    $("#basketModel").modal("show");
  }

}

export enum BasketItemDeleteState{
  Yes,
  No
}
