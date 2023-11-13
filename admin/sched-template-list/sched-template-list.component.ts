import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-sched-template-list',
  templateUrl: './sched-template-list.component.html',
  styleUrls: ['./sched-template-list.component.scss']
})
export class SchedTemplateListComponent implements OnInit {
  templateList: any;
  tempDetails:any;
  tempRow:any;
  tempDel:any;
  constructor(
    public adminService: AdminServiceService,
    public dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.adminService.nGetHead().subscribe((res: any) => {
      this.templateList = res;
    })
  }
  viewTemp(tempName:any,tempInfo:any){
    this.tempDetails = tempInfo;
    this.adminService.nGetSchedTempById(tempInfo.id).subscribe((res:any)=>{
        this.tempRow = res;
        
        this.tempRow.sort((a:any, b:any) => parseFloat(a.id) - parseFloat(b.id));
    })
    this.dialog.open(tempName,{width:'108vh'});
  }
  setInactiveState(e: any) {
    if (this.templateList.length > 2) {
      let notE = e.isActive;
      e.isActive = !notE;
      console.log(e);
      this.adminService.nAddHead(e.id, e).then(() => {
        console.log('done');
      });

    }
  }
  delTemp(tempName:any,e:any){
    this.tempDel = e;
    this.dialog.open(tempName,{width:'54vh'});
  }
  delYes(){
    this.adminService.deleteTemp(this.tempDel);
  }


}
