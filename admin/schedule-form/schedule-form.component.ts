import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss']
})
export class ScheduleFormComponent implements OnInit {
  schedRow:any = [];
  schedDay = [
    { id: 1, name: 'Monday', abbr: 'MON' },
    { id: 2, name: 'Tuesday', abbr: 'TUE' },
    { id: 3, name: 'Wednesday', abbr: 'WED' },
    { id: 4, name: 'Thursday', abbr: 'THU' },
    { id: 5, name: 'Friday', abbr: 'FRI' },
  ];
  classId: any;
  classType: any;
  classCol: any;
  schedPlot: any = [];
  subjects:any = [];
  classDetails:any;
  templateList:any;
  selectedTemplate:any;
  classYear:any;
  isView:boolean = false;
  constructor(public adminService: AdminServiceService,
    private route: ActivatedRoute,
    private router: Router) {
      
    }

  ngOnInit(): void {
    this.adminService.getActiveSy().subscribe(activeYear => {
      this.classYear = activeYear[0];
    });
    this.getDetails();
    this.adminService.nGetHead().subscribe((res:any)=>{
      this.templateList = res;
      this.templateList = res.filter((e:any)=>{
        if(e.isActive){
          return e;
        }
      });
    })
  }
  saveSched(){
    console.log(this.schedRow,this.selectedTemplate, this.classYear);
    
    let payload = {
      id: this.classId,
      tempId: this.selectedTemplate,
      schedules: this.schedRow,
      gradeLevelName: this.classDetails?.gradeLevelName,
      sectionName: this.classDetails?.sectionName,
      adviserName: this.classDetails?.adviserName,
      students: this.classDetails?.students,
      subjects: this.classDetails.subjects,
      schoolYearId:this.classYear.id,
      createdOn: new Date(),
    };
    console.log(payload)
    this.adminService.nAddSchedule(this.classId, payload).finally(()=>{
      console.log('sched');
      this.router.navigate(['/admin/schedule']);
    })
  }
  selectTemplate(e:any){
    console.log(this.selectedTemplate);
    this.adminService.nGetSchedTempById(this.selectedTemplate).subscribe((res:any)=>{
      
      this.schedRow = res.map((e:any)=>{
        return {...e, mon:null,tue:null,wed:null,thu:null,fri:null}
      });
      this.schedRow.sort((a:any, b:any) => parseFloat(a.id) - parseFloat(b.id));
    })
  }
  getDetails() {

    this.classId = this.route.snapshot.paramMap.get('id');
    this.classType = this.route.snapshot.paramMap.get('type');

    if (this.classType === 'new') {
      this.classCol = this.adminService.nGetClass(this.classId);
      this.classCol.subscribe((res: any) => {
        let result = res[0];
        this.classDetails = result;
        console.log(this.classDetails);
        this.subjects = result.subjects.map((sbs:any)=>{ return {...sbs, isEnabled: true} });
      });
    } else {
      this.isView = this.classType !== 'edit' ? true : false;
      this.classCol = this.adminService.nGetScheduleById(this.classId);
      this.classCol.subscribe((res: any) => {
        let result = res[0];
        this.classDetails = result;
        
        this.selectedTemplate = this.classDetails.tempId;
        this.subjects = result.subjects.map((sbs:any)=>{ return {...sbs, isEnabled: true} });
        this.schedRow = result.schedules.map((sbs:any)=>{ return {...sbs, isEnabled: true} });
        this.schedRow.sort((a:any, b:any) => parseFloat(a.id) - parseFloat(b.id));
        console.log(this.schedRow);
      });
    }
   
  }
  getId(index:any,data:any,ev:any = null){
    var subIn = this.subjects.findIndex(function(subject:any){
      return subject.id == ev.target.value
    });
  }
  resetList(day:any, id:any, timeId:any=null){
    var subIn = this.subjects.findIndex(function(subject:any){
      return subject.id == id
    });
    this.schedRow[timeId][day] = null;
    this.subjects[subIn].isEnabled = true;
  }

}
