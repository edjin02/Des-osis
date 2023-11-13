import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-subject-student-dialog',
  templateUrl: './subject-student-dialog.component.html',
  styleUrls: ['./subject-student-dialog.component.scss']
})
export class SubjectStudentDialogComponent implements OnInit {
  displayedColumns: string[] = ['checkbox','controlNumber','lastName','firstName','gender'];
  dataSource:any = new MatTableDataSource([]);
  studentListing:any = [];
  addedStudentListing:any [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public _data:any,
    public dialogRef: MatDialogRef<SubjectStudentDialogComponent>
  ) { }

  ngOnInit(): void {
    this.addedStudentListing = this._data.addedStudent;
    this.studentListing = Object.values(
      this._data.studentList.reduce( (c:any, e:any) => {
      if (!c[e.id]) c[e.id] = e;
      return c;
    }, {})
     );
    this.addedStudentListing.map(e=>{
      let im = this.studentListing.findIndex((obj:any) => obj.id === e.id);
      this.studentListing[im].isSelected = true;
    })
    this.dataSource = new MatTableDataSource(this.studentListing);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getSelectedData(data:any){
    console.log(data);
    this.dialogRef.close(data);
  }

}
