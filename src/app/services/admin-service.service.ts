import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export interface SubjectModel {
  gradeLevelId: string;
  gradeLevelName: string;
  id: string;
  subjectCode: string;
  subjectDescription: string;
  subjectName: string;
}
@Injectable({
  providedIn: 'root',
})
export class AdminServiceService {
  gradeCol: any = 'gradeLevel';
  subjectCol: any = 'subjects';
  syCol: any = 'sy';
  usersCol: any = 'users';
  studentCol: any = 'students';
  teacherCol: any = 'teachers';
  teacherSubj: any = 'teacherSubj';
  classCol:any = 'class';
  studentClass:any = 'studentClass';

  constructor(public firestore: AngularFirestore) {}
  romanToNum(roman: any): any {
    if (roman === '') return 0;
    if (roman.startsWith('L')) return 50 + this.romanToNum(roman.substr(1));
    if (roman.startsWith('XL')) return 40 + this.romanToNum(roman.substr(2));
    if (roman.startsWith('X')) return 10 + this.romanToNum(roman.substr(1));
    if (roman.startsWith('IX')) return 9 + this.romanToNum(roman.substr(2));
    if (roman.startsWith('V')) return 5 + this.romanToNum(roman.substr(1));
    if (roman.startsWith('IV')) return 4 + this.romanToNum(roman.substr(2));
    if (roman.startsWith('I')) return 1 + this.romanToNum(roman.substr(1));
    return 0;
  }

