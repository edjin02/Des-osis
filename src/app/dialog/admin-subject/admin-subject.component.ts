import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

@Component({
  selector: 'app-admin-subject',
  templateUrl: './admin-subject.component.html',
  styleUrls: ['./admin-subject.component.scss']
})
export class AdminSubjectComponent implements OnInit {
  subjectCode: any;
  subjectName: any;
  subjectDescription: any;
  gradeLevel: any;

  constructor(
    public dialogRef: MatDialogRef<AdminSubjectComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any) { }

  ngOnInit(): void {
  }
  saveSubj() {
    if (this._data.fromNew !== true) {
      let pl = {
        subjectCode: this.subjectCode,
        subjectName: this.subjectName,
        subjectDescription: this.subjectDescription,
        gradeLevelId: this.gradeLevel,
        gradeLevelName: this._data?.gradeList.find((e: any) => e.id == this.gradeLevel)?.gradeLevelName
      }
      this.dialogRef.close(pl);
    } else {
      let pl = {
        subjectCode: this.subjectCode,
        subjectName: this.subjectName,
        subjectDescription: this.subjectDescription,
      }
      this.dialogRef.close(pl);
    }
  }
  closeDialog() {

  }

}
