import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  schedRow = [
    { id: 1, time: "07:00 - 08:00" },
    { id: 2, time: "08:00 - 09:00" },
    { id: 3, time: "09:00 - 10:00" },
    { id: 4, time: "10:00 - 11:00" },
    { id: 5, time: "11:00 - 12:00" },
    { id: 6, time: "12:00 - 01:00" },
    { id: 7, time: "01:00 - 02:00" },
    { id: 8, time: "02:00 - 03:00" },
    { id: 9, time: "03:00 - 04:00" },
    { id: 10, time: "04:00 - 05:00" },
  ];
  schedDay = [
    { id: 1, name: 'Monday', abbr: 'MON' },
    { id: 2, name: 'Tuesday', abbr: 'TUE' },
    { id: 3, name: 'Wednesday', abbr: 'WED' },
    { id: 4, name: 'Thursday', abbr: 'THU' },
    { id: 5, name: 'Friday', abbr: 'FRI' },
  ];
  allClass: any = [];
  scheduledClass: any = [];
  availableClass: any = [];
  classYear: any;
  searchAvailable:any = null;
  searchSchedule:any = null;
  searchBy:any = "gradeLevelName";
  selectedSearch:any = [
    {id:'sectionName', text:'Section'},
    {id:'gradeLevelName', text: 'Grade Level'},
    {id:'adviserName', text: 'Adviser'},
  ]
  unfilterAvailable:any = [];

  constructor(public adminService: AdminServiceService) {

  }

  ngOnInit(): void {
    this.getScheduledClass();
  }
  nClassSearch(e:any){
    console.log(this.searchBy);
    if(this.searchAvailable === null){
      this.availableClass = this.unfilterAvailable;
    }else{
      let res = this.unfilterAvailable.filter((item:any)=>item[this.searchBy].toLowerCase().includes(this.searchAvailable.toLowerCase()));
        this.availableClass = res;
    }
  }
  async getScheduledClass() {

    await this.adminService.getActiveSy().subscribe(activeYear => {
      this.classYear = activeYear[0];
      this.availableClass = [];
      this.scheduledClass = [];
      this.allClass = [];
      this.unfilterAvailable = [];

      // all class
      this.adminService.nGetClassByYearId(this.classYear.id).subscribe(cs => {
        this.allClass = cs;
        this.adminService.nGetSchedule(this.classYear.id).subscribe(cs => {
          console.log(cs);
          this.scheduledClass = cs;
          let foundSchedule:any = [];
          let userClass:any = [];
          this.allClass.map((cls:any,index:any)=>{
            const isFound = this.scheduledClass.find((sls:any)=> sls.id === cls.id);
            if(!isFound){
              this.unfilterAvailable.push(this.allClass[index]);
            }else{
              userClass.push(this.allClass[index]);
            }
          });
          this.scheduledClass = userClass;
          this.availableClass = this.unfilterAvailable;

          console.log(this.availableClass);
        });
      });
    });
  }

}
