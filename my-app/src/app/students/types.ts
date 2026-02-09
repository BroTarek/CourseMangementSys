export interface Student {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    grade: 'Grade-9' | 'Grade-10' | 'Grade-11' | 'Grade-12';
    class: string;
    avatar?: string;
    createdAt?: string;
    updatedAt?: string;
}

export type StudentFormData = Omit<Student, '_id' | 'createdAt' | 'updatedAt' | 'avatar'>;
