import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-adviser-dialog',
  templateUrl: './adviser-dialog.component.html',
  styleUrls: ['./adviser-dialog.component.scss']
})
export class AdviserDialogComponent implements OnInit {
  adviserListing:any = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public _data:any,
    public dialogRef: MatDialogRef<AdviserDialogComponent>,) { }

  ngOnInit(): void {
    this.adviserListing  = Object.values(
      this._data.adviser.reduce( (c:any, e:any) => {
      if (!c[e.teacherId]) c[e.teacherId] = e;
      return c;
    }, {})
  );
  }

}
