import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SchoolYearFormComponent } from 'src/app/dialog/school-year-form/school-year-form.component';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-sy',
  templateUrl: './sy.component.html',
  styleUrls: ['./sy.component.scss']
})
export class SyComponent implements OnInit {
  displayedColumns: string[] = ['gradeId','gradeLevel','gradeLevelDesc','action'];
  dataSource:any = new MatTableDataSource([]);;
  defaultSy:any = null;
  enrollmentStatus:any;
  constructor(public dialog: MatDialog,public adminService: AdminServiceService) { }

  ngOnInit(): void {
    this.adminService.getSyListing().subscribe(e=>{
      this.dataSource = new MatTableDataSource(e);
      this.defaultSy = e.filter(e=>{ if(e.status === 'Active'){ return e}});
    });
    this.adminService.getEnrollmentStatus().subscribe(e=>{
      this.enrollmentStatus = e[0];
      console.log(e);
    });
  }
  setEnrollmentStatus(eValue:any){
    let statValue = true;
    if(eValue === 0){
      statValue = false;
    }
    this.adminService.setEnrollmentStatus(statValue).then(()=>{ console.log('test')});
  }
  setActive(data:any){
    this.defaultSy[0].status = 'Inactive';
    this.adminService.updateSy(this.defaultSy[0].id,this.defaultSy[0]).then(e=>{
     //console.logg(e);
      data.status = 'Active';
      this.adminService.updateSy(data.id,data).then(es=>{
       //console.logg(es);
      });
    })

  }
  openDialog(){
    const dialogRef = this.dialog.open(SchoolYearFormComponent, {
    width: '300px',
    data: {},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!==null){

      }
    });
  }
}
