import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-teacher-master-info',
  templateUrl: './teacher-master-info.component.html',
  styleUrls: ['./teacher-master-info.component.scss'],
})
export class TeacherMasterInfoComponent implements OnInit {
  teacherId: any;
  teacherInfo: any = null;
  gradeLevel: any;
  teacherSubj: any = [];
  pageLoading: boolean = false;
  hasRecord: boolean = false;

  allComplete: boolean = false;
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    public adminService: AdminServiceService
  ) {}
  async ngOnInit() {
    /* GET TEACHER INFO */
    this.pageLoading = true;
    this.teacherId = this.route.snapshot.paramMap.get('id');
    await this.adminService
      .getTeacherInfo(this.teacherId)
      .subscribe(async (e) => {
        //console.log(e[0]);
        this.teacherInfo = e[0];
        if (this.teacherInfo.info?.subjectAssign) {
          this.pageLoading = false;
          this.hasRecord = true;
          this.teacherSubj = this.teacherInfo.info?.subjectAssign;
        } else {
          await this.getGradeInfo();
        }
      });
    /* GET GRADE LEVEL */
  }

  deleteSubj() {
    this.adminService.deleleteRecord(this.teacherId);
  }
  async getGradeInfo() {
    await this.adminService.getSubjectListing().subscribe(async (sbs) => {
      await this.adminService.getGradeLevelListing().subscribe(async (gl) => {
        this.pageLoading = false;
        this.teacherSubj = gl.map((e) => ({
          name: e.gradeLevelName,
          ...e,
          teacherId: this.teacherInfo.id,
          isChecked: false,
          subjects: null,
        }));

        this.teacherSubj.map((e: any) => {
          e.subjects = sbs.filter((sb) => {
            if (sb.gradeLevelId === e.id) {
              return { ...sb, isChecked: false };
            }
          });
        });
      });
    });
  }
  someComplete(index: any): boolean {
    if (this.teacherSubj[index].subjects == null) {
      return false;
    }
    return (
      this.teacherSubj[index].subjects.filter((t: any) => t.isChecked).length >
        0 && !this.teacherSubj[index].isChecked
    );
  }
  updateAllComplete(index: any) {
    let res = false;
    res =
      this.teacherSubj[index].subjects != null &&
      this.teacherSubj[index].subjects.every((t: any) => t.isChecked);
    this.teacherSubj[index].isChecked = res;
  }
  setAll(index: any, info: any) {
    this.teacherSubj[index].isChecked = info;
    if (this.teacherSubj[index].subjects == null) {
      return;
    }
    this.teacherSubj[index].subjects.forEach((t: any) => (t.isChecked = info));
  }
  saveSubj() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      disableClose: true,
      data: {},
    });
    dialogRef.afterClosed().subscribe((pl) => {
      if (pl === true) {
        this.confirmSave();
      }
    });
  }
  confirmSave() {
    let subjTeacher: any[] = [];
    let subjectInfo = this.teacherSubj.filter((e: any) => {
      return (
        e.isChecked === true ||
        (e.isChecked === false &&
          e.subjects.filter((t: any) => t.isChecked).length > 0)
      );
    });
    this.teacherInfo.info['subjectAssign'] = subjectInfo;
    subjectInfo.map((es: any) => {
      es.subjects.map((e: any) => {
        if (e.isChecked)
          subjTeacher.push({
            ...e,
            teacherId: this.teacherId,
            teacherInfo: this.teacherInfo,
          });
      });
    });
    this.adminService.updateTeacher(this.teacherInfo.id, this.teacherInfo);
    try {
      this.adminService.addTeacherSubj(this.teacherId, subjTeacher);
    } catch {}
  }
}
