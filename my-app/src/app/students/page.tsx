import { getStudents } from './actions';
import { StudentTable } from './components/StudentTable';
import { StudentDialog } from './components/StudentDialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default async function StudentsPage(
    props: {
        searchParams?: Promise<{
            search?: string;
            grade?: string;
        }>;
    }
) {
    const searchParams = await props.searchParams;
    const search = searchParams?.search || '';
    const grade = searchParams?.grade || 'all';

    const response = await getStudents(search, grade);
    const students = response.data || [];

    return (
        <div className="container mx-auto py-10">
            <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Students</h1>
                    <p className="text-muted-foreground">
                        Manage student profiles, enrollments, and academic records.
                    </p>
                </div>
                <StudentDialog />
            </div>

            <div className="flex items-center space-x-2 mb-6 bg-white p-4 rounded-lg border shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <form action="">
                        <Input
                            name="search"
                            type="search"
                            placeholder="Search students..."
                            className="pl-8 w-full md:w-[300px]"
                            defaultValue={search}
                        />
                    </form>
                </div>

                {/* Simple filter links (could be enhanced to a Select component triggering a navigation) */}
                <div className="flex gap-2">
                    <Button variant={grade === 'all' ? 'default' : 'outline'} asChild>
                        <a href="/students">All</a>
                    </Button>
                    <Button variant={grade === 'Grade-10' ? 'default' : 'outline'} asChild>
                        <a href="/students?grade=Grade-10">Gr 10</a>
                    </Button>
                    <Button variant={grade === 'Grade-11' ? 'default' : 'outline'} asChild>
                        <a href="/students?grade=Grade-11">Gr 11</a>
                    </Button>
                    <Button variant={grade === 'Grade-12' ? 'default' : 'outline'} asChild>
                        <a href="/students?grade=Grade-12">Gr 12</a>
                    </Button>
                </div>
            </div>

            <StudentTable students={students} />
        </div>
    );
}
