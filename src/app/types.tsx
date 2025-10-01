export type ExamSession={
    name:"June"|"November"|"March"
    date:Date
}
export type SessionDetails={
  sessionDate:Date
  sessionTitle:string
  assignedHW:AssignedHW
  submittedHW:SubmittedHW
  Description:string
  QuizGrade?:number
  QuizNote?:string
}


export type HW={
    id:string
    title:string
    file:string
    done:boolean
}
export type AssignedHW={
    hw:HW
    disclaimer:string
    dateOfAssigning:Date
    dueDate:Date
}
export type SubmittedHW={
    hw:HW
    dateOfHWSubmission:Date
}

export type Student={
    id:string
    firstName:string
    lastName:string
    middleName:string
    residence:string
    schoolName:string
    registerationDate:Date
    parentFisrtPhoneNumber:string
    parentSecondPhoneNumber:string
    email:string
    password:string
    grade:number
    OL_Board:'Edexcel'|'Cambridge'|'Oxford'
    examSession:ExamSession
    streak:number
    sessionHistory:SessionDetails
}


export type AssignmentLog={
    asigned:AssignedHW
    DoneBy:Student[]
    MissedBy:Student[]
}