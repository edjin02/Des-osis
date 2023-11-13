import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GradelevelFormComponent } from 'src/app/dialog/gradelevel-form/gradelevel-form.component';
import { AdminServiceService } from '../../services/admin-service.service';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-grade-level',
  templateUrl: './grade-level.component.html',
  styleUrls: ['./grade-level.component.scss']
})
export class GradeLevelComponent implements OnInit {
  displayedColumns: string[] = ['gradeId','gradeLevel','gradeLevelDesc'];
  dataSource:any = new MatTableDataSource([]);;

  constructor(public dialog: MatDialog,public adminService: AdminServiceService) {

  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.adminService.getGradeLevelListing().subscribe((gl:any[])=>{
      let info = gl.map(e=> ({name: e.gradeLevelName, num: this.adminService.romanToNum(e.gradeLevelName.split(" ").pop()), ...e}))
      .sort((a, b) => (a.num - b.num)).
      map((gradeLevelName,num) => gradeLevelName);
     //console.logg(info);
      this.dataSource = new MatTableDataSource(info);
    })
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  openDialog(){
    const dialogRef = this.dialog.open(GradelevelFormComponent, {
    width: '300px',
    data: {},
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!==null){
        this.adminService.addGradeLevel(result).then(result=>{
        })
      }
    });

  }

}
