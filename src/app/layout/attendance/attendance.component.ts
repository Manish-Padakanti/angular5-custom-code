import { Component, OnInit, ViewChild,  ChangeDetectionStrategy,ViewEncapsulation } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators/map';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format
} from 'date-fns';
import { Observable } from 'rxjs/Observable';
import { routerTransition } from '../../router.animations';

export const colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };

// Import dependencies
import * as moment from 'moment';
import * as d3 from 'd3';
import { isEmpty } from 'rxjs/operators';

const RED_CELL: 'red-cell' = 'red-cell';
const PRESENT_CELL: 'green-cell' = 'green-cell';

interface Attendance {
    id: number;
    reason: string;
    attendance_date: string;
    present: boolean;
    holiday: boolean;
    event: boolean;
  }

@Component({
    selector: 'attendance-component',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    templateUrl: './attendance.component.html',
    styleUrls: ['./attendance.component.scss'],
  })

export class AttendanceComponent  {
    view: string = 'month';

    viewDate: Date = new Date();
  
    events: CalendarEvent[] = [];
  
    refresh: Subject<any> = new Subject();
  
    cssClass: string = RED_CELL;

    events$: Observable<Array<CalendarEvent<{ attendance: Attendance }>>>;

    activeDayIsOpen: boolean = false;

    // Doughnut
    public doughnutChartLabels: string[] = [
        'Absent',
        'Present'
    ];
    public absentDays: number = 0;
    public holidays: number = 0;
    public presentDays: number = 0;
    public doughnutChartData: number[] = [];
    public doughnutChartType: string = 'doughnut';
    public lineChartColors:Array<any> = [{ backgroundColor: ["#dc3545", "#28a745"] }]
  
    constructor(private http: HttpClient) {}
  
    ngOnInit(): void {
      this.fetchEvents();
    }
  
    fetchEvents(): void {
      const getStart: any = {
        month: startOfMonth,
        week: startOfWeek,
        day: startOfDay
      }[this.view];
  
      const getEnd: any = {
        month: endOfMonth,
        week: endOfWeek,
        day: endOfDay
      }[this.view];
  
    const params = new HttpParams()
    .set(
      'start_date',
      format(getStart(this.viewDate), 'YYYY/MM/DD')
    )
    .set(
      'end_date',
      format(getEnd(this.viewDate), 'YYYY/MM/DD')
    );
    //.set('api_key', '0ec33936a68018857d727958dca1424f');

    this.events$ = this.http
        .get('.../../../assets/mock-data/attendanceMock.json')
        .pipe(
          map(({ results }: { results: Attendance[] }) => {
            this.absentDays = 0;
            this.holidays = 0;
            this.presentDays = 0 ;
            this.doughnutChartData = [];
              console.log(results);
              results.forEach(absent => {
            if(!absent.present && !absent.holiday && absent.event == undefined) this.absentDays++; 
            if(absent.holiday) this.holidays++; 
              });
              this.presentDays = new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate() - (this.absentDays + this.holidays);
              this.doughnutChartData.push(this.absentDays);
              this.doughnutChartData.push(this.presentDays);
            return results.map((attendance: Attendance) => {
              return {
                title: attendance.reason,
                start: new Date(attendance.attendance_date),
                color: colors.yellow,
                meta: {
                    attendance
                }
              };
            });
          })
        );
    }
  
    dayClicked({
      date,
      events
    }: {
      date: Date;
      events: Array<CalendarEvent<{ attendance: Attendance }>>;
    }): void {
      if (isSameMonth(date, this.viewDate)) {
        if (
          (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
          events.length === 0
        ) {
          this.activeDayIsOpen = false;
        } else {
          this.activeDayIsOpen = true;
          this.viewDate = date;
        }
      }
    }
  
    eventClicked(event: CalendarEvent<{ attendance: Attendance }>): void {
      window.open(
        `https://www.themoviedb.org/movie/${event.meta.attendance.id}`,
        '_blank'
      );
    }
  
    refreshView(): void {
      this.cssClass = this.cssClass === RED_CELL ? PRESENT_CELL : RED_CELL;
      this.refresh.next();
    }
  
    beforeMonthViewRender({ body, event }: { body: CalendarMonthViewDay[]; event: Array<CalendarEvent<{ attendance: Attendance }>>; }): void {
      body.forEach(day => {
          //console.log(day.events);
        if (day.events.length !== 0 && !day.events[0].meta.attendance.present && !day.events[0].meta.attendance.holiday) {
            console.log(day);
          day.cssClass = RED_CELL;
        }
        else {
         if(!day.isWeekend && day.isPast) day.cssClass = PRESENT_CELL;
        }
      });
    }
   // Initialize random data for the demo
   private now = moment().endOf('day').toDate();
   private time_ago = moment().startOf('day').subtract(10, 'year').toDate();
   data = d3.timeDays(this.time_ago, this.now).map((dateElement: any, index: number) => {
     return {
       date: dateElement,
       details: Array.apply(null, new Array(Math.floor(Math.random() * 15))).map((e: number, i: number, arr: any) => {
         return {
           'name': 'Project ' + Math.ceil(Math.random() * 10),
           'date': function () {
             var projectDate = new Date(dateElement.getTime());
             projectDate.setHours(Math.floor(Math.random() * 24))
             projectDate.setMinutes(Math.floor(Math.random() * 60));
             return projectDate;
           }(),
           'value': 3600 * ((arr.length - i) / 5) + Math.floor(Math.random() * 3600) * Math.round(Math.random() * (index / 365))
         }
       }),
       init: function () {
         this.total = this.details.reduce((prev: number, e: any) => {
           return prev + e.value;
         }, 0);
         return this;
       }
     }.init();
   });
 
   // Set custom color for the calendar heatmap
   color = '#78AB46';
 
   // Set overview type (choices are year, month and day)
   overview = 'month';
 
   // Click handler function
   print(val: object):void {
     console.log(val);
   }
 
   // On change handler
   handleOnChange(val: object):void {
     console.log('onChange', val)
   }

}