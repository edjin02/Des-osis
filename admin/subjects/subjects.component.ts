import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AdminSubjectComponent } from 'src/app/dialog/admin-subject/admin-subject.component';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  displayedColumns: string[] = ['subjectId','subjectCode','subjectName','gradeLevel','action'];
  dataSource:any = new MatTableDataSource();
  gradeLevelList:any;
  constructor(public dialog: MatDialog,public adminService: AdminServiceService) { }

  ngOnInit(): void {
    this.adminService.getGradeLevelListing().subscribe(e=>{
      this.gradeLevelList = e;
     });
     this.adminService.getSubjectListing().subscribe(e=>{
      this.dataSource = new MatTableDataSource(e);
     });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openForm(){
    const dialogRef = this.dialog.open(AdminSubjectComponent, {
      width: '350px',
      data: {gradeList:this.gradeLevelList},
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.adminService.addSubject(result);
        }
      });
  }
}
