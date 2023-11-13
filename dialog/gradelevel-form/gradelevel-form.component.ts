import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-gradelevel-form',
  templateUrl: './gradelevel-form.component.html',
  styleUrls: ['./gradelevel-form.component.scss']
})
export class GradelevelFormComponent implements OnInit {
  gradeLevelName:any;
  gradeLevelDesc:any;
  constructor(
    public dialogRef: MatDialogRef<GradelevelFormComponent>,
  ) { }

  ngOnInit(): void {
  }
  saveGrade(){
    let pl = {
      gradeLevelName: this.gradeLevelName,
      gradeLevelDesc: this.gradeLevelDesc
    };
    this.dialogRef.close(pl);
  }
  closeDialog() {
    this.dialogRef.close(null);
  }

}
