import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-enroll-form',
  templateUrl: './enroll-form.component.html',
  styleUrls: ['./enroll-form.component.scss']
})
export class EnrollFormComponent implements OnInit {
  sameAddress: boolean = false;
  container:any = 1;
  studentType:any = 0;
  userInfo: any = {
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
    studentType:0,
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
  userSearch:any = null;
  searchResult:any = null;
  notValid:boolean = true;
  isNew:boolean = false;
  fromUser:boolean = false;
  //userInfo: any = {};
  isSaved: boolean = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  hide:boolean = true;
  enrollActive:boolean = true;

  constructor(
    public adminService: AdminServiceService) { }

  ngOnInit(): void {
    this.email.setValue(this.userInfo?.email);
    this.adminService.getGradeLevelListing().subscribe((grades:any)=>{
      this.gradeLevels = grades;
    });
    this.adminService.getEnrollmentStatus().subscribe((e:any)=>{
      console.log(e);
      this.enrollActive = e[0]?.active;
    })
    if(this.isNew !== true){
      this.notValid = false;
    }
  }
  nextContainer(){
    this.container++;
  }
  prevContainer(){
    this.container--;
    console.log(this.container);
  }
  getEnrollmentType(){
    if(this.studentType===1){
      this.container = 2
    }
    if(this.studentType===2){
      this.container = 1;
    }
  }
  async getUserInfo(){
    let hasComma = this.userSearch.includes(',');
    if(hasComma){
      let nameSearch = this.userSearch.split(',');
      let firstName = nameSearch[0];
      let lastName = nameSearch[1].trimStart();
      this.adminService.getStudentInfoByFullName(lastName,firstName).subscribe((res:any)=>{
        if(res){
          this.userInfo = res[0];
          console.log(this.userInfo);
          this.email.setValue(this.userInfo?.email);
          this.container = 2;
        }
      });
    }else{
      this.adminService.getStudentInfoByLrn(this.userSearch).subscribe((res:any)=>{
        if(res){
          this.userInfo = res[0];
          this.email.setValue(this.userInfo?.email);
          this.container = 2;
        }
      });
    }
  }
  checkIfValid(){
    if(this.email.errors === null){
    this.adminService.getUserEmail(this.email.value).subscribe(e=>{
      if(e.length > 0){
          this.notValid = true;
      }else{
        this.notValid = false;
      }
    });
    }
  }
  getStudentInfo(){

  }
  saveInfo(){

  }
  async saveInfo2(){
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

}
