import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { SubjectStudentDialogComponent } from 'src/app/dialog/subject-student-dialog/subject-student-dialog.component';
import { UserModuleFormComponent } from 'src/app/dialog/user-module-form/user-module-form.component';

@Component({
  selector: 'app-n-room-class',
  templateUrl: './n-room-class.component.html',
  styleUrls: ['./n-room-class.component.scss'],
})
export class NRoomClassComponent implements OnInit {
  curriculumSubjects: any = [];
  activeGrades: any = [];
  teacherList: any = [];
  subjectTeacherList: any = [];
  classGrade: any;
  classInfo: any;
  sectionName: any = null;
  classAdviser: any = [];
  subjectAdvise: any = [];
  selectedAdviser: any = null;
  subjectSelect: any;
  activeSy: any;
  selectUnsub: any;
  classValue: any;
  classLinkId: any;
  advisedStudent: any = [];
  addedStudentList: any = [];
  subjectStudentList: any = [];
  constructor(
    public adminService: AdminServiceService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.classGrade = this.route.snapshot.paramMap.get('gradeId');
    this.adminService
      .getStudentByGradeLevel(this.classGrade)
      .subscribe((studentSubj) => {
        //console.logg(studentSubj);
        this.subjectStudentList = studentSubj;
      });
  }

  ngOnInit(): void {
    this.adminService.getActiveCurriculum().subscribe((res: any) => {
      let subjectList = res[0]?.curriculumSubjects;
      subjectList.map((sL: any) => {
        sL.gradeLevels.map((gL: any) => {
          if (gL.id === this.classGrade) {
            this.classInfo = gL;
            if (gL.isChecked === true) {
              this.activeGrades.push({
                ...sL,
                teacherId: null,
                fullName: null,
              });
            }
          }
        });
      });
    });
    this.adminService.getActiveSy().subscribe((res) => {
      this.activeSy = res[0];
    });
    this.getAdviserList();
    this.getClassDetails();
  }
  getClassDetails() {
    this.classLinkId = this.route.snapshot.paramMap.get('classId');
    if (this.classLinkId !== 'new') {
      const infoList = this.adminService
        .nGetClass(this.classLinkId)
        .subscribe((res) => {
          this.classValue = res[0];
          console.log(this.classValue);
          this.sectionName = this.classValue.sectionName;
          this.selectedAdviser = this.classValue.adviserId;
          this.activeGrades = this.classValue.subjects;
          console.log(this.activeGrades);
          this.addedStudentList = this.classValue.students;
          this.advisedStudent = this.classValue.students;
          console.log(this.addedStudentList);
        });
    }
  }
  getAdviserList() {
    this.adminService
      .getGradeTeacherList(this.classGrade)
      .subscribe((res: any) => {
        this.classAdviser = [
          ...new Map(
            res.map((item: any) => [item['teacherId'], item])
          ).values(),
        ];
        this.adminService.nGetClassByYearId(this.activeSy.id).subscribe(res2=>{
          // console.log(this.classAdviser);
          let arrExist = res2;
          let redunArr = arrExist.filter((obj:any,index:any,self:any)=>{
            return index === self.findIndex((item:any)=> item.adviserId === obj.adviserId)
          });
          this.classAdviser = this.classAdviser.filter((item1:any) => !redunArr.some((item2:any) => item2.adviserId === item1.teacherId));
        })
      });
    
  }
  
  setAllClass(e: any) {
    if (
      this.classGrade === '7MrZ5mtPeZfy0bm6GTM8' ||
      this.classGrade === '45cPfPJd3ao0iaQ8xqIG'
    ) {
      this.activeGrades.map((e: any) => {
        let tName = this.classAdviser.map((item: any) => {
          if (item.teacherId === this.selectedAdviser) return item.fullName;
        });
        e.fullName = tName.filter((fName: any) => fName)[0];
        e.teacherId = this.selectedAdviser;
      });
    }
  }
  addfilteredData(payload: any) {
    this.addedStudentList = payload.filter((res: any) => {
      if (res.isSelected === true) return res;
    });
    //console.logg(this.addedStudentList);
  }
  studentSubjDialog() {
    const dialogRef = this.dialog.open(SubjectStudentDialogComponent, {
      width: '50%',
      height: '80%',
      disableClose: true,
      data: {
        studentList: this.checkAdvisedStudent(),
        addedStudent: this.addedStudentList,
        advised: this.advisedStudent,
      },
    });
    dialogRef.afterClosed().subscribe((pl) => {
      console.log(pl);
      if (pl !== null) {
        this.subjectStudentList = pl;
        this.addfilteredData(pl);
      }
    });
  }

  checkAdvisedStudent() {
    console.log(this.subjectStudentList);
    let filterStudent = this.subjectStudentList.filter((e: any) => {
      let im = this.advisedStudent.find((ad: any) => {
        return e.id === ad.studentId;
      });
      //console.log(im);
      if (im) {
        if (im.studentId !== e.id) {
          return e;
        }
      } else {
        return e;
      }
    });
    this.subjectStudentList = filterStudent;
    return filterStudent;
  }
  saveTeacherClass() {
    let classId =
      this.classLinkId !== 'new'
        ? this.classLinkId
        : this.adminService.generateId();

    let tName = this.classAdviser.map((item: any) => {
      if (item.teacherId === this.selectedAdviser) return item.fullName;
    });

    let payload = {
      id: classId,
      adviserId: this.selectedAdviser,
      adviserName: tName.filter((fName: any) => fName)[0],
      gradeLevelId: this.classGrade,
      gradeLevelName: this.classInfo.gradeLevelName,
      sectionName: this.sectionName,
      subjects: this.activeGrades,
      schoolYearId: this.activeSy.id,
      schoolYear: this.activeSy.schoolYear,
      students: this.addedStudentList,
      createdOn: new Date(),
      active:true,
    };
    console.log(payload);
    this.adminService.nSaveClass(classId, payload).finally(() => {
      this.router.navigate(['/admin/room-assign']);
    });
  }
  openDialogAdvise(dialogName: any, info: any, ind: any = null, emp: any) {
    emp.preventDefault();
    if (
      this.classGrade !== '7MrZ5mtPeZfy0bm6GTM8' &&
      this.classGrade !== '45cPfPJd3ao0iaQ8xqIG'
    ) {
      this.selectUnsub = this.adminService
        .ngGetAssignTeacher()
        .subscribe((res: any) => {
          let subList: any = [];
          res.map((e: any) => {
            const isFound = e.subjects.find((sls: any) => sls.id === info.id);
            if (isFound) {
              const levelGrade = isFound.gradeLevels.find(
                (lst: any) => lst.id === this.classGrade
              );
              if (levelGrade.isChecked) {
                subList.push(e);
              }
            }
          });
          this.selectUnsub.unsubscribe();
          this.subjectAdvise = subList;
          this.subjectSelect = ind;
          this.dialog.open(dialogName, { width: '58vh', disableClose: true });
        });
    }
  }
  selectAdvise(e: any) {
    console.log(this.activeGrades[this.subjectSelect]);
    console.log(e);
    this.activeGrades[this.subjectSelect].fullName = e.fullName;
    this.activeGrades[this.subjectSelect].teacherId =
      typeof e.id === 'undefined' ? e.teacherId : e.id;
    this.dialog.closeAll();
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
      }
    });
  }
}
