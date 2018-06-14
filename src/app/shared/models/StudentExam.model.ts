import { 
    Address,
    GaurdianDetails
} from './profile.model';

export class ExamDetails {
    examName: string;
    examCode: string;
    totalMarks: string
    gainedMarks: string
    rank: string
    subjects: SubjectDetails[]
}
export class SubjectDetails {
    subjectCode: string;
    subjectName: string;
    totalMarks: string;
    gainedMarks: string;
    rank: string;
}

export class TotalAttendence {
    totalDays: number;
    attendedDays: number;
    attendanceDays: any;
}

export class StudentProfile {
    name: string;
    gender: string;
    address: Address;
    gaurdianContactInfo: GaurdianDetails
}
export interface Attendance {
    id: number;
    reason: string;
    attendance_date: string;
    present: boolean;
}