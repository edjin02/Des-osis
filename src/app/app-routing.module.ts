import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurriculumComponent } from './admin/curriculum/curriculum.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { GradeLevelComponent } from './admin/grade-level/grade-level.component';
import { NCurriculumComponent } from './admin/n-curriculum/n-curriculum.component';
import { NRoomClassComponent } from './admin/n-room-class/n-room-class.component';
import { NSubjecsComponent } from './admin/n-subjecs/n-subjecs.component';
import { NTeacherClassComponent } from './admin/n-teacher-class/n-teacher-class.component';
import { RoomAssignFormComponent } from './admin/room-assign-form/room-assign-form.component';
import { RoomAssignComponent } from './admin/room-assign/room-assign.component';
import { SchedTemplateListComponent } from './admin/sched-template-list/sched-template-list.component';
import { ScheduleFormComponent } from './admin/schedule-form/schedule-form.component';
import { ScheduleTemplateComponent } from './admin/schedule-template/schedule-template.component';
import { ScheduleComponent } from './admin/schedule/schedule.component';
import { StudentMasterComponent } from './admin/student-master/student-master.component';
import { SubjectsComponent } from './admin/subjects/subjects.component';
import { SyComponent } from './admin/sy/sy.component';
import { TeacherMasterInfoComponent } from './admin/teacher-master-info/teacher-master-info.component';
import { TeacherMasterComponent } from './admin/teacher-master/teacher-master.component';
import { UsersComponent } from './admin/users/users.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { StudentClassDetailsComponent } from './student/student-class-details/student-class-details.component';
import { StudentClassInfoComponent } from './student/student-class-info/student-class-info.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { StudentProfileComponent } from './student/student-profile/student-profile.component';
import { TeacherClassDetailsComponent } from './teacher/teacher-class-details/teacher-class-details.component';
import { TeacherClassInfoComponent } from './teacher/teacher-class-info/teacher-class-info.component';
import { TeacherClassComponent } from './teacher/teacher-class/teacher-class.component';
import { TeacherDashboardComponent } from './teacher/teacher-dashboard/teacher-dashboard.component';
import { EnrollFormComponent } from './auth/enroll-form/enroll-form.component';
import { EnrollListComponent } from './admin/enroll-list/enroll-list.component';
import { EnrollViewComponent } from './admin/enroll-view/enroll-view.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'enroll', component: EnrollFormComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'admin/users', component: UsersComponent },
  { path: 'admin/grade-level', component: GradeLevelComponent },
  { path: 'admin/subjects', component: SubjectsComponent },
  { path: 'admin/new-subjects', component: NSubjecsComponent },
  { path: 'admin/view-curriculum/:id', component: NCurriculumComponent },
  { path: 'admin/new-assign/:id', component: NTeacherClassComponent },
  { path: 'admin/new-room/:gradeId/:classId', component: NRoomClassComponent },
  { path: 'admin/student', component: StudentMasterComponent },
  { path: 'admin/enroll', component: EnrollListComponent },
  { path: 'admin/enroll-view/:id', component: EnrollViewComponent },
  { path: 'admin/school-year', component: SyComponent },
  { path: 'admin/curriculum', component: CurriculumComponent },
  { path: 'admin/schedule', component: ScheduleComponent },
  { path: 'admin/schedule-template-list', component: SchedTemplateListComponent },
  { path: 'admin/schedule-template/:id', component: ScheduleTemplateComponent },
  { path: 'admin/schedule-create/:id/:type', component: ScheduleFormComponent },
  { path: 'admin/room-assign', component: RoomAssignComponent },
  { path: 'admin/room-assign/new/:id/:name/:yearId', component: RoomAssignFormComponent },
  { path: 'admin/teacher', component: TeacherMasterComponent },
  { path: 'admin/teacher/info/:id', component: TeacherMasterInfoComponent },
  /* Teacher Module */
  { path: 'teacher/dashboard', component: TeacherClassComponent },
  { path: 'teacher/subjects', component: TeacherClassInfoComponent },
  { path: 'teacher/subjects/details/:subjId/:classId', component: TeacherClassDetailsComponent },
  /* Student Module */
  { path: 'student/dashboard', component: StudentClassInfoComponent },
  { path: 'student/subjects', component: StudentClassDetailsComponent },
  { path: 'student/profile', component: StudentProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
