import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-teacher-head',
  templateUrl: './teacher-head.component.html',
  styleUrls: ['./teacher-head.component.scss']
})
export class TeacherHeadComponent implements OnInit {
  teacherSession:any = null;
  constructor(public auth:AuthServiceService,
    public router:Router) { }

  ngOnInit(): void {

    this.teacherSession = this.auth.currentSession;
  }
  logOut(){
    this.auth.destroySession();
    this.router.navigate(['/']);
  }

}
