'use client'

import React, { useState, useEffect } from 'react';
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
    isToday
} from 'date-fns';
import {
    ChevronLeft,
    ChevronRight,
    Clock,
    MapPin,
    Calendar as CalendarIcon,
    AlertCircle,
    GraduationCap,
    Plane,
    CheckCircle
} from 'lucide-react';
import { CalendarEvent, getCalendarEvents } from '@/app/actions/calendarActions';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { ScrollArea } from "@/components/ui/scroll-area"

const EVENT_COLORS = {
    deadline: 'bg-destructive/10 text-destructive border-destructive/20',
    assignment: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    exam: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    event: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    vacation: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
};

const EVENT_ICONS = {
    deadline: AlertCircle,
    assignment: CheckCircle,
    exam: GraduationCap,
    event: CalendarIcon,
    vacation: Plane,
};

export function CalendarComponent() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const fetchedEvents = await getCalendarEvents(currentMonth.getMonth(), currentMonth.getFullYear());
                setEvents(fetchedEvents);
            } catch (error) {
                console.error("Failed to fetch events", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, [currentMonth]);

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const onDateClick = (day: Date) => setSelectedDate(day);

    const renderHeader = () => {
        return (
            <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">
                        {format(currentMonth, 'MMMM yyyy')}
                    </h2>
                    <p className="text-muted-foreground">
                        Manage your deadlines and events
                    </p>
                </div>
                <div className="flex items-center space-x-2 bg-secondary/30 p-1 rounded-lg border border-border">
                    <Button variant="ghost" size="icon" onClick={prevMonth} className="h-8 w-8 hover:bg-background">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentMonth(new Date())} className="text-sm font-medium hover:bg-background">
                        Today
                    </Button>
                    <Button variant="ghost" size="icon" onClick={nextMonth} className="h-8 w-8 hover:bg-background">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        );
    };

    const renderDays = () => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return (
            <div className="grid grid-cols-7 mb-2 border-b border-border pb-2">
                {days.map(day => (
                    <div className="text-center font-medium text-muted-foreground text-sm uppercase tracking-wider" key={day}>
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                const isCurrentMonth = isSameMonth(day, monthStart);
                const isSelected = isSameDay(day, selectedDate);
                const isTodayDate = isToday(day);

                // Get events for this day
                const dayEvents = events.filter(e => isSameDay(e.date, cloneDay));

                days.push(
                    <div
                        className={cn(
                            "min-h-[120px] p-2 border border-border/40 relative group transition-colors",
                            !isCurrentMonth && "bg-muted/30 text-muted-foreground",
                            isCurrentMonth && "bg-card hover:bg-secondary/20",
                            isSelected && "ring-2 ring-primary ring-inset z-10",
                            "flex flex-col gap-1 cursor-pointer"
                        )}
                        key={day.toString()}
                        onClick={() => onDateClick(cloneDay)}
                    >
                        <div className={cn(
                            "flex items-center justify-center w-7 h-7 rounded-sm text-sm font-medium mb-1",
                            isTodayDate ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                        )}>
                            {formattedDate}
                        </div>

                        <div className="flex flex-col gap-1 overflow-hidden">
                            {dayEvents.slice(0, 3).map((event) => {
                                const Icon = EVENT_ICONS[event.type];
                                return (
                                    <HoverCard key={event.id}>
                                        <HoverCardTrigger asChild>
                                            <div className={cn(
                                                "text-[10px] px-1.5 py-1 rounded-sm border truncate font-medium flex items-center gap-1.5",
                                                EVENT_COLORS[event.type]
                                            )}>
                                                <Icon className="w-3 h-3 flex-shrink-0" />
                                                <span className="truncate">{event.title}</span>
                                            </div>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-80 p-0 overflow-hidden" align="start">
                                            <div className={cn("h-2 w-full", event.type === 'deadline' ? 'bg-destructive' : event.type === 'assignment' ? 'bg-blue-500' : event.type === 'exam' ? 'bg-amber-500' : event.type === 'vacation' ? 'bg-emerald-500' : 'bg-purple-500')} />
                                            <div className="p-4 space-y-3">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h4 className="text-sm font-semibold">{event.title}</h4>
                                                        <p className="text-xs text-muted-foreground uppercase mt-0.5">{event.type}</p>
                                                    </div>
                                                    <Badge variant="outline">{format(event.date, 'MMM d')}</Badge>
                                                </div>

                                                {event.description && (
                                                    <div className="text-sm text-muted-foreground bg-muted/50 p-2 rounded-md">
                                                        {event.description}
                                                    </div>
                                                )}

                                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                    {event.startTime && (
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            {event.startTime} {event.endTime && `- ${event.endTime}`}
                                                        </div>
                                                    )}
                                                    {event.location && (
                                                        <div className="flex items-center gap-1">
                                                            <MapPin className="w-3.5 h-3.5" />
                                                            {event.location}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>
                                );
                            })}
                            {dayEvents.length > 3 && (
                                <div className="text-[10px] text-muted-foreground pl-1">
                                    + {dayEvents.length - 3} more
                                </div>
                            )}
                        </div>
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="grid grid-cols-7" key={day.toString()}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="border border-border rounded-lg overflow-hidden bg-background shadow-sm">{rows}</div>;
    };

    // Helper to fix the infinite loop in renderCells since I cannot import addDays inside the function
    const addDays = (date: Date, amount: number) => {
        const result = new Date(date);
        result.setDate(result.getDate() + amount);
        return result;
    }

    return (
        <div className="flex flex-col h-full bg-background/50 p-6 rounded-xl border backdrop-blur-sm">
            {renderHeader()}
            {renderDays()}
            {loading ? (
                <div className="h-[600px] flex items-center justify-center border rounded-lg bg-card/50">
                    <div className="flex flex-col items-center gap-2">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
                        <span className="text-muted-foreground text-sm">Loading calendar...</span>
                    </div>
                </div>
            ) : (
                renderCells()
            )}

            <div className="mt-6 flex flex-wrap gap-4 items-center justify-center">
                {Object.entries(EVENT_COLORS).map(([type, colorClass]) => {
                    const Icon = EVENT_ICONS[type as keyof typeof EVENT_ICONS];
                    return (
                        <div key={type} className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/30 px-3 py-1.5 rounded-full border border-border">
                            <span className={cn("w-2 h-2 rounded-full", colorClass.split(' ')[0].replace('/10', ''))} />
                            <Icon className="w-3.5 h-3.5" />
                            <span className="capitalize">{type}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
