import { 
  Component, 
  OnInit,
  OnDestroy, 
  ViewChild
} from '@angular/core';
import {
  ActivatedRoute, 
  Route,
  Router,
  Params } from '@angular/router';
  import {  
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder } from '@angular/forms';



import { ProfileService } from '../../../../shared/services/profile.service';
import { AnimationStyleMetadata } from '@angular/core/src/animation/dsl';
import { UIResponse } from '../../../../shared/models/UIResponse';
import { ExamDetails, SubjectDetails, Attendance, TotalAttendence } from '../../../../shared/models/StudentExam.model';
import 'rxjs/add/observable/of';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { Observable } from 'rxjs/Observable';

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
  },
  green: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
const RED_CELL: 'red-cell' = 'red-cell';
const PRESENT_CELL: 'green-cell' = 'green-cell';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class StudentViewComponent implements OnInit, OnDestroy {
  showMoreDetails = false;
  examCode: any;
  routeParams: any;
  studentId: number;
  hideContactInfo: boolean = false;
  examColumns = ['examName', 'gainedMarks', 'totalMarks', 'rank'];
  examDataSource: ExamDetails[];
  showExamsListTable: boolean =  true;
  examDetailsColumns = ['subjectName', 'gainedMarks', 'totalMarks', 'rank'];
  examDetailsDataSource: SubjectDetails[];
  showExamDetailsTable: boolean = false;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  events$: Observable<Array<CalendarEvent<{ attendance: Attendance }>>>;
  attendanceDetails: TotalAttendence;
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;
  studentExamsData: any;
  showAttendance = false;
  subjectsList: SubjectDetails[];
  // exams chart
  private showExamsChart = false;
  private showRankChart = false;
  public examChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public examChartLabels: string[] = [];
  public examChartType: string = 'bar';
  public examChartLegend: boolean = true;

  public examChartData: any[] =[
    
  ];

  // rank details chart
  public ranksChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public ranksChartLabels: string[] = [];
  public ranksChartType: string = 'bar';
  public ranksChartLegend: boolean = true;

  public ranksChartData: any[] = [];

  // exams details chart
  public examDetailsChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public examDetailsChartLabels: string[] = [];
  public examDetailsChartType: string = 'bar';
  public examDetailsChartLegend: boolean = true;
  public examDetailsChartData: any[] = [];
  showExamChartDetails:boolean = false;
  showSubjectChartDetails:boolean = false;
  // subject wise chart
  public subjectDetailsChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public subjectDetailsChartLabels: string[] = [];
  public subjectDetailsChartType: string = 'bar';
  public subjectDetailsChartLegend: boolean = true;

  public subjectDetailsChartData: any[] = [];
  examsFormGroup: FormGroup;

  constructor(private _profileService: ProfileService, 
    private _routeParams: ActivatedRoute, 
    private _router: Router)  {
      this.examsFormGroup = new FormGroup({
        examName: new FormControl(''),
        subjectName: new FormControl('')
      });
    }
  toggleShowMoreDetails(event: any): void {
	this.showMoreDetails ? this.showMoreDetails = false: this.showMoreDetails = true;
	if (this.showMoreDetails) {
		event.currentTarget.innerHTML = 'Click here to for Table View';
	} else {
		event.currentTarget.innerHTML = 'Click here to for Chart View';
	}
  }
  ngOnInit() {
    this.routeParams = this._routeParams.params.subscribe(
      (params:  Params) => {
        this.studentId = params.studentId;
        this.getStudentExamsData();
      } 
    );
  }
  getStudentExamsData(): void {
    this._profileService.getStudentAcademyData().subscribe(response => {
      if (response.status) {
        this.populateDataToStudentView(response);
      } else {

      }      
    }, error => {

    });
  }
  populateDataToStudentView(response: UIResponse): void {
    this.examDataSource = response.result.examResults;
    this.loadAttendanceData();
    this.prepareStudentChartsData(response);
  }
  loadAttendanceData(): void {
	this._profileService.getStudentAcademyData().subscribe(response => {
      if (response.status) {
		this.attendanceDetails = response.result.attendence;
		this.subjectsList = response.result.subjectsList;
		this.events = this.attendanceDetails.attendanceDays.map(function(attenceData: Attendance) {
		  return {
			title: attenceData.reason,
			start: new Date(attenceData.attendance_date),
			color: attenceData.present ? colors.red : colors.green,
			meta: {
				attenceData
			}
		  };
		});
		this.showAttendance = true;
      } else {

      }      
    }, error => {

    });
	
  }
  prepareStudentChartsData(response: UIResponse): void {
    let gainedMarksArray: any[] = [], totalMarksArray: any[] = [], ranksDataArray: any[] = [];
    this.examDataSource.forEach(element => {
      this.examChartLabels.push(element.examName);
      this.ranksChartLabels.push(element.examName);
      gainedMarksArray.push(element.gainedMarks);
      totalMarksArray.push(element.totalMarks);
      ranksDataArray.push(element.rank);
    });
    this.examChartData.push({
      data: gainedMarksArray,
      label: 'Gained Marks'
    });
    this.examChartData.push({
      data: totalMarksArray,
      label: 'Total Marks'
    });
    this.ranksChartData.push({
      data: ranksDataArray,
      label: 'Rank'
    })
    this.showExamsChart = true;
    this.showRankChart = true;
  }
  beforeMonthViewRender({ body, event }: { body: CalendarMonthViewDay[]; event: Array<CalendarEvent<{ attendance: Attendance }>>; }): void {
    body.forEach(day => {
      if (day.events.length !== 0 && day.events[0].meta.attendance && !day.events[0].meta.attendance.present && !day.events[0].meta.attendance.holiday) {
          console.log(day);
        day.cssClass = RED_CELL;
      }
      else {
       if(!day.isWeekend && day.isPast) {
		day.cssClass = PRESENT_CELL;
	   }	   
      }
    });
  }
  notifyParent(): void {

  }
  onSelectOfExam(row: ExamDetails): void {
    if (row.subjects.length > 0) {
      this.examDetailsDataSource = row.subjects;
      this.showExamDetailsTable = true;
      this.showExamsListTable = false;
    }
  }
  showExamsList(): void {
    this.showExamDetailsTable = false;
    this.showExamsListTable = true
  }
  showContactInfo(event: any): void {
    this.hideContactInfo = this.hideContactInfo ? false: true;
    if (this.hideContactInfo) {
      event.currentTarget.innerText = "Hide Contact Info";
    } else {
      event.currentTarget.innerText = "Show Contact Info";
    }    
  }
  onSelectOfExamType(event: any): void {
    if (event !== null && event !== '' && event !== undefined) {
      let selectedExamData = this.examDataSource.filter(exam => {
        if (event === exam.examCode) {
          return true;
        }
      });
      let totalMarksArray: any =[], gainedMarksArray = [];
      if (selectedExamData !== null && selectedExamData.length > 0) {
		  let gainedMarksArray: any = [], totalMarksArray: any = [];
		  selectedExamData[0].subjects.map(subject => {
			this.examDetailsChartLabels.push(subject.subjectName);
            gainedMarksArray.push(subject.gainedMarks);
			totalMarksArray.push(subject.totalMarks);
		  });
		this.examDetailsChartData.push({ 'data': gainedMarksArray, 'label': 'Gained Marks'});
		this.examDetailsChartData.push({ 'data': totalMarksArray, 'label': 'Gained Marks'});
        this.showExamChartDetails = true;
      }
    }
  }
  onSelectOfSubjectType(event: any): void {
    if (event !== null && event !== '' && event !== undefined) {
      let gainedMarksArray: any = [], totalMarksArray = [];
	  this.examDataSource.map(exam => {
		exam.subjects.map(subject => {
			if (event === subject.subjectCode) {
				this.subjectDetailsChartLabels.push(exam.examName);
				gainedMarksArray.push(subject.gainedMarks);
				totalMarksArray.push(subject.totalMarks);
			}			
		});
	  });
	  if (gainedMarksArray.length > 0) {
		this.showSubjectChartDetails = true;
		this.subjectDetailsChartData.push({ 'data': gainedMarksArray, 'label': 'Gained Marks'});
		this.subjectDetailsChartData.push({ 'data': totalMarksArray, 'label': 'Gained Marks'});
	  }
    }
  }
  ngOnDestroy() {
    this.routeParams.unsubscribe();
  }
}

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
