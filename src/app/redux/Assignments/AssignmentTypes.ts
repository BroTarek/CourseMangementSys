export type CustomFile={
    id:string;
    file:File;
    upload:boolean;
    progress:number; 
    title:string;
    comment?:string
}

export type AssignmentSliceInitState={
    files:CustomFile[];
    comments:string;
    allUploaded:boolean//pop up alert that appears when all files are uploaded
    arePending:boolean;//disable upload button when all are uploading
    errors:{name?: string | undefined;
    message?: string | undefined;
    stack?: string | undefined;
    code?: string | undefined;}
}