'use server'

export type CalendarEventType = 'deadline' | 'assignment' | 'exam' | 'event' | 'vacation';

export interface CalendarEvent {
    id: string;
    title: string;
    date: Date;
    type: CalendarEventType;
    description?: string;
    location?: string;
    startTime?: string;
    endTime?: string;
}

export async function getCalendarEvents(month: number, year: number): Promise<CalendarEvent[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock data generation
    const events: CalendarEvent[] = [
        {
            id: '1',
            title: 'Project Submission',
            date: new Date(year, month, 15),
            type: 'deadline',
            description: 'Final submission for the group project.',
            startTime: '23:59'
        },
        {
            id: '2',
            title: 'Midterm Exam',
            date: new Date(year, month, 10),
            type: 'exam',
            location: 'Room 301',
            startTime: '09:00',
            endTime: '11:00'
        },
        {
            id: '3',
            title: 'Math Assignment #3',
            date: new Date(year, month, 5),
            type: 'assignment',
            description: 'Calculus problems 1-20',
        },
        {
            id: '4',
            title: 'Winter Break',
            date: new Date(year, month, 24),
            type: 'vacation',
            description: 'School starts again in Jan',
        },
        {
            id: '5',
            title: 'Guest Lecture',
            date: new Date(year, month, 18),
            type: 'event',
            location: 'Auditorium',
            startTime: '14:00'
        },
    ];

    // Add a few more random events to populate the calendar
    if (month % 2 === 0) {
        events.push({
            id: '6',
            title: 'Physics Lab Report',
            date: new Date(year, month, 22),
            type: 'deadline',
        })
    }

    return events;
}
