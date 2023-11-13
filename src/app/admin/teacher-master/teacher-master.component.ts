import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-teacher-master',
  templateUrl: './teacher-master.component.html',
  styleUrls: ['./teacher-master.component.scss']
})
export class TeacherMasterComponent implements OnInit {
  displayedColumns: string[] = ['lastName','firstName', 'gradeLevel','action'];
  dataSource:any = new MatTableDataSource();

  constructor(
    public adminService: AdminServiceService) {
    adminService.getTeacherListing().subscribe(e=>{
      this.dataSource = new MatTableDataSource(e);
      this.dataSource.sort = this.sort;
    });
  }
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}
