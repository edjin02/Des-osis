import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserModuleFormComponent } from 'src/app/dialog/user-module-form/user-module-form.component';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-student-master',
  templateUrl: './student-master.component.html',
  styleUrls: ['./student-master.component.scss'],
})
export class StudentMasterComponent implements OnInit {
  displayedColumns: string[] = [
    'lastName',
    'firstName',
    'gradeLevel',
    'action',
  ];
  dataSource: any = new MatTableDataSource();
  currentPage: number = 0;
  pageSize: number = 20;

  constructor(
    public dialog: MatDialog,
    public adminService: AdminServiceService
  ) {
    adminService.getStudentListing().subscribe((e) => {
      this.dataSource = new MatTableDataSource(e);
      this.dataSource.sort = this.sort;
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(data: any) {
    const dialogRef = this.dialog.open(UserModuleFormComponent, {
      width: '80%',
      height: '100%',
      disableClose: true,
      data: { viewData: data, isNew: false, fromUsers: false },
    });
    dialogRef.afterClosed().subscribe((pl) => {
      if (pl !== null) {
        // Handle dialog close event
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  getPaginatedData() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.dataSource.filteredData.slice(startIndex, endIndex);
  }

  getNumberOfPages(): number[] {
    const totalDataLength = this.dataSource.filteredData.length;
    const totalPages = Math.ceil(totalDataLength / this.pageSize);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

}
