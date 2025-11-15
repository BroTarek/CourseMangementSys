'use client';

import { useState, useEffect } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';

// -------------------------------------
// FIXED SCHEMA
// -------------------------------------
const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),

  curriculum: z.enum(['cambridge', 'edexcel', 'oxford']),
  level: z.enum(['Alevel', 'Olevel']),
  examSession: z.enum(['jan', 'jun', 'october', 'march']),

  startDate: z.date({
    error: 'Start date is required',
  }),
  endDate: z.date({
    error: 'End date is required',
  }),

  setMaxStudents: z.boolean(),
  maxStudents: z.coerce.number().optional(), // FIXED
});

type Classroom = z.infer<typeof formSchema>;

export default function ClassroomPage() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [open, setOpen] = useState(false);

  const form = useForm<Classroom>({
    resolver: zodResolver(formSchema) as Resolver<Classroom>,
    defaultValues: {
      title: '',
      curriculum: 'cambridge',
      level: 'Alevel',
      examSession: 'jan',
      setMaxStudents: false,
      startDate: undefined,
      endDate: undefined,
    },
  });

  const { watch } = form;
  const setMaxStudents = watch('setMaxStudents');

  // Clear maxStudents automatically when toggle is OFF
  useEffect(() => {
    if (!setMaxStudents) {
      form.setValue('maxStudents', undefined);
    }
  }, [setMaxStudents]);

  const onSubmit = (values: Classroom) => {
    setClassrooms([...classrooms, values]);
    form.reset();
    setOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      {/* -------------------------------------
          MODAL
         ------------------------------------- */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>+ Add Classroom</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Classroom</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new classroom.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              {/* TITLE */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Classroom Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* CURRICULUM */}
              <FormField
                control={form.control}
                name="curriculum"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Curriculum</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-2"
                      >
                        <FormItem className="flex items-center space-x-3">
                          <RadioGroupItem value="cambridge" />
                          <FormLabel className="font-normal">Cambridge</FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-x-3">
                          <RadioGroupItem value="edexcel" />
                          <FormLabel className="font-normal">Edexcel</FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-x-3">
                          <RadioGroupItem value="oxford" />
                          <FormLabel className="font-normal">Oxford</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* LEVEL */}
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-2"
                      >
                        <FormItem className="flex items-center space-x-3">
                          <RadioGroupItem value="Alevel" />
                          <FormLabel className="font-normal">A-Level</FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-x-3">
                          <RadioGroupItem value="Olevel" />
                          <FormLabel className="font-normal">O-Level</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* EXAM SESSION */}
              <FormField
                control={form.control}
                name="examSession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam Session</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an exam session" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value="jan">January</SelectItem>
                        <SelectItem value="jun">June</SelectItem>
                        <SelectItem value="october">October</SelectItem>
                        <SelectItem value="march">March</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* START DATE */}
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value
                              ? format(field.value, 'PPP')
                              : 'Pick a date'}

                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* END DATE */}
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value
                              ? format(field.value, 'PPP')
                              : 'Pick a date'}

                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* MAX STUDENTS SWITCH */}
              <FormField
                control={form.control}
                name="setMaxStudents"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div>
                      <FormLabel className="text-base">Set Max Students</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Enable to set a maximum number of students
                      </p>
                    </div>

                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* MAX STUDENTS INPUT */}
              {setMaxStudents && (
                <FormField
                  control={form.control}
                  name="maxStudents"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Students</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <DialogFooter>
                <Button type="submit">Save Classroom</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* -------------------------------------
          CLASSROOM CARDS
         ------------------------------------- */}
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {classrooms.map((classroom, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{classroom.title}</CardTitle>
            </CardHeader>

            <CardContent>
              <p>
                {format(classroom.startDate, 'PPP')} —{' '}
                {format(classroom.endDate, 'PPP')}
              </p>

              {classroom.setMaxStudents && (
                <p>Max Students: {classroom.maxStudents}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
