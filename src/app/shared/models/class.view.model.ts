import { SubjectDetails } from './profile.model';

export class StudentExamResults {
    studentId: string;
    studentName: string;
    telugu: string;
    english: string
    hindi: string
    science: string
}

export class StudentAttendance {
    studentName: string;
    percentage: string;
}

export class ExamDetails {
   examCode: string;
   examName: string;
   subjects: SubjectDetails[];
   studentsList:  any;
   percentages: any
}
export class ClassAttendance {
    dateTS: number;
    attendance: string;
}

