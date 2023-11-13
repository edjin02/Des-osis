import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-user-module-form',
  templateUrl: './user-module-form.component.html',
  styleUrls: ['./user-module-form.component.scss']
})
export class UserModuleFormComponent implements OnInit {
  sameAddress: boolean = false;
  info: any = {
    password: null,
    dob: null,
    gender: null,
    birthPlace: null,
    extendName: null,
    currentAddress: {
      houseNo: null,
      street:null,
      barangay: null,
      city: null,
      province: null,
      country:null,
      postal:null,
    },
    permanentAddress: {
      houseNo: null,
      street:null,
      barangay: null,
      city: null,
      province: null,
      country:null,
      postal:null,
    },
    guardianInfo: {
      lastName: null,
      firstName: null,
      contactInfo: null,
    },
    motherInfo: {
      lastName: null,
      firstName: null,
      contactInfo: null,
    },
    fatherInfo: {
      lastName: null,
      firstName: null,
      contactInfo: null,
    },
    motherTongue: null,
    isIndigenous: false,
    ifIndigenous: null,
    isFourPs:false,
    ifFourPs:null,
  }
  gradeLevels: any = null;
  guardianAccount: any ={
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    mobile:null,
    userType: 'Guardian'
  }
  notValid:boolean = true;
  isNew:boolean = false;
  fromUser:boolean = false;
  userInfo: any = {};
  isSaved: boolean = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  hide:boolean = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public _data:any,
    public adminService: AdminServiceService,
    public dialogRef: MatDialogRef<UserModuleFormComponent>,) { }

  ngOnInit(): void {
    this.userInfo = Object.assign({},this.info, this._data?.viewData);
    this.isNew = this._data?.isNew;
    this.fromUser = this._data?.fromUsers;
    this.email.setValue(this.userInfo?.email);
    this.adminService.getGradeLevelListing().subscribe((grades:any)=>{
      this.gradeLevels = grades;
    });
    if(this.isNew !== true){
      this.notValid = false;
    }
  }
  checkIfValid(){
    if(this.email.errors === null){
    this.adminService.getUserEmail(this.email.value).subscribe(e=>{
      if(e.length > 0){
        if(this.isNew || this._data?.viewData.email !== e[0].email){
          this.notValid = true;
        }
      }else{
        this.notValid = false;
      }
    });
    }
  }
  same(){
    if(this.sameAddress){
      this.userInfo.permanentAddress.houseNo = this.userInfo.currentAddress.houseNo;
      this.userInfo.permanentAddress.street= this.userInfo.currentAddress.street;
      this.userInfo.permanentAddress.barangay= this.userInfo.currentAddress.barangay;
      this.userInfo.permanentAddress.city= this.userInfo.currentAddress.city;
      this.userInfo.permanentAddress.province= this.userInfo.currentAddress.province;
      this.userInfo.permanentAddress.country= this.userInfo.currentAddress.country;
      this.userInfo.permanentAddress.postal= this.userInfo.currentAddress.postal;
    }else{
      this.userInfo.permanentAddress.houseNo = null;
      this.userInfo.permanentAddress.street= null;
      this.userInfo.permanentAddress.barangay= null;
      this.userInfo.permanentAddress.city= null;
      this.userInfo.permanentAddress.province= null;
      this.userInfo.permanentAddress.country= null;
      this.userInfo.permanentAddress.postal= null;
    }
  }
  async saveInfo(){
    /* IF NEW */
    let gradeInfo = this.gradeLevels.filter((gRes:any)=>{
      if(gRes.id === this.userInfo.gradeLevelId){
        return gRes;
      }
    })
    this.userInfo.gradeLevelName = gradeInfo[0].gradeLevelName;
    let newInfo = this.userInfo;
    newInfo.email = this.email.value;
    if(this.isNew){
      this.adminService.addUser(newInfo).then((res) => {
        newInfo.userId = res.id;
        this.adminService.addStudent(newInfo).then((st) => {
          this.dialogRef.close(null);
        });
      });
    }else{
      if(this.fromUser){
        /* Save on Users */
        let userId = newInfo.id;
        await this.adminService.updateUser(userId, newInfo).then(res=>{});
        /* Get Student Collection by User Id */
        this.adminService.getStudentInfoByUserId(userId).subscribe(async (sRes:any)=>{
          let studentId = sRes[0].id;
          newInfo.userId = userId;
          newInfo.id = studentId;
          await this.adminService.updateInfoByUserId(newInfo.id,newInfo,newInfo.userType);
          this.isSaved = true;
          console.log('update from user',newInfo);
          let alertM = location.reload();
          const myTimeout = setTimeout(()=>{
            location.reload();
          }, 1000);
        });

      }else{
        let savedInfo = newInfo;
        await this.adminService.updateInfoByUserId(newInfo.id,newInfo,newInfo.userType).then(async (res:any)=>{
          savedInfo.id = newInfo.userId;
          delete savedInfo.userId;
         console.log(savedInfo, 'udpate from student');
          await this.adminService.updateUser(savedInfo.id, savedInfo).then(res=>{});
          this.isSaved = true;
          const myTimeout = setTimeout(()=>{
            location.reload();
          }, 1000);
        });
      }
    }
    /* ELSE */
  }
  checkUser(){
   //console.logg(this.userInfo);
  }

}
