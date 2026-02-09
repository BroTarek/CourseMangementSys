import { Phone } from 'lucide-react'
import { email, number, z } from 'zod'

// const StudentSchema = z.object({
//     firstName: z.string().min(2, 'First name must be at least 2 characters long'),
//     lastName: z.string().min(2, 'Last name must be at least 2 characters long'),
//     email: z.string().email('Invalid email address'),
//     phone: z.string().optional(),
//     grade: z.enum(['Grade-9', 'Grade-10', 'Grade-11', 'Grade-12']),
//     avatar: z.string().optional(),
// })

const regex = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phoneNumber: /^(01[1253])[0-9]{8}$/

}

export const StudentSchema = z.object({
    FirstName: z.string().min(2, { message: "too short" }).max(20, { message: "too long" }),
    LastName: z.string().min(2, { message: "too short" }).max(20, { message: "too long" }),
    Grade: z.enum(['Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'More']),
    email: z.string().refine((email) => regex.email.test(email), { message: "email not valid" }),
    PhoneNumber: z.string().optional(),
    parentName: z.string().min(2, { message: "too short" }).max(20, { message: "too long" }),
    parentNumber: z.string().refine((number) => regex.phoneNumber.test(number)),
    Assignments: z.string().optional(),
    Projects: z.string().optional(),
    enrollmentDate:z.date()
})

export type Student = z.infer<typeof StudentSchema>;

