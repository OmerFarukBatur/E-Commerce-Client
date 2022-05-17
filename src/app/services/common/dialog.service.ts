import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  openDialog(dialogType: DialogParameters): void {
    const dialogRef = this.dialog.open(dialogType.componentType, {
      width: dialogType.options.width,
      height: dialogType.options.height,
      position
      data: dialogType.data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == dialogType.data) {
       dialogType.afterClosed();
      }
    });
  }

}

export class DialogParameters{
  componentType: ComponentType<any>;
  data: any;
  afterClosed: () => void;
  options: DialogOptions;
}

export class DialogOptions{
  width: number;
  height: number;
  position: DialogPosition;
}
