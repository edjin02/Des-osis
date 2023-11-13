import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-admin-curriculum',
  templateUrl: './admin-curriculum.component.html',
  styleUrls: ['./admin-curriculum.component.scss']
})
export class AdminCurriculumComponent implements OnInit {

  gradeLevel:any = null;
  gradeLevels:any = null;
  schoolYear:any = null;
  schoolYears:any = null;
  schoolFrom:any = [];
  schoolTo:any = [];
  selectedFrom: any = null;
  selectedTo:any = null;
  subjects:any = null;
  curriculumTemplate:any = [];
  curriculumCode:any = null;
  newSubjectField:any = null;
  newCodeField:any = null;
  nSubjectListing:any = [];
  nSubGrade:any = [];
  isGenerated:boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AdminCurriculumComponent>,
    public adminService: AdminServiceService,
    @Inject(MAT_DIALOG_DATA) public _data: any) { }

  ngOnInit(): void {
    this.getYear();
    this.adminService.getGradeLevelListing().subscribe((grades:any)=>{
      this.gradeLevels = grades;
    });
    this.adminService.nSubjectListing().subscribe(res=>{
      this.nSubjectListing = [];
      res.map((sbj:any)=>{
        this.nSubjectListing.push({
          ...sbj,
          gradeLevels: this.gradeLevels.map((e:any)=>{ return {...e,isChecked:true }}),
          isChecked:true,
        });
      });
      console.log(this.nSubjectListing);
    });
    this.adminService.getSyListing().subscribe((sy:any)=>{
      this.schoolYears = sy;
    });
  }
  checkUncheck(e:any, arrayIndex:any){
    console.log();
    let arrLength = this.nSubjectListing[arrayIndex].gradeLevels.length
    for (let index = 0; index < arrLength; index++) {
      this.nSubjectListing[arrayIndex].gradeLevels[index].isChecked = e;
    }
  }
  removeSubject(ind:any){
    this.nSubjectListing.splice(ind,1);
  }
  getYear(){
    let baseDate = new Date().getFullYear();
    //5year cycle;
    for (let index = 0; index < 5; index++) {
      this.schoolFrom.push(baseDate);
      baseDate++;
    }
  }
  addtoYear(){
    let endDate = this.selectedFrom + 1;
    this.schoolTo = ['Present'];
    for (let index = 0; index < 5; index++) {
      this.schoolTo.push(endDate);
      endDate++;
    }
  }

  addSubj(){
    let newId = this.adminService.generateId();
    let newInfo = {
      id : newId,
      subjectCode : this.newCodeField,
      subjectName: this.newSubjectField,
      isChecked:true,
      gradeLevels: this.gradeLevels.map((e:any)=>{ return {...e,isChecked:true }}),
    }
    this.nSubjectListing.push(newInfo);
    this.newCodeField = null;
    this.newSubjectField = null;
  }
  removeSub(ind:any,sInd:any){
    console.log(this.curriculumTemplate[ind].subList[sInd]);
    this.curriculumTemplate[ind].subList.splice(sInd,1);
  }

  getSubjects(){
    this.isGenerated = true;
    // let curriculumPromise = [];
    
    // for(let index = 0; index < this.gradeLevels.length; index++) {
    //   curriculumPromise.push(
    //     this.adminService.getSubjectByGradeId(this.gradeLevels[index].id).subscribe((gList:any)=>{
    //       this.curriculumTemplate.push({...this.gradeLevels[index], subList: gList});
    //     })
    //   );
    // }
    // Promise.allSettled(curriculumPromise).then((result) => {
    //   //console.log(result);
    // })
    // .catch((error) => {
    //   //console.log(error);
    // })
    // .finally(() => {
    //   /* Update Student Info */
    //   console.log(this.curriculumTemplate);
    // });
  }
  saveCurriculum(){
    let newId = this.adminService.generateId();
    let payload = {
      id: newId,
      curriculumCode:this.curriculumCode,
      curriculumYear: this.selectedFrom + ' - ' + this.selectedTo,
      curriculumSubjects: this.nSubjectListing,
      createdOn: new Date(),
      isActive: false,
    }
    this.adminService.saveCurriculum(payload,newId).then((res:any)=>{
        this.dialogRef.close(null);
        console.log(res);
    });

  }

}
