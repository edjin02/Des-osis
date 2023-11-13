import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-admin-head',
  templateUrl: './admin-head.component.html',
  styleUrls: ['./admin-head.component.scss']
})
export class AdminHeadComponent implements OnInit {
  adminSession: any = null;
  activeSy:any;
  constructor(public auth:AuthServiceService,
    public fs:AngularFirestore,
    public router:Router) { }

  ngOnInit(): void {
   //console.logg(this.auth.currentSession);
    this.adminSession = this.auth.currentSession;
    this.getActiveSchoolYear();
  }
  async getActiveSchoolYear(){
    let sySub = this.fs.collection<any>('sy',ref => ref.where('status','==','Active')).valueChanges();
    await sySub.subscribe((res:any)=>{
      this.activeSy = res[0];
    });
    
  }
  logOut(){
    this.auth.destroySession();
    this.router.navigate(['/']);
  }

}
