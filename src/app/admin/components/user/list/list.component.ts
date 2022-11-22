import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_User } from 'src/app/contracts/users/list_user';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(
    spinner: NgxSpinnerService, 
    private alertifyService: AlertifyService,
    private userService: UserService
    ) {
    super(spinner);
   }
  

  displayedColumns: string[] = ['userName', 'nameSurname', 'email','twoFactorEnabled','delete'];
  dataSource : MatTableDataSource<List_User> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

   async getAllUsers(){
    this.showSpinner(SpinnerType.BallScaleMultiple);
    const allUsers : {totalUsersCount: number; users: List_User[]} =
       await  this.userService.getAllUsers(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,
          () => this.hideSpinner(SpinnerType.BallAtom), errorMessage => this.alertifyService.message(errorMessage,{
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.BottomRight
    }));

    this.dataSource = new MatTableDataSource<List_User>(allUsers.users);
    this.paginator.length = allUsers.totalUsersCount;
   }

   async pageChange(){
     await this.getAllUsers();
   }

  async ngOnInit() {
   await this.getAllUsers();
  }
}
