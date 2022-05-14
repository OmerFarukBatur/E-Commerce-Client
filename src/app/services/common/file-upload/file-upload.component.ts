import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
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
    private customToastrServices: CustomToastrService
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

     this.httpClientServices.post({
      controller: this.options.controller,
      action: this.options.action,
      queryString: this.options.queryString,
      headers: new HttpHeaders({"responseType": "blob"})
     },fileData).subscribe(data =>{

      const message: string = "Dosyalar başarıyla yüklenmiştir.";

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
}

export class FileUploadOptions{
  controller?: string;
  action?: string;
  queryString: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}
