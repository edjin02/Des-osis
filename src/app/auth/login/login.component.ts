import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUser: any = null;
  loginPassword: any = null;
  loginError = false;
  loginData: any = null;
  constructor(
    public authService: AuthServiceService,
    public router: Router,
    public fs: AngularFirestore
  ) { }

  ngOnInit(): void {
    if (this.authService.currentSession !== null) {
      this.loginRedirect(this.authService.currentSession);
    }

  }
  loginInfo() {
    this.authService.loginEmail(this.loginUser).subscribe(e => {
      let dataInfo = e[0];
      //console.logg(dataInfo);
      if (dataInfo?.password === this.loginPassword) {
        let logId = this.fs.createId();
        let uLog = {
          userId: dataInfo?.id,
          userFullName: dataInfo?.firstName + ' ' + dataInfo?.lastName,
          userEmail: dataInfo?.email,
          logInfo: 'Login',
          logDate: new Date().toISOString()
        };
        let uL = this.fs.collection<any>('usersLogs');
        uL.doc(logId).set(uLog);

        this.loginRedirect(dataInfo);
      } else {
        this.loginError = true;
      }
    })
  }
  loginRedirect(data: any) {
    this.loginData = data;
    /* save session */
    let navigate = "";
    if (this.loginData.userType === "Admin") {
      navigate = "/admin/dashboard";
    } else if (this.loginData.userType === "Student") {
      navigate = "/student/dashboard";
    } else if (this.loginData.userType === "Teacher") {
      navigate = "/teacher/dashboard";
    } else {
      navigate = "/guardian/dashboard";
    }
    this.authService.saveSession(JSON.stringify(data));
    this.router.navigate([navigate]);
  }
}
