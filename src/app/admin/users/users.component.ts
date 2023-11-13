import { formatDate } from '@angular/common';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentBulkPreviewComponent } from 'src/app/dialog/student-bulk-preview/student-bulk-preview.component';
import { UserFormComponent } from 'src/app/dialog/user-form/user-form.component';
import { UserInfoWindowComponent } from 'src/app/dialog/user-info-window/user-info-window.component';
import { UserModuleFormComponent } from 'src/app/dialog/user-module-form/user-module-form.component';
import { AdminServiceService } from 'src/app/services/admin-service.service';

export interface PeriodicElement {
  fullName: any;
  userType: string;
  status: string;
  gradeLevel: string;
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'lastName',
    'firstName',
    'userType',
    'status',
    'gradeLevel',
    'action',
  ];
  dataSource: any = new MatTableDataSource();
  currentPage: number = 0;
  pageSize: number = 20;
  total: any = [];
  students: any = [];
  teachers: any = [];
  gradeListing: any = [];
  bulkStudentData: any = [];
  constructor(
    public dialog: MatDialog,
    public adminService: AdminServiceService
  ) {
    adminService.getUserListing().subscribe((e) => {
      this.students = e.filter((st) => st?.userType === 'Student');
      this.teachers = e.filter((st) => st?.userType === 'Teacher');
      this.total = e;
      this.dataSource = new MatTableDataSource(e);
      this.dataSource.sort = this.sort;
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.adminService.getGradeLevelListing().subscribe((e) => {
      this.gradeListing = e;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isNew(item: boolean) {
    return item === true ? 'New' : 'Active';
  }

  bulkStudentAdd($event: any) {
    const reader = new FileReader();
    reader.onload = () => {
      let text: any = reader.result;
      this.csvJSON(text);
    };
    reader.readAsText($event.target.files[0]);
  }
  csvJSON(csvText: any) {
    var lines = csvText.split('\n');
    var result = [];
    var headers: any = lines[0].replace(/(\r\n|\n|\r)/gm, '').split(',');
    for (var i = 1; i < lines.length - 1; i++) {
      var obj: any = {};
      var currentline = lines[i].split(',');
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    this.bulkStudentData = result;
    this.openPreviewDialog(result, headers);
  }
  openPreviewDialog(csv: any, hData: any) {
    const dialogRef = this.dialog.open(StudentBulkPreviewComponent, {
      width: '500px',
      disableClose: true,
      data: { studentList: csv, header: hData },
    });
    dialogRef.afterClosed().subscribe((pl) => {
      if (pl !== null) {
        let newPayLoad = pl.map((payl: any) => {
          return {
            ...payl,
            password: formatDate(new Date(), 'yyyyMMdd', 'en'),
            userType: 'Student',
            createdOn: new Date(),
            isNew: true,
          };
        });
        try {
          newPayLoad.map((e: any) => {
            this.adminService.addUser(e).then((res) => {
              e.userId = res.id;
              this.adminService.addStudent(e).then((st) => {
                //console.logg(st.id);
              });
            });
          });
        } catch {}
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  dateFormat(date: any) {
    if (date) {
      return formatDate(date.toDate().toDateString(), 'yyyy/MM/dd', 'en');
    }
    return '';
  }

  openInfo(e: any, info: any) {
    if (e.userType !== 'Student') {
      const dialogRef = this.dialog.open(UserInfoWindowComponent, {
        width: '50%',
        disableClose: true,
        data: { userInfo: e, mode: info },
      });

      dialogRef.afterClosed().subscribe((pl) => {
        if (pl !== null) {
          this.adminService.updateUser(pl.id, pl).then((e) => {
            location.reload();
          });
        }
      });
    } else {
      this.dialog.open(UserModuleFormComponent, {
        width: '90%',
        height: '95%',
        disableClose: true,
        data: { viewData: e, isNew: false, fromUsers: true },
      });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '50%',
      disableClose: true,
      data: { gradeLevel: this.gradeListing },
    });
    dialogRef.afterClosed().subscribe((pl) => {
      if (pl !== null) {
        this.adminService.addUser(pl).then((res) => {
          pl.userId = res.id;
          if (pl.userType === 'Student') {
            pl.info = {
              gradeLevel: null,
            };
            this.adminService.addStudent(pl).then((st) => {
              //console.logg(st.id);
            });
          } else {
            pl.info = {
              isAdviser: null,
              gradeLevel: null,
            };
            this.adminService.addTeacher(pl).then((ts) => {
              //console.logg(ts.id);
            });
          }
        });
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
