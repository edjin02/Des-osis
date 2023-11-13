import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { SubjectsComponent } from './admin/subjects/subjects.component';
import { GradeLevelComponent } from './admin/grade-level/grade-level.component';
import { SyComponent } from './admin/sy/sy.component';
import { RoomAssignComponent } from './admin/room-assign/room-assign.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AdminNavComponent } from './component/admin-nav/admin-nav.component';
import { AdminHeadComponent } from './component/admin-head/admin-head.component';
import { environment } from '../environments/environment';
import { UserFormComponent } from './dialog/user-form/user-form.component';
import { GradelevelFormComponent } from './dialog/gradelevel-form/gradelevel-form.component';
import { SchoolYearFormComponent } from './dialog/school-year-form/school-year-form.component';
import { AdminSubjectComponent } from './dialog/admin-subject/admin-subject.component';
import { SubjectFilterDialogComponent } from './dialog/subject-filter-dialog/subject-filter-dialog.component';
import { UserModuleFormComponent } from './dialog/user-module-form/user-module-form.component';
import { TeacherMasterComponent } from './admin/teacher-master/teacher-master.component';
import { StudentMasterComponent } from './admin/student-master/student-master.component';
import { TeacherMasterInfoComponent } from './admin/teacher-master-info/teacher-master-info.component';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { RoomAssignFormComponent } from './admin/room-assign-form/room-assign-form.component';
import { AdviserDialogComponent } from './dialog/adviser-dialog/adviser-dialog.component';
import { SubjectAdviserDialogComponent } from './dialog/subject-adviser-dialog/subject-adviser-dialog.component';
import { SubjectStudentDialogComponent } from './dialog/subject-student-dialog/subject-student-dialog.component';
import { StudentBulkPreviewComponent } from './dialog/student-bulk-preview/student-bulk-preview.component';
import { UserInfoWindowComponent } from './dialog/user-info-window/user-info-window.component';
import { SuccessDialogComponent } from './dialog/success-dialog/success-dialog.component';
import { TeacherClassComponent } from './teacher/teacher-class/teacher-class.component';
import { TeacherDashboardComponent } from './teacher/teacher-dashboard/teacher-dashboard.component';
import { TeacherClassInfoComponent } from './teacher/teacher-class-info/teacher-class-info.component';
import { TeacherHeadComponent } from './component/teacher-head/teacher-head.component';
import { TeacherNavComponent } from './component/teacher-nav/teacher-nav.component';
import { TeacherClassDetailsComponent } from './teacher/teacher-class-details/teacher-class-details.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { StudentClassInfoComponent } from './student/student-class-info/student-class-info.component';
import { StudentClassDetailsComponent } from './student/student-class-details/student-class-details.component';
import { StudentProfileComponent } from './student/student-profile/student-profile.component';
import { TeacherProfileComponent } from './teacher/teacher-profile/teacher-profile.component';
import { StudentHeadComponent } from './component/student-head/student-head.component';
import { StudentNavComponent } from './component/student-nav/student-nav.component';
import { StudentGradesComponent } from './admin/student-grades/student-grades.component';
import { StudentGradesDetailsComponent } from './admin/student-grades-details/student-grades-details.component';
import { StudentGradeFormComponent } from './admin/student-grade-form/student-grade-form.component';
import { StudentViewGradeComponent } from './dialog/student-view-grade/student-view-grade.component';
import { CurriculumComponent } from './admin/curriculum/curriculum.component';
import { ScheduleComponent } from './admin/schedule/schedule.component';
import { AdminCurriculumComponent } from './dialog/admin-curriculum/admin-curriculum.component';
import { NSubjecsComponent } from './admin/n-subjecs/n-subjecs.component';
import { NCurriculumComponent } from './admin/n-curriculum/n-curriculum.component';
import { NTeacherClassComponent } from './admin/n-teacher-class/n-teacher-class.component';
import { NRoomClassComponent } from './admin/n-room-class/n-room-class.component';
import { ScheduleFormComponent } from './admin/schedule-form/schedule-form.component';
import { ScheduleTemplateComponent } from './admin/schedule-template/schedule-template.component';
import { SchedTemplateListComponent } from './admin/sched-template-list/sched-template-list.component';
import { ScheduleClassViewComponent } from './admin/schedule-class-view/schedule-class-view.component';
import { EnrollFormComponent } from './auth/enroll-form/enroll-form.component';
import { EnrollListComponent } from './admin/enroll-list/enroll-list.component';
import { EnrollViewComponent } from './admin/enroll-view/enroll-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    UsersComponent,
    SubjectsComponent,
    GradeLevelComponent,
    SyComponent,
    RoomAssignComponent,
    AdminNavComponent,
    AdminHeadComponent,
    UserFormComponent,
    GradelevelFormComponent,
    SchoolYearFormComponent,
    AdminSubjectComponent,
    SubjectFilterDialogComponent,
    UserModuleFormComponent,
    TeacherMasterComponent,
    StudentMasterComponent,
    TeacherMasterInfoComponent,
    ConfirmDialogComponent,
    RoomAssignFormComponent,
    AdviserDialogComponent,
    SubjectAdviserDialogComponent,
    SubjectStudentDialogComponent,
    StudentBulkPreviewComponent,
    UserInfoWindowComponent,
    SuccessDialogComponent,
    TeacherClassComponent,
    TeacherDashboardComponent,
    TeacherClassInfoComponent,
    TeacherHeadComponent,
    TeacherNavComponent,
    TeacherClassDetailsComponent,
    StudentDashboardComponent,
    StudentClassInfoComponent,
    StudentClassDetailsComponent,
    StudentProfileComponent,
    TeacherProfileComponent,
    StudentHeadComponent,
    StudentNavComponent,
    StudentGradesComponent,
    StudentGradesDetailsComponent,
    StudentGradeFormComponent,
    StudentViewGradeComponent,
    CurriculumComponent,
    ScheduleComponent,
    AdminCurriculumComponent,
    NSubjecsComponent,
    NCurriculumComponent,
    NTeacherClassComponent,
    NRoomClassComponent,
    ScheduleFormComponent,
    ScheduleTemplateComponent,
    SchedTemplateListComponent,
    ScheduleClassViewComponent,
    EnrollFormComponent,
    EnrollListComponent,
    EnrollViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    DragDropModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    BrowserAnimationsModule,MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,MatRadioModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatSortModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
