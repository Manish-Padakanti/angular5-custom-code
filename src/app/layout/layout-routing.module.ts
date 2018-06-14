import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
			{ path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
            { path: 'news', loadChildren: './news/news.module#NewsModule' },
            { path: 'attendance', loadChildren: './attendance/attendance.module#AttendanceModule' },
            { path: 'create-class', loadChildren: './create-class/create-class.module#CreateClassModule' },
            { path: 'class-home', loadChildren: './class-home/class-home.module#ClassModule' },
            { path: 'subject-list', loadChildren: './subject-list/subject-list.module#SubjectListModule' },
            { path: 'exam-list', loadChildren: './exam-list/exam-list.module#ExamListModule' },
            { path: 'teacher-home', loadChildren: './teacher-home/teacher-home.module#TeacherModule' },
            { path: 'send-notification', loadChildren: './send-notification/send-notification.module#NotificationModule' },
			{ path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            { path: 'view-teacher', loadChildren: './view-teacher/view-teacher.module#ViewTeacherModule' },
            { path: 'homework', loadChildren: './homework/homework.module#HomeworkModule' },
            { path: 'pending-homework', loadChildren: './pending-homework/pending-homework.module#PendingHomeworkModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
