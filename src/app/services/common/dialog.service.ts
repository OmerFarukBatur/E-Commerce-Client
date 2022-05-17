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

  openDialog(dialogType: Partial<DialogParameters>): void {
    const dialogRef = this.dialog.open(dialogType.componentType, {
      width: dialogType.options?.width,
      height: dialogType.options?.height,
      position: dialogType.options?.position,
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
  options?: Partial<DialogOptions> = new DialogOptions();
}

export class DialogOptions{
  width?: string = "250px";
  height?: string;
  position?: DialogPosition;
}
