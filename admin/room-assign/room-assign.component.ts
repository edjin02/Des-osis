import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-room-assign',
  templateUrl: './room-assign.component.html',
  styleUrls: ['./room-assign.component.scss']
})
export class RoomAssignComponent implements OnInit {

  gradeList:any = [];
  classList:any = [];
  classYear:any = null;
  classView:any;

  constructor(
    public adminService: AdminServiceService,
    public router:Router,
    public modal: MatDialog) { }

  ngOnInit(): void {
    /* GET GRADE */
    this.adminService.getGradeLevelListing().subscribe(e=>{

      this.adminService.getActiveSy().subscribe(activeYear=>{
        this.gradeList = e;
        this.classYear = activeYear[0];
        this.adminService.nGetClassByYearId(this.classYear.id).subscribe(cs=>{
          this.classList = cs;
          this.gradeList.map((gr:any)=>{
            gr.classList = [];
            var gradeClass = this.classList.filter((cls:any)=> { if(cls.gradeLevelId === gr.id) { return cls}});
            if(gradeClass){
              gr.classList = gradeClass;
            }
          });
         //console.logg(this.gradeList);
        })
      });

    });
    /* GET CLASS / SECTION */
    /* ASSIGN CLASS per GRADE */
  }

  view(template:any,viewData:any){
    console.log(viewData);
    this.classView = viewData;
    this.modal.open(template,{
      width: '108vh',
      data: {
        view:viewData,
      }
    })
  }
  editMe(gradeLevelId:any, classId:any){
    console.log(gradeLevelId,classId);
    this.modal.closeAll();
    this.router.navigate(['/admin/new-room',gradeLevelId,classId]);
  }
  printMe() {
    const printArea = document.getElementById('printclasstable');
    if (printArea) {
      const clonedNode = printArea.cloneNode(true) as HTMLElement;
      const popWin = window.open('', '_blank');
      if (popWin) {
        popWin.document.open();
        popWin.document.write('<html><head><title>Print</title>');
        popWin.document.write('<style>');
        popWin.document.write(window.document.head.innerHTML); // Copies the CSS styles from the current document
        popWin.document.write('</style>');
        popWin.document.write('</head><body>');
        popWin.document.write(clonedNode.outerHTML);
        popWin.document.write('</body></html>');
        popWin.document.close();
        popWin.print();
      }
    }
  }

}
