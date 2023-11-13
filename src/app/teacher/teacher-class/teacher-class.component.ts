import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-teacher-class',
  templateUrl: './teacher-class.component.html',
  styleUrls: ['./teacher-class.component.scss']
})
export class TeacherClassComponent implements OnInit {
  teacherInfo:any = null;
  teacherClassList:any = [];
  tableSource:any = null;
  displayedColumns: string[] = ['gradeLevel','section','students','action'];
  constructor(public teacher:TeacherServiceService,public auth:AuthServiceService) { }

  ngOnInit(): void {
    this.teacherInfo = this.auth.currentSession;
   //console.logg(this.teacherInfo);
    this.teacher.getTeacherInfo(this.teacherInfo?.id).subscribe((e:any)=>{
      let teacherId = e[0];
      this.getClass(teacherId.id);
    })
  }
  getClass(info:any){
   //console.logg(info);
    this.teacher.getClassAdvisory(info).subscribe(res=>{
      this.tableSource = new MatTableDataSource(res);
    })
  }

}
