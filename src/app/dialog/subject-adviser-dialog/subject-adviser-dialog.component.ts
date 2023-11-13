import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-subject-adviser-dialog',
  templateUrl: './subject-adviser-dialog.component.html',
  styleUrls: ['./subject-adviser-dialog.component.scss']
})
export class SubjectAdviserDialogComponent implements OnInit {
  teacherListing:any = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public _data:any,
    public dialogRef: MatDialogRef<SubjectAdviserDialogComponent>
    ) { }

  ngOnInit(): void {
   this.teacherListing = Object.values(
    this._data.adviser.reduce( (c:any, e:any) => {
    if (!c[e.teacherId]) c[e.teacherId] = e;
    return c;
    }, {})
   );
  }

}
