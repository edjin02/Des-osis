import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-student-head',
  templateUrl: './student-head.component.html',
  styleUrls: ['./student-head.component.scss']
})
export class StudentHeadComponent implements OnInit {
  userSession:any = null;
  constructor(public auth:AuthServiceService,
    public router:Router) { }

  ngOnInit(): void {

    this.userSession = this.auth.currentSession;
  }
  logOut(){
    this.auth.destroySession();
    this.router.navigate(['/']);
  }
}
