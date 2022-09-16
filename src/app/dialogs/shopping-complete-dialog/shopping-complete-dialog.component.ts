import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

declare var $: any;

@Component({
  selector: 'app-shopping-complete-dialog',
  templateUrl: './shopping-complete-dialog.component.html',
  styleUrls: ['./shopping-complete-dialog.component.scss']
})
export class ShoppingCompleteDialogComponent extends BaseDialog<ShoppingCompleteDialogComponent> implements OnDestroy {

  constructor(
    dialogRfe : MatDialogRef<ShoppingCompleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShoppingCompleteState
  ) {
    super(dialogRfe);
  }

  show: boolean = false;
  complete(){
    this.show = true;
  }

  ngOnDestroy(): void {
    if (!this.show) {
      $("#basketModel").modal("show");
    }    
  }

}

export enum ShoppingCompleteState{
  Yes,
  No
}
