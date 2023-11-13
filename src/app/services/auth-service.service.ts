import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  currentSession: any = null;
  activeSySession:any = null;
  usersCol: any = 'users';

  constructor(public firestore: AngularFirestore) {
    let stringSession = localStorage.getItem('dilaInfo');
    if(stringSession!== null){
      this.currentSession = JSON.parse(stringSession);
    }
  }
  activeYearSession(){
    return this.firestore
    .collection('sy', (ref) => ref.where('status', '==', 'Active'))
    .snapshotChanges()
    .pipe(
      map((actions) =>
        actions.map((a) => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  loginEmail(email:string): Observable<any>{
    return this.firestore
    .collection(this.usersCol, (ref) => ref.where('email', '==', email))
    .snapshotChanges()
    .pipe(
      map((actions) =>
        actions.map((a) => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id,...data};
        })
      )
    );
  }
  saveSession(dataInfo:any){
    localStorage.setItem('dilaInfo',dataInfo);
    this.activeYearSession().subscribe((res:any)=>{
      localStorage.setItem('activeYear', JSON.stringify(res[0]));
    });
    this.currentSession = JSON.parse(dataInfo);
  }
  destroySession(){
    localStorage.removeItem('dilaInfo');
    this.currentSession = null;
  }

}
