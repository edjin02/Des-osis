import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminCurriculumComponent } from 'src/app/dialog/admin-curriculum/admin-curriculum.component';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent implements OnInit {
  displayedColumns: string[] = ['curriculumId','curriculumCode','curriculumYear','curriculumDate','action'];
  dataSource:any = new MatTableDataSource();
  nData: any = [];
  constructor(
    public dialog: MatDialog,
    public adminService: AdminServiceService) { }

  ngOnInit(): void {
    this.adminService.getAllCurriculum().subscribe((res:any)=>{
      this.dataSource = new MatTableDataSource(res);
      this.nData = res;
    })
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  setActiveCurriculum(el:any){
    let curData = this.nData.filter((cur:any)=>{
      if(cur.isActive === true){
        return cur;
      }
    });
    curData[0].isActive = false;
    let savePrev = this.adminService.saveCurriculum(curData[0],curData[0].id).then(()=>{
      el.isActive = true;
      this.adminService.saveCurriculum(el,el.id);
    });
  }
  delete(id:any){
    this.adminService.deleteCurriculum(id);
  }
  openDialog(data:any) {
    const dialogRef = this.dialog.open(AdminCurriculumComponent, {
      width: '80%',
      height: '100%',
      disableClose: true,
      data: {viewData: data, isNew: false, fromUsers: false},
    });
    dialogRef.afterClosed().subscribe((pl) => {
      if (pl !== null) {
      }
    });
  }

}
