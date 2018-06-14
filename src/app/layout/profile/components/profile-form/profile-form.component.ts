import { 
  Component, 
  OnInit,
  OnDestroy, 
  ViewChild
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from '@angular/forms';
import {
  ActivatedRoute, 
  Route,
  Router,
  Params } from '@angular/router';
import { HttpParams } from '@angular/common/http';

import { ProfileService } from '../../../../shared/services/profile.service';
import { Country, ClassGroup, SectionDetails, SubjectDetails } from '../../../../shared/models/profile.model';
import { UIResponse } from '../../../../shared/models/UIResponse';


@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit, OnDestroy {
  @ViewChild('profilePhotoIp') profilePhotoIp: any;
  profileForm: FormGroup;
  routeParamsSub: any;
  userType: string;
  userId: number;
  userContext: any = { userRole: ''};
  isTutor: boolean = false;
  countriesList: Country[];
  mobileCodeList: Country[];
  classDetails: ClassGroup[];
  sectionDetails: SectionDetails[];
  isClassTeacher: boolean = false;
  subjectsList: SubjectDetails[];
  constructor(
    private _profileService: ProfileService, 
    private _routeParams: ActivatedRoute, 
    private _router: Router) { }

  ngOnInit() {
    this.routeParamsSub = this._routeParams.params.subscribe(
      (params:  Params) => {
        this.setParamValues(params);
      } 
    );
    this.initForm();
    this.loafdProfileDefaultData();    
  }
  setParamValues(urlParams: Params): void {
    if (urlParams.userType !== null) {
      this.userType = urlParams.userType;
    } 
    else if (urlParams.userId !== null) {
      this.userId = urlParams.userId;
    }
    if ( this.userType !== null) {
      if (this.userType === 'student') {
        this.userContext.userRole = 'Student';
        this.isTutor = false;
      } else if (this.userType === 'tutor') {
        this.userContext.userRole = 'Teacher';
        this.isTutor = true;
      }
    } else {
      // no role has been specified to create profile show erro msg to user
    }
  }
  
  initForm(): void {
    let firstName = '', 
      middleName= '', 
      lastName = '', 
      dob = '',
      gender = '',
      line1 = '',
      city = '',
      countryCode = '',
      stateCode = '', pinCode = '', profilePhoto = '', className = '', sectionName = '';
    
    let gaurdiansList = new FormArray([]);
    let idMarksList = new FormArray([]);
    let profileFormGroupObj: any = {};
    idMarksList.push(new FormGroup({
      'idMarks': new FormControl('', Validators.required)
    }));
    idMarksList.push(new FormGroup({
      'idMarks': new FormControl('', Validators.required)
    }));
    gaurdiansList.push(this.addNewGaurdianFormGroup());
    profileFormGroupObj.firstName = new FormControl(firstName,Validators.required);
    profileFormGroupObj.middleName = new FormControl(middleName,Validators.required);
    profileFormGroupObj.lastName = new FormControl(lastName,Validators.required);
    profileFormGroupObj.dob = new FormControl(dob,Validators.required);
    profileFormGroupObj.gender = new FormControl(gender,Validators.required);
    profileFormGroupObj.line1 = new FormControl(line1,Validators.required);
    profileFormGroupObj.city = new FormControl(city,Validators.required);
    profileFormGroupObj.stateCode = new FormControl(stateCode,Validators.required);
    profileFormGroupObj.countryCode = new FormControl(countryCode,Validators.required);
    profileFormGroupObj.city = new FormControl(firstName,Validators.required);
    profileFormGroupObj.pinCode = new FormControl(pinCode,Validators.required);
    profileFormGroupObj.profilePhoto = new FormControl(profilePhoto,Validators.required);
    if (this.userType === 'student') {
      profileFormGroupObj.className = new FormControl(className,Validators.required);
      profileFormGroupObj.sectionName = new FormControl(sectionName,Validators.required);
      profileFormGroupObj.idMarksList = idMarksList;      
      profileFormGroupObj.gaurdiansList = gaurdiansList
    } else if (this.userType === 'tutor') {
      let teacherMobileCode = '', 
        teacherContactNo = '', 
        teacherEmailId = '', 
        tEmergencyContactName = '',
        tEmergencyContactNo = '', 
        tEmergencyContactCode = '', 
        teacherClass = '', 
        classTeacher = '', tClassName = '', 
        tSectionName = '', subject = '';
      profileFormGroupObj.tEmergencyContactCode = new FormControl(tEmergencyContactCode,Validators.required);
      profileFormGroupObj.tEmergencyContactNo = new FormControl(tEmergencyContactNo,Validators.required);
      profileFormGroupObj.tEmergencyContactName = new FormControl(tEmergencyContactName,Validators.required);
      profileFormGroupObj.teacherEmailId = new FormControl(teacherEmailId,Validators.required);
      profileFormGroupObj.teacherContactNo = new FormControl(teacherContactNo,Validators.required);
      profileFormGroupObj.teacherMobileCode = new FormControl(teacherMobileCode,Validators.required);
      profileFormGroupObj.teacherClass = new FormControl(teacherClass,Validators.required);
      profileFormGroupObj.classTeacher = new FormControl(classTeacher,Validators.required);
      profileFormGroupObj.tClassName = new FormControl(tClassName,Validators.required);
      profileFormGroupObj.tSectionName = new FormControl(tSectionName,Validators.required);
      profileFormGroupObj.subject = new FormControl(subject,Validators.required);   
    }
    this.profileForm = new FormGroup(profileFormGroupObj);
  }
  
  addNewGaurdianFormGroup(): FormGroup {
    let gaurdianName = '', 
      gaurdianEmail = '', 
      gaurdianCountryCode = '', 
      gaurdianContactNo = '';
    return new FormGroup({
      'gaurdianName': new FormControl(gaurdianName,Validators.required),
      'gaurdianEmail': new FormControl(gaurdianEmail,Validators.required),
      'gaurdianCountryCode': new FormControl(gaurdianCountryCode,Validators.required),
      'gaurdianContactNo': new FormControl(gaurdianContactNo,Validators.required),
    });
  }
  addNewGaurdian(): void {
    (<FormArray>this.profileForm.get('gaurdiansList')).push(this.addNewGaurdianFormGroup());
  }
  removeGaurdian(index: number): void {
    (<FormArray>this.profileForm.get('gaurdiansList')).removeAt(index);
  }
  setClassTeachervalue(event: any): void {
    if (event.srcElement.checked) {
      this.isClassTeacher = true;
    } else {
      this.isClassTeacher = false;
    }
  }
  clearProfile(): void {
    console.log(this.profileForm.value);
    this.profileForm.reset();
  }
  
  checkForClassTeacher(): boolean {
    return this.isClassTeacher;
  }
  assignClassToTutor(): void {
    // to do 
  }
  loafdProfileDefaultData(): void {
    this._profileService.getProfileDefaultData().subscribe(response => {
      if (response.status) {
        this.populateDataToUI(response);
      } else {

      }      
    }, error => {

    });
  }

  populateDataToUI(responseData: UIResponse): void {
    if (responseData.result.classList !== null) {
      this.classDetails = responseData.result.classList;
    }
    if (responseData.result.countriesList !== null) {
      this.countriesList = responseData.result.countriesList;
    }
    debugger;
    if (responseData.result.subjectsList !==  null) {
      this.subjectsList = responseData.result.subjectsList;
    }
  }
  onProfileSubmit(): void {

  }
  selectFile(): void {
    if (this.profilePhotoIp !== null ){
      this.profilePhotoIp.nativeElement.click();
    }
  }
  onSelectOfStudentClass(event: any): void {
    debugger;
  }
  onSelectOfTeacherClass(event: any): void {
    debugger;
  }
  ngOnDestroy() {
    this.routeParamsSub.unsubscribe();
  }
}
