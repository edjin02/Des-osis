import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';

@Component({
  selector: 'app-teacher-class-info',
  templateUrl: './teacher-class-info.component.html',
  styleUrls: ['./teacher-class-info.component.scss']
})
export class TeacherClassInfoComponent implements OnInit {
  teacherInfo:any = null;
  teacherClassList:any = [];
  tableSource:any = null;
  displayedColumns: string[] = ['gradeLevel','section','action'];
  constructor(public teacher:TeacherServiceService,public auth:AuthServiceService) { }

  ngOnInit(): void {
    this.teacherInfo = this.auth.currentSession;
   //console.logg(this.teacherInfo);
    this.teacher.getTeacherInfo(this.teacherInfo?.id).subscribe((e:any)=>{
      let teacherId = e[0];
      this.getSubjectClass(teacherId.userId);
    })
  }
  async getSubjectClass(info:any){
    await this.teacher.getSubjectList(info).subscribe(res=>{
     //console.logg(res);
      this.tableSource = new MatTableDataSource(res);
    })
  }
}
