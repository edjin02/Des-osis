import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-n-curriculum',
  templateUrl: './n-curriculum.component.html',
  styleUrls: ['./n-curriculum.component.scss']
})
export class NCurriculumComponent implements OnInit {
  curriculumId:any;
  curriculumData:any;
  isDisabled:boolean = true;
  newSubjectField:any;
  isUpdated:boolean = false;
  newCodeField:any;
  gradeLevels:any;
  subjectData:any;
  constructor(public adminService:AdminServiceService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.curriculumId = this.route.snapshot.paramMap.get('id');
    this.adminService.viewCurriculum(this.curriculumId).subscribe(res=>{
      this.curriculumData = res;
      this.subjectData = this.curriculumData?.curriculumSubjects;
    });
    this.adminService.getGradeLevelListing().subscribe((grades:any)=>{
      this.gradeLevels = grades;
    });
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
    this.subjectData.push(newInfo);
    this.newCodeField = null;
    this.newSubjectField = null;
  }
  checkUncheck(e:any, arrayIndex:any){
    let arrLength = this.gradeLevels.length
    for (let index = 0; index < arrLength; index++) {
      this.subjectData[arrayIndex].gradeLevels[index].isChecked = e;
    }
  }
  
  removeSubject(ind:any){
    this.subjectData.splice(ind,1);
  }
  saveCurriculum(){
    this.adminService.saveCurriculum(this.curriculumData,this.curriculumId).then((res:any)=>{
        console.log(res);
        this.isUpdated = true;
        this.isDisabled = true;
    });

  }

}
