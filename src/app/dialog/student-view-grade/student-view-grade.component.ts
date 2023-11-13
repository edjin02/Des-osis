import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-student-view-grade',
  templateUrl: './student-view-grade.component.html',
  styleUrls: ['./student-view-grade.component.scss']
})
export class StudentViewGradeComponent implements OnInit {
  grade:any = null;
  subject:any = null;
  constructor(
    public dialogRef: MatDialogRef<StudentViewGradeComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any) { }

  ngOnInit(): void {
    this.grade = this._data?.gradesInfo;
    this.subject = this._data?.subjectInfo;
   //console.logg(this.grade, this.subject);
  }

}
