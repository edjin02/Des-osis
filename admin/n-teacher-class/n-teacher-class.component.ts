// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { AdminServiceService } from 'src/app/services/admin-service.service';

// @Component({
//   selector: 'app-n-teacher-class',
//   templateUrl: './n-teacher-class.component.html',
//   styleUrls: ['./n-teacher-class.component.scss']
// })
// export class NTeacherClassComponent implements OnInit {
//   userTeacherId:any;
//   curriculumData:any;
//   isDisabled:boolean = true;
//   newSubjectField:any;
//   isUpdated:boolean = false;
//   newCodeField:any;
//   gradeLevels:any;
//   subjectData:any;
//   userFullName:any;
//   lastUpdate:any;
//   teacherInfo:any;
//   constructor(public adminService:AdminServiceService,
//     private route: ActivatedRoute,
//     private router: Router) { }

//   ngOnInit(): void {
//     this.userTeacherId = this.route.snapshot.paramMap.get('id');
//     this.adminService.getTeacherInfo(this.userTeacherId).subscribe((res:any)=>{
//       this.teacherInfo = res[0];
//       this.userFullName = res[0].lastName + ' ' + res[0].firstName;
//       this.lastUpdate = res[0].createdOn.toDate();
//     });
//     this.adminService.viewTeachAssign(this.userTeacherId).subscribe(res=>{
//       if(Object.keys(res).length > 0){
//         this.subjectData = res?.subjects;
//       }else{
//         this.adminService.getActiveCurriculum().subscribe(yrInfo=>{
//           let currInfo = yrInfo[0];
//           this.adminService.viewCurriculum(currInfo.id).subscribe(res=>{
//             this.curriculumData = res;
//             this.subjectData = this.curriculumData?.curriculumSubjects;
//           });
//         })

//       }
//     })
//     this.adminService.getGradeLevelListing().subscribe((grades:any)=>{
//       this.gradeLevels = grades.map((e:any)=>{ return {...e,isChecked:true }});
//     });
//     this.subjectData.forEach((subject: any) => {
//       subject.gradeLevels[0].isChecked = false; // Uncheck Grade I
//       subject.gradeLevels[1].isChecked = false; // Uncheck Grade II
//     });

//   }


//   gradeUncheck(e: any, gIndex: any) {
//     const arrLength = this.subjectData.length;
//     let isGradeIChecked = false;
//     let isGradeIIChecked = false;

//     // Check if Grade I or Grade II is checked
//     for (let index = 0; index < arrLength; index++) {
//       const gradeLevels = this.subjectData[index].gradeLevels;
//       if (gradeLevels[0].isChecked) {
//         isGradeIChecked = true;
//       }
//       if (gradeLevels[1].isChecked) {
//         isGradeIIChecked = true;
//       }
//     }

//     // Update the checked status and disabled property
//     for (let index = 0; index < arrLength; index++) {
//       const gradeLevels = this.subjectData[index].gradeLevels;
//       gradeLevels[gIndex].isChecked = e;

//       // Always disable Grade I and Grade II checkboxes
//       gradeLevels[0].disabled = true;
//       gradeLevels[1].disabled = true;

//       if (gIndex === 0) {
//         // Grade I checkbox clicked
//         gradeLevels[1].isChecked = false; // Uncheck Grade II
//         for (let i = 2; i < gradeLevels.length; i++) {
//           gradeLevels[i].isChecked = false; // Uncheck other grades
//           gradeLevels[i].disabled = e;
//         }
//       } else if (gIndex === 1) {
//         // Grade II checkbox clicked
//         gradeLevels[0].isChecked = false; // Uncheck Grade I
//         for (let i = 2; i < gradeLevels.length; i++) {
//           gradeLevels[i].isChecked = false; // Uncheck other grades
//           gradeLevels[i].disabled = e;
//         }
//       } else {
//         // Other grade checkboxes clicked
//         gradeLevels[0].disabled = isGradeIIChecked;
//         gradeLevels[1].disabled = isGradeIChecked;
//         gradeLevels[2].disabled = isGradeIIChecked;
//         gradeLevels[3].disabled = isGradeIIChecked;
//         gradeLevels[4].disabled = isGradeIIChecked;
//         gradeLevels[5].disabled = isGradeIIChecked;
//         gradeLevels[gIndex].disabled = isGradeIChecked || isGradeIIChecked;
//       }
//     }
//   }



