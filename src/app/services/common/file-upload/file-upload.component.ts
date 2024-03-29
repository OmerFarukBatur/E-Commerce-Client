import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { DialogService } from '../dialog.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  constructor(
    private httpClientServices: HttpClientService,
    private alertifyServices: AlertifyService,
    private customToastrServices: CustomToastrService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService
    ){}

  @Input() options: Partial<FileUploadOptions>;

  public files: NgxFileDropEntry[];

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    
    for ( const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) =>{
        fileData.append(_file.name,_file,file.relativePath);
      });      
    }

    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () =>{
        this.spinner.show(SpinnerType.BallAtom);
        this.httpClientServices.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({"responseType": "blob"})
         },fileData).subscribe(data =>{
    
          const message: string = "Dosyalar başarıyla yüklenmiştir.";
          
          this.spinner.hide(SpinnerType.BallAtom); 
          if (this.options.isAdminPage) {
            this.alertifyServices.message(message,{
              dismissOthers: true,
              messageType: MessageType.Success,
              position: Position.BottomRight
            })
          }else{
            this.customToastrServices.message(message,"Başarılı",{
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.BottomRight
            })
          }   
    
         },(errorResponse: HttpErrorResponse) =>{
    
          const message: string = "Dosyalar yüklenirken beklenmedik bir hata oluştu.";

          this.spinner.hide(SpinnerType.BallAtom);
          if (this.options.isAdminPage) {
            this.alertifyServices.message(message,{
              dismissOthers: true,
              messageType: MessageType.Error,
              position: Position.BottomRight
            })
          }else{
            this.customToastrServices.message(message,"Başarısız",{
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.BottomRight
            })
          }
    
         });

      }
    });

  }

  

  // openDialog(afterClosed: any): void {
  //   const dialogRef = this.dialog.open(FileUploadDialogComponent, {
  //     width: '250px',
  //     data: FileUploadDialogState.Yes,
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result == FileUploadDialogState.Yes) {
  //       afterClosed();
  //     }
  //   });
  // }
}

export class FileUploadOptions{
  controller?: string;
  action?: string;
  queryString: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}


