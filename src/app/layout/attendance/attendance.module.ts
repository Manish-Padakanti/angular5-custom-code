import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NguCarouselModule } from '@ngu/carousel';
import { ModalDialogModule } from 'ngx-modal-dialog';
import {MatGridListModule} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { CalendarHeatmap } from 'angular2-calendar-heatmap';
import { CalendarModule } from 'angular-calendar';
import { MonthCalendarModule } from './components/calendar/monthCalendar.module';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance.component';
import { StatModule } from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        NguCarouselModule,
        AttendanceRoutingModule,
        StatModule,
        MatGridListModule,
        CalendarModule.forRoot(),
        MonthCalendarModule,
        Ng2Charts
    ],
    declarations: [
        AttendanceComponent,
        CalendarHeatmap
    ]
})
export class AttendanceModule {}
