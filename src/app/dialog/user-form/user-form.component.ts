import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import { formatDate } from '@angular/common';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { UserModuleFormComponent } from '../user-module-form/user-module-form.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  controlNumber:any;
  userType:any;
  lastName:any;
  firstName:any;
  middleName:any;
  password:any;
  email = new FormControl('', [Validators.required, Validators.email]);
  mobile:any;
  emailTaken: boolean = false;

  notValid:boolean = true;

  gradeLevelList:any = [];
  hide:boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _data:any,
    public dialogRef: MatDialogRef<UserFormComponent>,
    public dialog: MatDialog,
    public adminService: AdminServiceService) { }

  ngOnInit(): void {
    this.gradeLevelList = this._data.gradeLevel;
    this.password = formatDate(new Date(), 'yyyyMMdd', 'en');

  }
  saveUser(){
    let pl = {
      controlNumber:this.controlNumber,
      userType:this.userType,
      lastName:this.lastName,
      firstName:this.firstName,
      middleName:this.middleName,
      password: this.password,
      email:this.email.value,
      mobile:this.mobile,
      isNew:true,
      createdOn: new Date(),
      updatedOn: new Date(),
    };
    this.dialogRef.close(pl);
  }
  checkUserInfo(event:any){
    let pl = {
      controlNumber:this.controlNumber,
      userType:this.userType,
      lastName:this.lastName,
      firstName:this.firstName,
      middleName:this.middleName,
      password: this.password,
      email:this.email.value,
      mobile:this.mobile,
      isNew:true,
      createdOn: new Date(),
      updatedOn: new Date(),
    };
    if(event.value === 'Student'){
      this.dialog.open( UserModuleFormComponent, {
        width: '90%',
        height: '100%',
        disableClose: true,
        data: { viewData: pl ,isNew: true, fromUsers: true},
      });
      this.dialogRef.close(null);
    }
  }
  checkIfValid(){
    if(this.email.errors === null){
    this.adminService.getUserEmail(this.email.value).subscribe(e=>{
      if(e.length > 0){

      }else{
        this.notValid = false;
      }
    });
    }
  }

}