  /* GRADES MODULE */
  getGradeLevelListing(): Observable<any[]> {
    return this.firestore
      .collection(this.gradeCol)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data: any = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data,
              num: this.romanToNum(data.gradeLevelName.split(' ').pop()), };
          }).sort((a, b) => a.num - b.num)
        )
      );
  }
  addGradeLevel(data: any) {
    const gradeLevel = this.firestore.collection(this.gradeCol);
    return gradeLevel.add(data);
  }
  // New Subject
  nSubjectListing(): Observable<any[]> {
    return this.firestore
      .collection<any>('nSubject')
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
  viewCurriculum(cId:any){
    return this.firestore.doc<any>('curriculum/'+cId).snapshotChanges().pipe(map((changes:any) => {
      const data = changes.payload.data();
      return { ...data };
    }));
  }
  viewTeachAssign(cId:any){
    return this.firestore.doc<any>('nAssign/'+cId).snapshotChanges().pipe(map((changes:any) => {
      const data = changes.payload.data();
      return { ...data };
    }));
  }
  addTeacherAssign(nData:any,teacherId:any){
    const subjectInfo = this.firestore.collection('nAssign');
    return subjectInfo.doc(teacherId).set(nData);
  }
  getActiveCurriculum(){
    return this.firestore.collection('curriculum',ref=> ref.where('isActive','==', true)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data:any = a.payload.doc.data();
        return { ...data};
      })));
  }
  saveGradeTeacherList(nData:any,id:any){
    const teacherLevel = this.firestore.collection('nTeacherLevel');
    return teacherLevel.doc(id).set(nData);
  }
  getGradeTeacherList(gradeLevelId:any){
    return this.firestore
      .collection<any>('nTeacherLevel',ref=> ref.where('id','==', gradeLevelId))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data: any = a.payload.doc.data();
            return { ...data };
          })
        )
      );
  }
  deleteCurriculum(id:any){
    this.firestore
    .collection('curriculum')
      .doc(id)
      .delete();
  }
  nAddSubject(data: any) {
    const nId = this.firestore.createId();
    data.id = nId;
    const subjectInfo = this.firestore.collection('nSubject');
    return subjectInfo.doc(nId).set(data);
  }
  /* SUBJECT MODULE */
  getSubjectListing(): Observable<any[]> {
    return this.firestore
      .collection<SubjectModel>(this.subjectCol)
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
  getSubjectByGradeId($id:string):Observable<any[]>{
    return this.firestore.collection(this.subjectCol,ref=> ref.where('gradeLevelId','==', $id)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data:any = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data, teacherFullName: null,teacherId: null};
      })));
  }
  addSubject(data: any) {
    const subjectInfo = this.firestore.collection(this.subjectCol);
    return subjectInfo.add(data);
  }
  /* USERS */
  getUserListing(): Observable<any[]> {
    return this.firestore
      .collection(this.usersCol)
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
  addUser(data: any) {
    const userInfo = this.firestore.collection(this.usersCol);
    return userInfo.add(data);
  }
  updateUser(id: any, data: any) {
    let trCol = this.firestore.collection(this.usersCol);
    return trCol.doc(id).set(data);
  }
  updateInfoByUserId(id: any, data: any, userType:any) {
    let collection = null;
    if(userType === 'Teacher'){
      collection = this.teacherCol;
    }else{
      collection = this.studentCol;
    }
    let trCol = this.firestore.collection(collection);
    return trCol.doc(id).set(data);
  }
  getStudentInfoByLrn(lrn:any){
    return this.firestore
    .collection(this.studentCol, (ref) => ref.where('controllNumber', '==', lrn))
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
  getEnrollmentStatus(){
    return this.firestore
    .collection('siteSettings', (ref) => ref.where('id', '==', '4IMLBLTQxi17tdnyVhEb'))
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
  setEnrollmentStatus(status:any){
    let data = {
      id: "4IMLBLTQxi17tdnyVhEb",
      type: "enrollment",
      active:status
    }
    let trCol = this.firestore.collection('siteSettings');
    return trCol.doc('4IMLBLTQxi17tdnyVhEb').set(data);
  }
  getStudentInfoByFullName(lastN:any,firstN:any){
    return this.firestore
    .collection(this.studentCol, (ref) => ref.where('lastName', '==', lastN).where('firstName', '==', firstN))
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
  getStudentInfoByUserId(userId:any){
    return this.firestore
    .collection(this.studentCol, (ref) => ref.where('userId', '==', userId))
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
  getUserDetails(id:any){
    return this.firestore.doc<any>(this.usersCol+'/'+id
      ).snapshotChanges().pipe(map((changes:any) => {
        const data = changes.payload.data();
        const id = changes.payload.id;
        return { id, ...data };
      }));
  }
  getInfoByUserId(userId: any, userType:any){
    let collection = null;
    if(userType === 'Teacher'){
      collection = this.teacherCol;
    }else{
      collection = this.studentCol;
    }
    return this.firestore
    .collection(collection, (ref) => ref.where('userId', '==', userId))
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
  getUserEmail(email:any){
    return this.firestore
    .collection(this.usersCol, (ref) => ref.where('email', '==', email))
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
  /* STUDENT */
  addStudent(data: any) {
    const studentInfo = this.firestore.collection(this.studentCol);
    return studentInfo.add(data);
  }
  updateStudent(id: any, data: any) {
    let trCol = this.firestore.collection(this.studentCol);
    trCol.doc(id).set(data);
  }
  /* TEACHER */
  addTeacher(data: any) {
    const studentInfo = this.firestore.collection(this.teacherCol);
    return studentInfo.add(data);
  }
  updateTeacher(id: any, data: any) {
    let trCol = this.firestore.collection(this.teacherCol);
    trCol.doc(id).set(data);
  }
  getTeacherInfo($id: any): Observable<any[]> {
    return this.firestore
      .collection(this.teacherCol, (ref) => ref.where('userId', '==', $id))
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
  addTeacherSubj(teacher:any ,data: any) {
    const subjTeacher = this.firestore.collection(this.teacherSubj);
    return subjTeacher.doc(teacher).set({subjects: data});
  }
  deleleteRecord(id:any){
    this.firestore
    .collection(this.teacherSubj)
      .doc(id)
      .delete();
  }
  getTeacherSubjListing(): Observable<any[]>{
    return this.firestore
      .collection(this.teacherSubj)
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
  getTeacherListing(): Observable<any[]> {
    return this.firestore
      .collection(this.teacherCol)
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
  getStudentListing(): Observable<any[]> {
    return this.firestore
      .collection(this.studentCol)
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
  /* CLASS */
  getClassListing():Observable<any[]>{
    return this.firestore
      .collection(this.classCol)
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
  createClass(id: any, data: any) {
    let trCol = this.firestore.collection(this.classCol);
    return trCol.doc(id).set(data);
  }
  saveCurriculum(curiculumData:any,createdId:any){
    let curCol = this.firestore.collection('curriculum');
    return curCol.doc(createdId).set(curiculumData);
  }
  getAllCurriculum(){
    return this.firestore
      .collection('curriculum')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data: any = a.payload.doc.data();
            return { ...data };
          })
        )
      );
  }
  saveSubjectClass(){

  }
  getStudentByGradeLevel(glevelId:any){
    return this.firestore
    .collection(this.studentCol, (ref) => ref.where('gradeLevelId', '==', glevelId))
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
  addTeacherClass(data: any) {
    const gradeLevel = this.firestore.collection(this.studentClass);
    return gradeLevel.add(data);
  }
  assignedStudentClass(data:any){
    const gradeLevel = this.firestore.collection('assignedStudent');
    return gradeLevel.add(data);
  }
  getAssignedStudent(syId:any){
    return this.firestore
    .collection('assignedStudent', (ref) => ref.where('schoolYearId', '==', syId))
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
  getClassBySy(syId:any){
    return this.firestore
    .collection(this.classCol, (ref) => ref.where('schoolYearId', '==', syId))
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

  /* GetSY */
  getSyListing():Observable<any[]>{
    return this.firestore
      .collection(this.syCol)
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
  addSy(data: any) {
    const gradeLevel = this.firestore.collection(this.syCol);
    return gradeLevel.add(data);
  }
  updateSy(id: any, data: any) {
    let trCol = this.firestore.collection(this.syCol);
    return trCol.doc(id).set(data);
  }
  getActiveSy(){
    return this.firestore
    .collection(this.syCol, (ref) => ref.where('status', '==', 'Active'))
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
  generateId(){
    return this.firestore.createId();
  }
  nSaveClass(id:any,data:any){
    let trCol = this.firestore.collection('nRoomClass');
    return trCol.doc(id).set(data);
  }
  nGetClass(id:any){
    return this.firestore
    .collection('nRoomClass', (ref) => ref.where('id', '==', id))
    .snapshotChanges()
    .pipe(
      map((actions) =>
        actions.map((a) => {
          const data: any = a.payload.doc.data();
          return { ...data };
        })
      )
    );
  }
  nGetClassByYearId(yearId:any){
    return this.firestore
    .collection('nRoomClass', (ref) => ref.where('schoolYearId', '==', yearId).where('active','==',true))
    .snapshotChanges()
    .pipe(
      map((actions) =>
        actions.map((a) => {
          const data: any = a.payload.doc.data();
          return { ...data };
        })
      )
    );
  }
  nGetSchedule(yearId:any){
    return this.firestore
    .collection('nSchedule', (ref) => ref.where('schoolYearId', '==', yearId))
    .snapshotChanges()
    .pipe(
      map((actions) =>
        actions.map((a) => {
          const data: any = a.payload.doc.data();
          return { ...data };
        })
      )
    );
  }
  nGetScheduleById(id:any){
    return this.firestore
    .collection('nSchedule', (ref) => ref.where('id', '==', id))
    .snapshotChanges()
    .pipe(
      map((actions) =>
        actions.map((a) => {
          const data: any = a.payload.doc.data();
          return { ...data };
        })
      )
    );
  }
  nAddSchedule(id:any, data:any){
    let trCol = this.firestore.collection('nSchedule');
    return trCol.doc(id).set(data);
  }
  
  nAddHead(id:any, data:any){
    let trCol = this.firestore.collection('nSchedHead');
    return trCol.doc(id).set(data);
  }
  nGetHead(){
    return this.firestore
    .collection('nSchedHead')
    .snapshotChanges()
    .pipe(
      map((actions) =>
        actions.map((a) => {
          const data: any = a.payload.doc.data();
          return { ...data };
        })
      )
    );
  }
  deleteTemp(id:any){
    this.firestore
    .collection('nSchedHead')
      .doc(id)
      .delete();
  }
  nAddTemplate(id:any, data:any){
    let trCol = this.firestore.collection('nSchedTemp');
    return trCol.doc(id).set(data);
  }
  nGetSchedTempById(id:any){
    return this.firestore
    .collection('nSchedTemp', (ref) => ref.where('templateId', '==', id))
    .snapshotChanges()
    .pipe(
      map((actions) =>
        actions.map((a) => {
          const data: any = a.payload.doc.data();
          return { ...data };
        })
      )
    );
  }
  nGetSched(){
    return this.firestore
    .collection('nSchedTemp')
    .snapshotChanges()
    .pipe(
      map((actions) =>
        actions.map((a) => {
          const data: any = a.payload.doc.data();
          return { ...data };
        })
      )
    );
  }
  ngGetAssignTeacher(){
    return this.firestore.collection('nAssign').snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data: any = a.payload.doc.data();
          return { ...data };
        })
      ));
  }
  
}