//   checkUncheck(e:any, arrayIndex:any){
//     let arrLength = this.gradeLevels.length
//     for (let index = 0; index < arrLength; index++) {
//       this.subjectData[arrayIndex].gradeLevels[index].isChecked = e;
//     }
//   }
//   saveTeacherAssign(){
//     let payload = {
//       id: this.userTeacherId,
//       fullName: this.userFullName,
//       subjects: this.subjectData,
//       createdOn: new Date()
//     }

//     let glevelArr:any = [];
//     let getGrades = payload.subjects[0].gradeLevels;
//     payload.subjects.map((e:any)=>{
//       let vGlevel  = e.gradeLevels.filter((gl:any)=> gl.isChecked === true);
//       glevelArr.push(...vGlevel);
//     });
//     let unique = [...new Set(glevelArr.map((item:any) => item.id))];
//     let gradeAdvise:any = [];
//     unique.map(e=>{
//       getGrades.map((gG:any)=>{
//         if(gG.id === e){
//           gradeAdvise.push({teacherId: this.userTeacherId,fullName: this.userFullName,...gG})
//         }
//       })
//     });
//     let promiseLevel:any = [];
//     for (let index = 0; index < gradeAdvise.length; index++) {
//       let nId = this.adminService.generateId();
//       gradeAdvise[index]['nTeacherId'] = nId;
//       promiseLevel.push(this.adminService.saveGradeTeacherList(gradeAdvise[index],nId));
//     }
//     Promise.allSettled(promiseLevel).finally(()=>{
//       console.log('done');
//       this.adminService.addTeacherAssign(payload,this.userTeacherId).then(res=>{
//         this.router.navigate(['/admin/teacher'])
//       });
//     })

//   }

// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-n-teacher-class',
  templateUrl: './n-teacher-class.component.html',
  styleUrls: ['./n-teacher-class.component.scss']
})
export class NTeacherClassComponent implements OnInit {
  userTeacherId:any;
  curriculumData:any;
  isDisabled:boolean = true;
  newSubjectField:any;
  isUpdated:boolean = false;
  newCodeField:any;
  gradeLevels:any;
  subjectData:any;
  userFullName:any;
  lastUpdate:any;
  teacherInfo:any;
  constructor(public adminService:AdminServiceService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.userTeacherId = this.route.snapshot.paramMap.get('id');
    this.adminService.getTeacherInfo(this.userTeacherId).subscribe((res:any)=>{
      this.teacherInfo = res[0];
      this.userFullName = res[0].lastName + ' ' + res[0].firstName;
      this.lastUpdate = res[0].createdOn.toDate();
    });
    this.adminService.viewTeachAssign(this.userTeacherId).subscribe(res=>{
      if(Object.keys(res).length > 0){
        this.subjectData = res?.subjects;
      }else{
        this.adminService.getActiveCurriculum().subscribe(yrInfo=>{
          let currInfo = yrInfo[0];
          this.adminService.viewCurriculum(currInfo.id).subscribe(res=>{
            this.curriculumData = res;
            this.subjectData = this.curriculumData?.curriculumSubjects;
          });
        })

      }
    })
    this.adminService.getGradeLevelListing().subscribe((grades: any) => {
      this.gradeLevels = grades.map((e: any) => {
        return { ...e, isChecked: true, disabled: true };
      });

      // Check if Grade I or Grade II is checked
      let isGradeIChecked = false;
      let isGradeIIChecked = false;
      this.subjectData.forEach((subject: any) => {
        if (subject.gradeLevels[0].isChecked) {
          isGradeIChecked = true;
        }
        if (subject.gradeLevels[1].isChecked) {
          isGradeIIChecked = true;
        }
      });

      // Disable Grade I and Grade II columns if no checkboxes are checked
      this.gradeLevels[0].disabled = !isGradeIChecked;
      this.gradeLevels[1].disabled = !isGradeIIChecked;
    });


  this.subjectData.forEach((subject: any) => {
    subject.gradeLevels[0].isChecked = false; // Uncheck Grade I
    subject.gradeLevels[1].isChecked = false; // Uncheck Grade II
    subject.gradeLevels[0].disabled = true; // Disable Grade I column
    subject.gradeLevels[1].disabled = true; // Disable Grade II column
  });

  }


