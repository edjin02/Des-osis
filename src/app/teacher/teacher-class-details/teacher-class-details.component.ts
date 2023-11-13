import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';

@Component({
  selector: 'app-teacher-class-details',
  templateUrl: './teacher-class-details.component.html',
  styleUrls: ['./teacher-class-details.component.scss']
})
export class TeacherClassDetailsComponent implements OnInit {
  classId:any = null;
  subjectId:any = null;
  stListings:any = [];
  teacherInfo:any = [];
  subjectName:any = null;
  teacherName:any = null;
  classDetails:any = [];
  alertSave:boolean = false;
  isLoad:boolean = false;
  withRecord:boolean = false;


  constructor(
    private route: ActivatedRoute,
    public auth: AuthServiceService,
    public teacher: TeacherServiceService) { }

  ngOnInit(): void {
    this.teacherInfo = this.auth.currentSession;
    this.classId = this.route.snapshot.paramMap.get('classId');
    this.subjectId = this.route.snapshot.paramMap.get('subjId');
    this.getClassInfo();
  }
  getClassInfo(){
    this.teacher.getSubjectClassInfo(this.teacherInfo?.id,this.subjectId,this.classId).subscribe(res=>{
      this.subjectName = res[0]?.subjectName;
      this.teacherName = res[0]?.teacherFullName;
      this.classDetails = res[0];
      /* Check if no Record */
      this.teacher.getGrades(this.classDetails?.classId, this.classDetails?.schoolYearId, this.classDetails?.id).subscribe(cls=>{
        if(cls.length != 0){
          this.withRecord = true;
          this.stListings = cls;
        }else{
          this.defaultList();
        }
      });
    });

  }
  defaultList(){
    this.teacher.getClassInfoById(this.classId).subscribe(res=>{
      let studentArr:any = [];
       res.students.map((es:any)=>{
        studentArr.push({
          ...es,
          firstGrade: 0,
          secondGrade: 0,
          thirdGrade: 0,
          fourthGrade: 0,
          final: 0,
          remarks: null,
          classId: this.classId,
          schoolYearId: this.classDetails?.schoolYearId,
          subjectId: this.classDetails?.id,
        });
       });
       this.stListings = Object.values(
        studentArr.reduce( (c:any, e:any) => {
        if (!c[e.id]) c[e.id] = e;
        return c;
      }, {}));
    })
  }
  preventValue(index:any ,value:any, field:any){
    let nValue = 0;
    if(value <50 ){
      nValue = 50;
    }else if( value >100){
      nValue = 100;
    }else{
      nValue = Number(value);
    }

    if(field === 1){
      this.stListings[index].firstGrade = nValue;
    }else if(field === 2){
      this.stListings[index].secondGrade = nValue;
    }else if(field === 3){
      this.stListings[index].thirdGrade = nValue;
    }else{
      this.stListings[index].fourthGrade = nValue;
    }
  }
  finalGrade(index:any, ev:any, field: any){
    this.preventValue(index, ev.target.value, field)
    let first = this.stListings[index].firstGrade;
    let second = this.stListings[index].secondGrade;
    let third = this.stListings[index].thirdGrade;
    let fourth = this.stListings[index].fourthGrade;
    this.stListings[index].finalGrade = (first + second + third + fourth) /4;
    if(this.stListings[index].finalGrade < 75){
      this.stListings[index].remarks = 'Failed';
    }else{
      this.stListings[index].remarks = 'Passed';
    }
  }
  saveGrades(){
    if(this.withRecord){
      try{
        let promiseUpdate:any = [];
        this.stListings.map((sl:any)=>{
          promiseUpdate.push(this.teacher.updateSubjGrade(sl.stgId,sl));
        });
        Promise.allSettled(promiseUpdate).then(res=>{
         //console.logg(res);
        }).finally(()=>{
          this.alertSave = true;
          this.isLoad = false;
        });
      }catch(err){

      }
    }else{
      this.newGrade();
    }
  }
  newGrade(){
    this.isLoad = true;
   //console.logg(this.stListings);
    try{
      let promiseGrades:any = [];
      this.stListings.map((sl:any)=>{
        promiseGrades.push(this.teacher.saveSubjGrade(sl));
      });
      Promise.allSettled(promiseGrades).then(res=>{
       //console.logg(res);
      }).finally(()=>{
        this.alertSave = true;
        this.isLoad = false;
      });
    }catch(err){
     //console.logg(err);
    }
  }

}
