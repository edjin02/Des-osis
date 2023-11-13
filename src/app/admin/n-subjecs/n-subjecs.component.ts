import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AdminSubjectComponent } from 'src/app/dialog/admin-subject/admin-subject.component';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-n-subjecs',
  templateUrl: './n-subjecs.component.html',
  styleUrls: ['./n-subjecs.component.scss']
})
export class NSubjecsComponent implements OnInit {
  displayedColumns: string[] = ['subjectId','subjectCode','subjectName','action'];
  dataSource:any = new MatTableDataSource();
  gradeLevelList:any;
  constructor(public dialog: MatDialog,public adminService: AdminServiceService) { }

  ngOnInit(): void {
     this.adminService.nSubjectListing().subscribe((e:any)=>{
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
      data: {gradeList:this.gradeLevelList,fromNew:true},
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.adminService.nAddSubject(result);
        }
      });
  }

}