  gradeUncheck(e: any, gIndex: any) {
    const arrLength = this.subjectData.length;
    let isGradeIChecked = false;
    let isGradeIIChecked = false;

    // Check if Grade I or Grade II is checked
    for (let index = 0; index < arrLength; index++) {
      const gradeLevels = this.subjectData[index].gradeLevels;
      if (gradeLevels[0].isChecked) {
        isGradeIChecked = true;
      }
      if (gradeLevels[1].isChecked) {
        isGradeIIChecked = true;
      }
    }

    // Update the checked status and disabled property
    for (let index = 0; index < arrLength; index++) {
      const gradeLevels = this.subjectData[index].gradeLevels;
      gradeLevels[gIndex].isChecked = e;

      // Always disable Grade I and Grade II checkboxes
      gradeLevels[0].disabled = true;
      gradeLevels[1].disabled = true;

      if (gIndex === 0) {
        // Grade I checkbox clicked
        gradeLevels[1].isChecked = false; // Uncheck Grade II
        for (let i = 2; i < gradeLevels.length; i++) {
          gradeLevels[i].isChecked = false; // Uncheck other grades
          gradeLevels[i].disabled = e;
        }
      } else if (gIndex === 1) {
        // Grade II checkbox clicked
        gradeLevels[0].isChecked = false; // Uncheck Grade I
        for (let i = 2; i < gradeLevels.length; i++) {
          gradeLevels[i].isChecked = false; // Uncheck other grades
          gradeLevels[i].disabled = e;
        }
      } else {
        // Other grade checkboxes clicked
        gradeLevels[0].disabled = isGradeIIChecked;
        gradeLevels[1].disabled = isGradeIChecked;
        gradeLevels[2].disabled = isGradeIIChecked;
        gradeLevels[3].disabled = isGradeIIChecked;
        gradeLevels[4].disabled = isGradeIIChecked;
        gradeLevels[5].disabled = isGradeIIChecked;
        gradeLevels[gIndex].disabled = isGradeIChecked || isGradeIIChecked;
      }
    }
  }


  checkUncheck(e:any, arrayIndex:any){
    let arrLength = this.gradeLevels.length
    for (let index = 0; index < arrLength; index++) {
      this.subjectData[arrayIndex].gradeLevels[index].isChecked = e;
    }
  }
  saveTeacherAssign(){
    let payload = {
      id: this.userTeacherId,
      fullName: this.userFullName,
      subjects: this.subjectData,
      createdOn: new Date()
    }

    let glevelArr:any = [];
    let getGrades = payload.subjects[0].gradeLevels;
    payload.subjects.map((e:any)=>{
      let vGlevel  = e.gradeLevels.filter((gl:any)=> gl.isChecked === true);
      glevelArr.push(...vGlevel);
    });
    let unique = [...new Set(glevelArr.map((item:any) => item.id))];
    let gradeAdvise:any = [];
    unique.map(e=>{
      getGrades.map((gG:any)=>{
        if(gG.id === e){
          gradeAdvise.push({teacherId: this.userTeacherId,fullName: this.userFullName,...gG})
        }
      })
    });
    let promiseLevel:any = [];
    for (let index = 0; index < gradeAdvise.length; index++) {
      let nId = this.adminService.generateId();
      gradeAdvise[index]['nTeacherId'] = nId;
      promiseLevel.push(this.adminService.saveGradeTeacherList(gradeAdvise[index],nId));
    }
    Promise.allSettled(promiseLevel).finally(()=>{
      console.log('done');
      this.adminService.addTeacherAssign(payload,this.userTeacherId).then(res=>{
        this.router.navigate(['/admin/teacher'])
      });
    })

  }

}






