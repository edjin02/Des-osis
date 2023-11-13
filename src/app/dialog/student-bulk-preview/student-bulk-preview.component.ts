import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-student-bulk-preview',
  templateUrl: './student-bulk-preview.component.html',
  styleUrls: ['./student-bulk-preview.component.scss']
})
export class StudentBulkPreviewComponent implements OnInit {
  selectAll:boolean = true;
  studentListing:any;
  headers:any = [];
  constructor(@Inject(MAT_DIALOG_DATA) public _data:any,
  public dialogRef: MatDialogRef<StudentBulkPreviewComponent>) { }

  ngOnInit(): void {
    this.headers;
    let students = this._data.studentList;
    this.studentListing = students.map((e:any)=>{ return {...e, password: formatDate(new Date(), 'yyyyMMdd', 'en'),selected: true}});
  }
  selectUnselect(){
    let submittedStudent = this.studentListing.filter((e:any)=>{
      if(e.selected === true){
        return e;
      }
    });
    this.dialogRef.close(submittedStudent);
  }
  getChecked(){
    this.selectAll = !this.selectAll;
    console.log(this.selectAll);
    this.studentListing.map((e:any)=> e.selected = this.selectAll);
  }

}
