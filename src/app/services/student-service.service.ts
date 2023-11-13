import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  constructor(public firestore: AngularFirestore) { }

  classCol:any = 'class';
  studentClass:any = 'studentClass';
  teacherCol:any = 'teachers';
  subjectGrades:any = 'subjectGrades';
  assignedStudent:any = 'assignedStudent';
  students:any = 'students';

  getMyClass(syId:any,studentId:any){
    return this.firestore.collection(this.assignedStudent,
      ref=> ref
      .where('studentId', '==', studentId)
      .where('schoolYearId', '==', syId))
      .snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data:any = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {...data, assignedId: id};
      })));
  }
  getClassDetails(classId:any){
    return this.firestore.doc<any>(this.classCol+'/'+classId
    ).snapshotChanges().pipe(map((changes:any) => {
      const data = changes.payload.data();
      const id = changes.payload.id;
      return { id, ...data };
    }));
  }
  getStudentInfo(userId:any){
    return this.firestore
    .collection(this.students, (ref) => ref.where('userId', '==', userId))
    .snapshotChanges()
    .pipe(
      map((actions) =>
        actions.map((a) => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data ,isSelected: false};
        })
      )
    );
  }
  getStudentGrades(classId:any, subjectId:any, studentId:any ){
    return this.firestore
    .collection(this.subjectGrades, (ref) => ref
    .where('id', '==', studentId)
    .where('subjectId', '==', subjectId)
    .where('classId', '==', classId)
    )
    .snapshotChanges()
    .pipe(
      map((actions) =>
        actions.map((a) => {
          const data: any = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data ,isSelected: false};
        })
      )
    );
  }


}
