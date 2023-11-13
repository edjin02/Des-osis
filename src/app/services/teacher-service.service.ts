import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherServiceService {

  classCol:any = 'class';
  studentClass:any = 'studentClass';
  teacherCol:any = 'teachers';
  subjectGrades:any = 'subjectGrades';

  constructor(public firestore: AngularFirestore) { }
  getTeacherInfo(userId:any){
    return this.firestore.collection(this.teacherCol,ref=> ref.where('userId','==', userId)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data:any = a.payload.doc.data();
        return {...data};
      })));
  }

  getClassAdvisory(id:any){
    return this.firestore.collection(this.classCol,ref=> ref.where('adviserId','==', id)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data:any = a.payload.doc.data();
        return {...data};
      })));
  }
  getSubjectList(id:any){
    return this.firestore.collection(this.studentClass,ref=> ref.where('teacherId','==', id)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data:any = a.payload.doc.data();
        return {...data};
      })));
  }
  getSubjectClassInfo(teacherId:any,id:any,classId:any){
    return this.firestore.collection(this.studentClass,ref=> ref.where('teacherId','==', teacherId)
    .where('id','==',id).where('classId','==',classId)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data:any = a.payload.doc.data();
        return {...data};
      })));
  }
  getClassInfoById(classId:any){
    return this.firestore.doc<any>(this.classCol+'/'+classId
      ).snapshotChanges().pipe(map((changes:any) => {
        const data = changes.payload.data();
        const id = changes.payload.id;
        return { id, ...data };
      }));
  }
  getGrades(classId:any, syId:any, subjId:any){
    return this.firestore.collection(this.subjectGrades,
      ref=> ref
      .where('classId','==', classId)
      .where('subjectId','==',subjId)
      .where('schoolYearId','==',syId))
      .snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data:any = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {...data, stgId: id};
      })));
  }
  saveSubjGrade(data:any){
    const subjectsInput = this.firestore.collection(this.subjectGrades);
    return subjectsInput.add(data);
  }
  updateSubjGrade(id: any, data: any) {
    let subjGrade = this.firestore.collection(this.subjectGrades);
    return subjGrade.doc(id).set(data);
  }
}
