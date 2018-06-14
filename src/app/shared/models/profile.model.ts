export class GaurdianDetails {
    garudianId: string;
    gaurdianName: string;
    gaurdianEmail: string;
    gaurdianContactInfo: ContactDetails[];
}

export class Country {
    countryName: string;
    countryCode: string;
    countryTelephoneCode: string;
}

export class ClassGroup {
    className: string;
    classCode: string;
    sectionsList: SectionDetails[];
}

export class SectionDetails {
    sectionName: string;
	sectionCode: string
}

export class Profile {
    userRoleId: string;
	userRole: string;
	userProfileId: string;
	firstName: string;
	lastName: string;
	middleName: string;
	dob: string;
    gender: string;
    teacherDetails: TeacherDetails;
    address: Address;
    profilePicName: string;
    studentDetails: StudentDetails
}
export class TeacherDetails {
    primaryContactNo: ContactDetails;
    emailId: string;
    emergencyContactName: string;
    emergencyContactNumber: ContactDetails;
    subjects: SubjectDetails[];
    classes: ClassSectionDetails[];
    classTeacherDetails: ClassTeacherDetails;
}
export class StudentDetails {
    gaurdianDetails: GaurdianDetails;
    identificationMarks: string[];
    classCode: string;
    sectionCode: string;
}

export class ContactDetails {
    countryCode: string;
    contactNo: string;
}
export class SubjectDetails {
    subCode: string;
    subName: string;
}

export class ClassSectionDetails {
    classCode: string;
    sectionCode: string;
}

export class ClassTeacherDetails {
    isClassTeacher: boolean;
    classCode: string;
    sectionCode: string;
}

export class Address {
    line1: string;
    city: string;
    state: string;
    stateCode: number;
    country: string;
    countryCode: string;
    pincode: string;
}