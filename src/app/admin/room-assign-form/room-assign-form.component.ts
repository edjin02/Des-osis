import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdviserDialogComponent } from 'src/app/dialog/adviser-dialog/adviser-dialog.component';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { SubjectAdviserDialogComponent } from 'src/app/dialog/subject-adviser-dialog/subject-adviser-dialog.component';
import { SubjectStudentDialogComponent } from 'src/app/dialog/subject-student-dialog/subject-student-dialog.component';
import { SuccessDialogComponent } from 'src/app/dialog/success-dialog/success-dialog.component';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-room-assign-form',
  templateUrl: './room-assign-form.component.html',
  styleUrls: ['./room-assign-form.component.scss']
})
export class RoomAssignFormComponent implements OnInit {
  gradeLevelId:any= null;
  gradeLevelName:any = null;
  subjectList:any = null;
  subjectTeacher:any = [];
  schoolYearId:any = null;

  teacherInfo:any = null;
  teacherList:any = null;
  teacherSubjList:any = [];

  adviserName:any = null;
  adviserId:any = null;

  adviserList:any = [];
  sectionName:any = null;
  advisedStudent:any = [];

  subjectStudentList: any = [];
  addedStudentList: any = [];

  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    public adminService: AdminServiceService
    ) { }

  ngOnInit(): void {
    this.gradeLevelId = this.route.snapshot.paramMap.get('id');
    this.gradeLevelName = this.route.snapshot.paramMap.get('name');
    this.schoolYearId = this.route.snapshot.paramMap.get('yearId');
    /* GET SUBJECT BY GRADE */
    this.adminService.getSubjectByGradeId(this.gradeLevelId).subscribe(e=>{
      this.subjectList = e;
      /* GET Assigned Student */
      this.adminService.getAssignedStudent(this.schoolYearId).subscribe(res=>{
        this.advisedStudent = res;
      });
      /* GET STUDENT LIST FOR GRADE */
      this.adminService.getStudentByGradeLevel(this.gradeLevelId).subscribe(studentSubj=>{
       //console.logg(studentSubj);
        this.subjectStudentList = studentSubj;
      });
    });

    this.adminService.getTeacherListing().subscribe(teachList=>{
      teachList.map((e:any)=>{
        e.info?.subjectAssign?.map((em:any)=>{
          if(em.id === this.gradeLevelId){
            this.adviserList.push({...em, firstName: e.firstName, lastName: e.lastName,middleName: e.middleName});
          }
        });
      });
      this.adminService.getTeacherSubjListing().subscribe(tsb=>{
       //console.logg(tsb,'check');
        tsb.map((subj:any) =>{
          subj.subjects.map((tsubj: any)=>{
            if(tsubj.gradeLevelId === this.gradeLevelId){
              this.teacherSubjList.push(tsubj);
            }
          })
        })
      });
    });
    /* GET TEACHER SUBJS */
  }
  adviserDialog(){
    let adList = Object.values(
      this.adviserList.reduce( (c:any, e:any) => {
      if (!c[e.teacherId]) c[e.teacherId] = e;
      return c;
      }, {})
     );
    const dialogRef = this.dialog.open(AdviserDialogComponent, {
      width: '50%',
      disableClose: true,
      data: {adviser: adList},
    });
    dialogRef.afterClosed().subscribe((pl) => {
      if (pl !== null) {
        this.validateGradeLevel(pl);
        this.adviserName = pl.lastName + ', ' + pl.firstName;
        this.adviserId = pl.teacherId;
      }
    });
  }
  validateGradeLevel(data:any){
    let gradeInfo = new Array('I','II','III');
    if(gradeInfo.indexOf(this.gradeLevelName) != -1){
      this.assignAllSubjAdviser(data);
    }

  }
  subjAdviserDialog(index:any,SubjId:any){
   //console.logg(this.subjectList[index]);
    let subjectAds = Object.values(
      this.teacherSubjList.reduce( (c:any, e:any) => {
      if (!c[e.teacherId]) c[e.teacherId] = e;
      return c;
      }, {})
     );
    const dialogRef = this.dialog.open(SubjectAdviserDialogComponent, {
      width: '50%',
      disableClose: true,
      data: {adviser: subjectAds},
    });
    dialogRef.afterClosed().subscribe((pl) => {
      if (pl !== null) {
        if(subjectAds.length === 1){
          this.assignAllSubj(pl);
        }else{
          this.subjectList[index].teacherFullName = pl.teacherInfo?.lastName + ', '+ pl.teacherInfo?.firstName;
          this.subjectList[index].teacherId = pl.teacherId;
        }
      }
    });
  }
  assignAllSubjAdviser(info:any){
    this.subjectList.map((sl:any)=>{
      sl.teacherFullName = info.lastName + ', '+ info.firstName;
      sl.teacherId = info.teacherId;
    });
  }
  assignAllSubj(info:any){
    this.subjectList.map((sl:any)=>{
      sl.teacherFullName = info.teacherInfo?.lastName + ', '+ info.teacherInfo?.firstName;
      sl.teacherId = info.teacherId;
    });
  }
  checkAdvisedStudent(){
    let filterStudent = this.subjectStudentList.filter((e:any)=>{
        let im = this.advisedStudent.find((ad:any)=>{
          return e.id === ad.studentId
        });
        //console.log(im);
        if(im){
          if(im.studentId !== e.id){
            return e;
          }
        }else{
          return e;
        }
    });
    this.subjectStudentList = filterStudent;
    return filterStudent;
  }
  studentSubjDialog(){
    const dialogRef = this.dialog.open(SubjectStudentDialogComponent, {
      width: '50%',
      disableClose: true,
      data: {
        studentList: this.checkAdvisedStudent(),
        addedStudent: null,
        advised: this.advisedStudent
      },
    });
    dialogRef.afterClosed().subscribe((pl) => {
      if (pl !== null) {
        this.subjectStudentList = pl;
        this.addfilteredData(pl);
      }
    });
  }
  addfilteredData(payload:any){
    this.addedStudentList = payload.filter((res:any) => { if(res.isSelected === true) return res});
   //console.logg(this.addedStudentList);
  }
  saveClass() {
   //console.logg(this.addedStudentList)
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      disableClose: true,
      data: {},
    });
    dialogRef.afterClosed().subscribe((pl) => {
      if (pl === true) {
        this.saveConfirm();
      }
    });
  }
  async saveConfirm(){
    const nId =  'id' + (new Date()).getTime();
    let payload = {
      id: nId,
      gradeLevelId: this.gradeLevelId,
      gradeLevelName: this.gradeLevelName,
      schoolYearId: this.schoolYearId,
      section: this.sectionName,
      adviserId: this.adviserId,
      adviserName: this.adviserName,
      subjects: this.subjectList,
      students: this.addedStudentList
    }
    /* Save Header */
    this.adminService.createClass(nId,payload);
    /* Save Individual Data For Teacher*/
    try{
      let promiseTeacher = [];
      for(let index = 0; index < this.subjectList.length; index++) {
        const subjectInfo = this.subjectList[index];
        promiseTeacher.push(this.adminService.addTeacherClass({
          ...subjectInfo,
          section:this.sectionName,
          schoolYearId:this.schoolYearId,
          classId:nId,
        }));
      }
      Promise.allSettled(promiseTeacher).then((result) => {
          //console.log(result);
        })
        .catch((error) => {
          //console.log(error);
        })
        .finally(() => {
          /* Update Student Info */
          this.assignAllStudent(nId)

        });

    }catch(error){
     //console.logg('failed',error);
    }

  }
  assignAllStudent(newId:any){
   //console.logg(newId);
    try{
      let promiseStudent:any = [];

      this.addedStudentList.map((stud:any)=>{
        promiseStudent.push(this.adminService.assignedStudentClass({
          studentId: stud.id,
          schoolYearId: this.schoolYearId,
          classId:newId,
          gradeLevelId: this.gradeLevelId
        }));
      });
     //console.logg(promiseStudent,'promise');
      Promise.allSettled(promiseStudent).then((result) => {//console.logg(result,'students')}).finally(() =>{
        const dialogRef = this.dialog.open(SuccessDialogComponent, {
          width: '300px',
          disableClose: true,
          data: {},
        });
        dialogRef.afterClosed().subscribe((pl) => {
          this.router.navigate(['/admin/room-assign'])
        });
      });
    }catch(error){
     //console.logg(error);
    }
  }
}
