import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentViewGradeComponent } from 'src/app/dialog/student-view-grade/student-view-grade.component';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { StudentServiceService } from 'src/app/services/student-service.service';

@Component({
  selector: 'app-student-class-info',
  templateUrl: './student-class-info.component.html',
  styleUrls: ['./student-class-info.component.scss']
})
export class StudentClassInfoComponent implements OnInit {
  activeYear: any = null;
  activeSession:any = null;
  classInfoDetails:any = null;
  studentInfo:any = null;

  constructor(
    public dialog: MatDialog,
    public student:StudentServiceService,
    public auth:AuthServiceService) {

  }

  ngOnInit(): void {
    this.getClassInfo();
  }
  viewDialog(data:any){
    let subjectId = data.id;
    let studentId = this.studentInfo.id;
    let classId = this.classInfoDetails.id;
    this.student.getStudentGrades(classId,subjectId,studentId).subscribe((vRes:any)=>{

      if(vRes.length!==0 ){
      const dialogRef = this.dialog.open(StudentViewGradeComponent, {
        width: '500px',
        data: {gradesInfo: vRes[0], subjectInfo:data},
        });
        dialogRef.afterClosed().subscribe(result => {
         //console.logg(result);
        });
      }else{
        alert('Grades not Available')
      }
    });
  }
  getClassInfo(){
    let yearInfo:any = localStorage.getItem('activeYear');
    this.activeYear = JSON.parse(yearInfo);
    this.activeSession = this.auth.currentSession;
    this.student.getStudentInfo(this.activeSession.id).subscribe((stRes:any)=>{
      this.studentInfo = stRes[0];
      this.student.getMyClass(this.activeYear.id, this.studentInfo.id).subscribe((inRes:any)=>{
        let classDetails = inRes[0];
        this.student.getClassDetails(classDetails.classId).subscribe((cRes:any) => {
          this.classInfoDetails = cRes;
         //console.logg(cRes);
        })
      });
    });
  }


}
