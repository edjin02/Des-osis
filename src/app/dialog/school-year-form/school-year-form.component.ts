import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-school-year-form',
  templateUrl: './school-year-form.component.html',
  styleUrls: ['./school-year-form.component.scss']
})
export class SchoolYearFormComponent implements OnInit {
  schoolYear:any = null;

  constructor(
    public dialogRef: MatDialogRef<SchoolYearFormComponent>,
    public adminService: AdminServiceService) { }

  ngOnInit(): void {
  }
  saveYear(){
    let payload = {
      schoolYear: this.schoolYear,
      status: 'Inactive'
    };
    this.adminService.addSy(payload);
    this.dialogRef.close();
  }

}
