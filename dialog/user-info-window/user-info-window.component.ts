import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-info-window',
  templateUrl: './user-info-window.component.html',
  styleUrls: ['./user-info-window.component.scss']
})
export class UserInfoWindowComponent implements OnInit {
  viewMode:any = null;
  formData:any = {};
  hide:boolean = true;
  newPassword: any = null;
  isReset: boolean = false;
  userData:any = null;
  constructor(@Inject(MAT_DIALOG_DATA) public _data:any,
  public dialogRef: MatDialogRef<UserInfoWindowComponent>,
  public admin: AdminServiceService) { }

  ngOnInit(): void {
    this.newPassword = 'access!'+ formatDate(new Date(), 'yyyyMMdd', 'en');
    this.viewMode = this._data.mode;
    this.formData = this._data.userInfo;
  }
  resetPassword(){
    this.formData.password = this.newPassword;
    if(confirm('Do you Want to Proceed?')===true){
      this.isReset = true;
      this.admin.updateUser(this.formData.id, this.formData);
    }else{

    }
   //console.logg(this.formData);
  }
  updateUserInfo(){
    this.admin.getInfoByUserId(this.formData.id, this.formData.userType).subscribe((uRes:any)=>{
      this.userData = uRes[0];
      this.userData.lastName = this.formData.lastName;
      this.userData.firstName = this.formData.firstName;
      this.userData.middleName = this.formData.middleName;
      this.userData.mobile = this.formData.mobile;
      this.admin.updateInfoByUserId(this.userData?.id,this.userData,this.formData.userType);
      this.dialogRef.close(this.formData);
    })
  }

}
