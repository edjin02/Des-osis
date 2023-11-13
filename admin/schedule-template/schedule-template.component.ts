import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule-template',
  templateUrl: './schedule-template.component.html',
  styleUrls: ['./schedule-template.component.scss']
})
export class ScheduleTemplateComponent implements OnInit {
  schedRow: any;
  fromMin: any = "";
  timeFrom: any = "";
  timeTo: any = "0";
  timeSelected: boolean = true;
  schedInfo: any = [{
    id: 1, timeFrom: "", timeTo: "", isValid: true, isSelected: true, fromSelected: false,prevSelected: true,
  }, {
    id: 2, timeFrom: "", timeTo: "", isValid: true, isSelected: false, fromSelected: false,prevSelected: false,
  }, {
    id: 3, timeFrom: "", timeTo: "", isValid: true, isSelected: false, fromSelected: false,prevSelected: false,
  }, {
    id: 4, timeFrom: "", timeTo: "", isValid: true, isSelected: false, fromSelected: false,prevSelected: false,
  }, {
    id: 4, timeFrom: "", timeTo: "", isValid: true, isSelected: false, fromSelected: false,prevSelected: false,
  }, {
    id: 4, timeFrom: "", timeTo: "", isValid: true, isSelected: false, fromSelected: false,prevSelected: false,
  }, {
    id: 4, timeFrom: "", timeTo: "", isValid: true, isSelected: false, fromSelected: false,prevSelected: false,
  }, {
    id: 4, timeFrom: "", timeTo: "", isValid: true, isSelected: false, fromSelected: false,prevSelected: false,
  }, {
    id: 4, timeFrom: "", timeTo: "", isValid: true, isSelected: false, fromSelected: false,prevSelected: false,
  },];
  minTime: any = "0";
  addedTime: any;
  templateName: any = null;
  templateId:any;
  constructor(public adminService: AdminServiceService,public route:Router) { }

  ngOnInit(): void {
  }
  getValue(val: any, ev: any, i: any) {

    let info = ev.target.value;
    let splitMin = info.split(":");
    let getHour = parseInt(splitMin[0]);

    // from
    if (i === 0) {
      if (val === 'from') {
        if (getHour < 6) {
          this.schedInfo[i].timeFrom = "";
          this.schedInfo[i].isValid = false;
        } else if (getHour > 17) {
          this.schedInfo[i].timeFrom = "";
          this.schedInfo[i].isValid = false;
        } else {
          this.schedInfo[i].isValid = true;
          let toHour = getHour + 1;
          let res = "";
          if (toHour < 10) {
            res = "0" + toHour + ":" + splitMin[1];
          } else if (toHour > 23) {
            toHour = toHour - 24;
            res = "0" + toHour + ":" + splitMin[1];
          } else {
            res = toHour + ":" + splitMin[1];
          }
          this.schedInfo[i].fromSelected = true;
          
          this.schedInfo[i].timeTo = res;
          this.schedInfo[i].isSelected = true;
          this.schedInfo[i+1].prevSelected = true;

        }
      }else{
        
        this.schedInfo[i+1].prevSelected = true;
      }
    } else {
      if (val === 'from') {
        let prevFrom = this.schedInfo[i-1].timeTo;
        prevFrom = prevFrom.split(":");
        
        if (getHour < prevFrom[0]) {
          this.schedInfo[i].timeFrom = "";
          this.schedInfo[i].isValid = false;
        } else if (getHour > 17) {
          this.schedInfo[i].timeFrom = "";
          this.schedInfo[i].isValid = false;
        } else {
          this.schedInfo[i].isValid = true;
          let toHour = getHour + 1;
          let res = "";
          if (toHour < 10) {
            res = "0" + toHour + ":" + splitMin[1];
          } else if (toHour > 23) {
            toHour = toHour - 24;
            res = "0" + toHour + ":" + splitMin[1];
          } else {
            res = toHour + ":" + splitMin[1];
          }
          this.schedInfo[i].fromSelected = true;
          this.schedInfo[i].isSelected = true;
          this.schedInfo[i].timeTo = res;
          this.schedInfo[i+1].prevSelected = true;
        }
      }else{
        
        this.schedInfo[i+1].prevSelected = true;
      }
    }
    // to
    // SPLIT PARSE INT
    //GET VALUE IF MIN 8AM and MAX 5PM
    //return false if lower or higher
  }
  getMe(i: any) {
    
  }
  addTime(ev: any) {
    let info = ev.target.value;
    let splitMin = info.split(":");
    let i = parseInt(splitMin[0]) + 1;
    let res = "";
    if (i < 10) {
      res = "0" + i + ":" + splitMin[1];
    } else if (i > 23) {
      i = i - 24;
      res = "0" + i + ":" + splitMin[1];
    }
    else {
      res = i + ":" + splitMin[1];;
    }
    // DATE VAL
    let valDate = new Date(ev.target.valueAsDate).toUTCString();
    let valueDate = new Date(valDate);
    
    valueDate.setHours(valueDate.getHours() + 1);
    let formatTime = formatDate(valueDate, 'shortTime', 'en_PH');
    
    this.minTime = res;
    this.timeTo = res;
  }
  addtoSched() {
    let genId = this.adminService.generateId();
    let payload = {
      id: genId,
      timeFrom: this.timeFrom,
      timeTo: this.timeTo,
      mon: null,
      tue: null,
      wed: null,
      thu: null,
      fri: null,
    }
    this.schedInfo.push(payload);
    
  }
  saveSched(){
    this.templateId = this.adminService.generateId();
    let filterPayload = this.schedInfo.filter((e:any)=>{
      if(e.isSelected === true){
        e.templateId = this.templateId,  
        e.templateName = this.templateName
        return e;
      }
    });

    // promise addSched
    this.adminService.nAddHead(this.templateId,{id:this.templateId, tempName: this.templateName, isActive: true});

    let promiseSched:any = [];
    for (let index = 0; index < filterPayload.length; index++) {
      let info = filterPayload[index];
      info.schedId = this.adminService.generateId();
      promiseSched.push(this.adminService.nAddTemplate(info.schedId,info));
    }
    Promise.allSettled(promiseSched).finally(()=>{
      console.log('done');
      this.route.navigate(['/admin/schedule-template-list']);
    })
  }


}
